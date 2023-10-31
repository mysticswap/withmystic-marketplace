import { TypedDataField, ethers } from "ethers";
import { ListOrBidData } from "../types/reservoir-types/listing-data.types";
import { executeTransactions } from "./seaport";
import { submitListOrBid } from "./api/marketplace-reservoir-api";

export const handleBiddingData = async (
  chainId: number,
  data: ListOrBidData,
  setStage: React.Dispatch<React.SetStateAction<number>>,
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const currencyWrapping = data.steps[0].items;
  const currencyApproval = data.steps[1].items;
  const authTransaction = data.steps[2].items;
  const authorizeOffer = data.steps[3].items;

  const requiredApprovals = [
    ...currencyWrapping,
    ...currencyApproval,
    ...authTransaction,
  ].map((item) => item.data);

  executeTransactions(requiredApprovals, signer)
    .then(async () => {
      const signTypedMessage = authorizeOffer[0].data.sign;
      let orderPost = authorizeOffer[0].data.post;

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
      // toast.error("Something went wrong!");
    });
};
