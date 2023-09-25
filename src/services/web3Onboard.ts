import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { installedWallets } from "../wallets/wallets";
import { supportedChains } from "../wallets/chains";
import mysticLogo from "../assets/Design sem nome (17).png";
import { ethers } from "ethers";

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected, ...installedWallets],
  chains: [...supportedChains],
  appMetadata: {
    name: "Mystic",
    icon: mysticLogo,
    description: "A frontend sdk for OTP swaps",
  },
});

export const connectWallets = async (
  setProvider: React.Dispatch<
    React.SetStateAction<ethers.providers.Web3Provider | null>
  >
) => {
  const wallets = await onboard.connectWallet();
  if (wallets[0]) {
    const ethersProvider = new ethers.providers.Web3Provider(
      wallets[0].provider,
      "any"
    );
    setProvider(ethersProvider);
  }
};
