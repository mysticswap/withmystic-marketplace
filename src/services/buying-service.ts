import { ethers } from "ethers";
import { BuyData } from "../types/reservoir-types/buy-data.types";
import { executeTransactions } from "./seaport";

export const handleBuyData = async (data: BuyData) => {
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const preSignature = data.steps[0].items;
  const sale = data.steps[1].items;

  const requiredApprovals = [...preSignature, ...sale].map((item) => {
    return item.data;
  });

  executeTransactions(requiredApprovals, signer).then(async () => {
    alert("bought");
  });
};
