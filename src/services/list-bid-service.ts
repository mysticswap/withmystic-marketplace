import { TypedDataField, ethers } from "ethers";
import {
  ListOrBidData,
  Data,
} from "../types/reservoir-types/listing-data.types";
import { submitListOrBid } from "./api/marketplace-reservoir-api";
import { executeTransactions } from "./seaport";

export const handleListOrBidData = async (
  chainId: number,
  data: ListOrBidData,
  setStage: React.Dispatch<React.SetStateAction<number>>,
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const requiredApprovals: Data[] = [];
  data.steps.forEach((step) => {
    if (step.id !== "order-signature") {
      const stepItems = step.items;
      stepItems.forEach((item) => {
        requiredApprovals.push(item.data);
      });
    }
  });

  const orderSignatureStep = data.steps.find((step) => {
    return step.id == "order-signature";
  });

  executeTransactions(requiredApprovals, signer)
    .then(async () => {
      const signTypedMessage = orderSignatureStep?.items[0].data.sign;
      let orderPost = orderSignatureStep?.items[0].data.post;
      const signature = await signer._signTypedData(
        signTypedMessage?.domain!,
        signTypedMessage?.types as unknown as Record<
          string,
          Array<TypedDataField>
        >,
        signTypedMessage?.value!
      );

      orderPost = {
        ...orderPost!,
        body: {
          ...orderPost?.body!,
          order: {
            ...orderPost?.body?.order!,
            data: { ...orderPost?.body?.order.data!, signature },
          },
        },
      };

      submitListOrBid(chainId, orderPost).then((result) => {
        if (result?.message == "Success") {
          setStage(2);
        }
      });
    })
    .catch(() => {
      modalSetter(false);
      setStage(0);
    });
};
