/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { WalletContextType } from "./types";
import { defaultNumericFilters, dropdownOptions } from "../../constants";
import { useGlobalContext } from "../GlobalContext/GlobalContext";
import { getHostName } from "../../utils";

const WalletContext = createContext<WalletContextType | null>(null);

type Props = { children: ReactNode };

export const WalletContextProvider = ({ children }: Props) => {
  const { selectedCollection } = useGlobalContext();

  // Not reusing the HomeContext filters because
  // we may not want both filters to interfere with each other
  const [showFilters, setShowFilters] = useState(true);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(
    dropdownOptions[0]
  );
  const [isFetching, setIsFetching] = useState(false);
  const [numericFilters, setNumericFilters] = useState(defaultNumericFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [diamondHost, setDiamondHost] = useState(false);

  const detectHost = () => {
    const hostName = getHostName();
    if (
      hostName === "deploy-preview-48--heroic-duckanoo-b32f52.netlify.app" ||
      hostName === "diamondnxt.withmystic.xyz"
    ) {
      setDiamondHost(true);
    } else {
      setDiamondHost(false);
    }
    // switch (hostName) {
    //   case "deploy-preview-48--heroic-duckanoo-b32f52.netlify.app":
    //     return setDiamondHost(true);
    //   case "diamondnxt.withmystic.xyz":
    //     return setDiamondHost(true);
    //   default:
    //     return setDiamondHost(false);
    // }
  };

  useEffect(() => {
    detectHost();
    setSelectedDropdownOption(dropdownOptions[0]);
    setNumericFilters(defaultNumericFilters);
    setIsFetching(true);
  }, [selectedCollection]);

  return (
    <WalletContext.Provider
      value={{
        showFilters,
        setShowFilters,
        selectedDropdownOption,
        setSelectedDropdownOption,
        isFetching,
        setIsFetching,
        numericFilters,
        setNumericFilters,
        showMobileFilters,
        setShowMobileFilters,
        diamondHost,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (context === undefined)
    throw new Error("WalletContext was used outside the WalletContextProvider");
  return context;
};
