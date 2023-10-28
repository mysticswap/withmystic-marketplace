import { chainIdsMap } from "../constants";

export const switchChains = async (
  connectedWalletChain: number,
  collectionChain: number
) => {
  if (connectedWalletChain !== collectionChain) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdsMap[collectionChain] }],
      });
    } catch (switchError) {
      console.log("Failed to switch to the network");
    }
  }

  return;
};
