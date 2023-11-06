import { ethers } from "ethers";

export type ConnectionContextType = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  provider: ethers.providers.Web3Provider | null;
  setProvider: React.Dispatch<
    React.SetStateAction<ethers.providers.Web3Provider | null>
  >;
  chainId: number;
  setChainId: React.Dispatch<React.SetStateAction<number>>;
};
