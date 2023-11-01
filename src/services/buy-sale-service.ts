import { ethers } from "ethers";
import { BuyData, Data } from "../types/reservoir-types/buy-data.types";
import { executeTransactions } from "./seaport";

export const handleBuyOrSellData = async (
  data: BuyData,
  setTransactionStage: React.Dispatch<React.SetStateAction<number>>,
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>,
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const requiredApprovals: Data[] = [];

  data.steps.forEach((step) => {
    const stepItems = step.items;
    stepItems.map((item) => {
      requiredApprovals.push(item.data);
    });
  });

  executeTransactions(requiredApprovals, signer)
    .then(async (result) => {
      setTransactionStage(2);
      setTransactionHash(result);
    })
    .catch(() => {
      modalSetter(false);
      setTransactionStage(0);
    });
};
