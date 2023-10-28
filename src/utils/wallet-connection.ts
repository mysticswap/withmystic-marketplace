import { chainIdsMap } from "../constants";

export const switchChains = async (chain: number) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdsMap[chain] }],
    });
  } catch (switchError) {
    console.log("Failed to switch to the network");
  }
};
