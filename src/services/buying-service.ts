import { ethers } from "ethers";
import { BuyData } from "../types/reservoir-types/buy-data.types";
import { executeTransactions } from "./seaport";
import { toast } from "react-toastify";

export const handleBuyOrSellData = async (
  data: BuyData,
  setTransactionStage: React.Dispatch<React.SetStateAction<number>>,
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>,
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const preSignature = data.steps[0].items;
  const sale = data.steps[1].items;

  const requiredApprovals = [...preSignature, ...sale].map((item) => {
    return item.data;
  });

  executeTransactions(requiredApprovals, signer)
    .then(async (result) => {
      setTransactionStage(2);
      setTransactionHash(result);
    })
    .catch(() => {
      modalSetter(false);
      // toast.error("Something went wrong!");
      setTransactionStage(0);
    });
};
