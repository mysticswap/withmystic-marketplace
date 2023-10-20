import { ethers } from "ethers";
import { ListOrOfferType } from "../types/market-schemas.types";
import { listOrOffer, validateOfferOrList } from "./api/buy-offer-list.api";

export const handleCreateOffer = async (data: ListOrOfferType) => {
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install MetaMask to sign messages.");
    return;
  }

  try {
    // Request user's permission to access their MetaMask account
    await window.ethereum.enable();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const request = await listOrOffer(data).then((result) => {
      const isValid = Object.keys(result).length > 0;
      if (!isValid) {
        alert(
          "The offerer does not have the amount needed to create or fulfill."
        );
      }
      return result;
    });

    const { signTypedMessage, approvalsNeeded, swapId } = request;

    executeTransactions(approvalsNeeded, signer).then(async () => {
      const signature = await signer._signTypedData(
        signTypedMessage.domainData,
        signTypedMessage.types,
        signTypedMessage.value
      );
      console.log("approvalsNeeded", approvalsNeeded);

      console.log("signature", signature);

      const orderComponents = signTypedMessage.value;
      const payloadVerify = {
        parameters: orderComponents,
        signature: signature,
        swapId,
      };

      const response = await validateOfferOrList(payloadVerify);

      console.log("payloadResponse", response);
    });
  } catch (error) {
    console.error(error);
  }
};

export const executeTransactions = async (transactions: any, signer: any) => {
  for (const transaction of transactions) {
    try {
      const tx = await signer.sendTransaction(transaction);
      await tx.wait();
      console.log("Transaction hash:", tx.hash);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
};
