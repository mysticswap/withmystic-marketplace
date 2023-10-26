export const executeTransactions = async (transactions: any, signer: any) => {
  for (const transaction of transactions) {
    if (transaction) {
      try {
        const tx = await signer.sendTransaction(transaction);
        await tx.wait();
        console.log("Transaction hash:", tx.hash);
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
};
