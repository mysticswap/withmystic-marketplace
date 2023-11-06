import { toast } from "react-toastify";

export const executeTransactions = async (transactions: any, signer: any) => {
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
