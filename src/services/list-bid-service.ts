/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { TypedDataField, ethers } from "ethers";
import { ListOrBidData, Data } from "../types/rsv-types/listing-data.types";
import { submitListOrBid } from "./api/marketplace-rsv-api";
import { executeTransactions } from "./seaport";
import { ActivityObject } from "../types/activity.types";
import { postActivityToDB } from "./api/activity.api";
import { otherChains } from "../wallets/chains";
import { validateSwap } from "./api/marketplace-api";

export const handleListOrBidData = async (
  chainId: number,
  data: ListOrBidData,
  setStage: React.Dispatch<React.SetStateAction<number>>,
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
  activityData: ActivityObject
) => {
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  if (otherChains.includes(chainId)) {
    const { signTypedMessage, approvalsNeeded, swapId } = data;
    return executeTransactions(approvalsNeeded, signer)
      .then(async () => {
        const signature = await signer._signTypedData(
          signTypedMessage?.domainData!,
          signTypedMessage?.types as unknown as Record<
            string,
            Array<TypedDataField>
          >,
          signTypedMessage?.value!
        );

        if (signature) {
          setStage(1);
        }

        const orderComponents = signTypedMessage.value;
        const payloadVerify = {
          parameters: orderComponents,
          signature: signature,
          swapId,
        };

        const response = await validateSwap(swapId, signature);
        if (response) {
          setStage(2);
          postActivityToDB(activityData);
        }
      })
      .catch(() => {
        modalSetter(false);
        setStage(0);
      });
  }

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
      const signTypedMessage = orderSignatureStep?.items?.[0]?.data?.sign;
      let orderPost = orderSignatureStep?.items?.[0]?.data?.post;
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
          postActivityToDB(activityData);
        }
      });
    })
    .catch(() => {
      modalSetter(false);
      setStage(0);
    });
};
