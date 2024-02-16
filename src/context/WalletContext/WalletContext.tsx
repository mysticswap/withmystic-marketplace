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

const WalletContext = createContext<WalletContextType | null>(null);

type Props = { children: ReactNode };

export const WalletContextProvider = ({ children }: Props) => {
  const { selectedCollection } = useGlobalContext();

  // Not reusing the HomeContext filters because
  // we may not want both filters to interfere with each other
  const [showFilters, setShowFilters] = useState(true);
  const [tokenId, setTokenId] = useState<string>("");
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(
    dropdownOptions[0]
  );
  const [isFetching, setIsFetching] = useState(false);
  const [numericFilters, setNumericFilters] = useState(defaultNumericFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  useEffect(() => {
    setSelectedDropdownOption(dropdownOptions[0]);
    setNumericFilters(defaultNumericFilters);
    setIsFetching(true);
  }, [selectedCollection]);

  return (
    <WalletContext.Provider
      value={{
        showFilters,
        setShowFilters,
        tokenId,
        setTokenId,
        selectedDropdownOption,
        setSelectedDropdownOption,
        isFetching,
        setIsFetching,
        numericFilters,
        setNumericFilters,
        showMobileFilters,
        setShowMobileFilters,
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
