/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

export const executeTransactions = async (transactions: any, signer: any) => {
  // testAction();
  for (const transaction of transactions) {
    if (transaction) {
      try {
        const tx = await signer.sendTransaction(transaction);
        await tx.wait();
        return tx.hash;
      } catch (error) {
        const errorMessage = String(error).split("(")[0];

        if (errorMessage.includes("insufficient")) {
          toast.error("Insufficient funds!");
        } else toast.error(errorMessage);

        throw new Error(`${error}`);
      }
    }
  }
};

// const testAction = () => {
//   const infuraUrl =
//     "https://goerli.infura.io/v3/e707b2e64eea4c038e7479e64f3c4e75";
//   const providerT = new ethers.providers.JsonRpcProvider(infuraUrl);

//   const fromAddress = "0x1472cf8d7a2ab5aac1a5a777e0aa043cd72b6d11";
//   const toAddress = "0x07865c6e87b9f70255377e024ace6630c1eaa37f";
//   const dataT =
//     "0x095ea7b30000000000000000000000001e0049783f008a0085193e00003d00cd54003c71ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

//   const privateKey;

//   const wallet = new ethers.Wallet(privateKey, providerT);

//   const transactionT = {
//     to: toAddress,
//     data: dataT,
//     gasLimit: 2000000,
//   };

//   wallet
//     .sendTransaction(transactionT)
//     .then((tx) => tx.wait())
//     .then((receipt) => console.log("Transaction receipt:", receipt))
//     .catch((err) => console.error("Error:", err));
// };
