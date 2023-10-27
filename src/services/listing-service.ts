import { TypedDataField, ethers } from "ethers";
import { ListOrBidData } from "../types/reservoir-types/listing-data.types";
import { submitListOrBid } from "./api/marketplace-reservoir-api";
import { executeTransactions } from "./seaport";

export const handleListingData = async (
  chainId: number,
  data: ListOrBidData,
  setStage: React.Dispatch<React.SetStateAction<number>>
) => {
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const approvalData = data.steps[0];
  const mainListData = data.steps[1];

  const requiredApprovals = approvalData.items.map((item) => {
    return item.data;
  });

  executeTransactions(requiredApprovals, signer).then(async () => {
    const signTypedMessage = mainListData.items[0].data.sign;
    let orderPost = mainListData.items[0].data.post;
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
  });
};
