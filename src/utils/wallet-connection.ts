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
    } catch {
      // handle errors
    }
  }

  return;
};
