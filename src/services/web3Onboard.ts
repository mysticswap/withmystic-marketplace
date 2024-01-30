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
  setUser: React.Dispatch<React.SetStateAction<string | null>> | undefined,
  setProvider: React.Dispatch<
    React.SetStateAction<ethers.providers.Web3Provider | null>
  >,
  setChainId: React.Dispatch<React.SetStateAction<number>> | undefined
) => {
  const wallets = await onboard.connectWallet();
  if (wallets[0]) {
    const ethersProvider = new ethers.providers.Web3Provider(
      wallets[0].provider,
      "any"
    );
    const { accounts, chains } = wallets[0];
    setUser?.(accounts[0].address);
    setProvider?.(ethersProvider);
    setChainId?.(parseInt(chains[0].id, 16));
  }
};

export const disconnectWallets = async (
  setUser: React.Dispatch<React.SetStateAction<string | null>> | undefined,
  setProvider: React.Dispatch<
    React.SetStateAction<ethers.providers.Web3Provider | null>
  >,
  setChainId: React.Dispatch<React.SetStateAction<number>> | undefined
) => {
  const [primaryWallet] = await onboard.state.get().wallets;
  if (primaryWallet)
    await onboard.disconnectWallet({ label: primaryWallet.label });
  setUser?.("");
  setProvider(null);
  setChainId?.(0);
};

export default onboard;
