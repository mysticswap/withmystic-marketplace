/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { HomeContextType, SelectedTrait } from "./types";
import { defaultNumericFilters, dropdownOptions } from "../../constants";
import { useGlobalContext } from "../GlobalContext/GlobalContext";
import { getHostName } from "../../utils";

const HomeContext = createContext<HomeContextType | null>(null);

type Props = { children: ReactNode };

export const HomeContextProvider = ({ children }: Props) => {
  const { selectedCollection } = useGlobalContext();
  const [showFilters, setShowFilters] = useState(true);
  const [selectedTraits, setSelectedTraits] = useState<SelectedTrait[]>([]);
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
    setSelectedTraits([]);
    setSelectedDropdownOption(dropdownOptions[0]);
    setNumericFilters(defaultNumericFilters);
    setIsFetching(true);
  }, [selectedCollection]);

  return (
    <HomeContext.Provider
      value={{
        showFilters,
        setShowFilters,
        selectedTraits,
        setSelectedTraits,
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
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);

  if (context === undefined)
    throw new Error("HomeContext was used outside the HomeContextProvider");
  return context;
};
