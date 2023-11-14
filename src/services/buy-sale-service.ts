import { ethers } from "ethers";
import { BuyData, Data } from "../types/reservoir-types/buy-data.types";
import { executeTransactions } from "./seaport";
import { authSignature } from "./api/marketplace-reservoir-api";
import { toast } from "react-toastify";
import { DiscordPostBody } from "../types/discord-post.types";
import { postSale } from "./api/discord.api";

export const handleBuyOrSellData = async (
  data: BuyData,
  setTransactionStage: React.Dispatch<React.SetStateAction<number>>,
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>,
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
  chainId: number,
  discordData?: DiscordPostBody
) => {
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const requiredApprovals: Data[] = [];

  data.steps.forEach((step) => {
    if (step.id !== "auth") {
      const stepItems = step.items;
      stepItems.map((item) => {
        requiredApprovals.push(item.data);
      });
    }
  });

  const authStep = data.steps.find((step) => {
    return step.id == "auth";
  });

  const handleAuth = async () => {
    const authSign = authStep?.items[0].data.sign;
    const authPost = authStep?.items[0].data.post;
    const signature = await signer.signMessage(authSign?.message!);
    const auth = await authSignature(chainId!, signature, authPost!);
    if (auth?.auth) {
      modalSetter(false);
      setTransactionStage(0);
      toast("Blur authentication complete. Restart transaction.");
    }
  };

  if (authStep && authStep?.items?.[0]?.status == "incomplete") {
    handleAuth();
  } else {
    executeTransactions(requiredApprovals, signer)
      .then(async (result) => {
        setTransactionStage(2);
        setTransactionHash(result);
      })
      .finally(() => {
        postSale(discordData!);
      })
      .catch(() => {
        modalSetter(false);
        setTransactionStage(0);
      });
  }
};
