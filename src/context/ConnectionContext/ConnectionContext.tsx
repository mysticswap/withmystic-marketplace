/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ConnectionContextType } from "./types";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const ConnectionContext = createContext<ConnectionContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const ConnectionContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [chainId, setChainId] = useState(1);

  const attachListeners = useCallback(() => {
    // window.ethereum.on("accountsChanged", function (accounts: string[]) {
    //   if (accounts.length > 0) {
    //     //Persist connectiion
    //   } else {
    //     disconnectWallets(setUser, setProvider, setChainId);
    //   }
    // });

    window.ethereum.on("chainChanged", (Id: string) => {
      const chainId = parseInt(Id, 16);
      setChainId(chainId);
    });

    window.ethereum.on("disconnect", () => {
      setUser?.("");
      setProvider(null);
      setChainId?.(0);
    });

    provider!.on("error", () => {
      // alert(tx);
      // alert("g");
    });
  }, [provider]);

  useEffect(() => {
    if (provider) {
      attachListeners();
    }
  }, [provider, attachListeners]);

  return (
    <ConnectionContext.Provider
      value={{ user, setUser, provider, setProvider, chainId, setChainId }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnectionContext = () => {
  const context = useContext(ConnectionContext);

  if (context === undefined)
    throw new Error(
      "ConnectionContext was used outside the ConnectionContextProvider"
    );
  return context;
};
