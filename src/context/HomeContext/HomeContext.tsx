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

  useEffect(() => {
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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
