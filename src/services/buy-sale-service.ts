/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ethers } from "ethers";
import { BuyData, Data } from "../types/rsv-types/buy-data.types";
import { executeTransactions } from "./seaport";
import { authSignature } from "./api/marketplace-rsv-api";
import { toast } from "react-toastify";
import {
  DiscordPostBody,
  DiscordPostBodyToken,
} from "../types/discord-post.types";
import { postSale, postSaleToken } from "./api/discord.api";
import { ActivityObject } from "../types/activity.types";
import { postActivityToDB } from "./api/activity.api";

export const handleBuyOrSellData = async (
  data: BuyData,
  setTransactionStage: React.Dispatch<React.SetStateAction<number>>,
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>,
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
  chainId: number,
  discordData: DiscordPostBody,
  activityData: ActivityObject
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
        postSale(discordData!);
        postActivityToDB(activityData);
      })
      .catch(() => {
        modalSetter(false);
        setTransactionStage(0);
      });
  }
};

export const handleBuyOrSellDataToken = async (
  data: BuyData,
  setTransactionStage: React.Dispatch<React.SetStateAction<number>>,
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>,
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
  chainId: number,
  discordData: DiscordPostBodyToken,
  activityData: ActivityObject
) => {
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const requiredApprovals: Data[] = [];
  const currencyApprovals: Data[] = []; // New array to store currency approvals

  data.steps.forEach((step) => {
    if (step.id !== "auth") {
      const stepItems = step.items;

      stepItems.forEach((item) => {
        if (step.id === "currency-approval") {
          currencyApprovals.push(item.data);
        } else {
          requiredApprovals.push(item.data);
        }
      });
    }
  });

  const authStep = data.steps.find((step) => step.id === "auth");

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

  if (authStep && authStep.items?.[0]?.status === "incomplete") {
    handleAuth();
  } else {
    // Execute currency approvals first
    if (currencyApprovals.length > 0) {
      await executeTransactions(currencyApprovals, signer);
    }

    executeTransactions(requiredApprovals, signer)
      .then(async (result) => {
        setTransactionStage(2);
        setTransactionHash(result);
        postSaleToken(discordData!);
        postActivityToDB(activityData);
      })
      .catch(() => {
        modalSetter(false);
        setTransactionStage(0);
      });
  }
};
