import { ReactNode, createContext, useContext, useState } from "react";
import { HomeContextType, SelectedTrait } from "./types";
import { defaultNumericFilters, dropdownOptions } from "../../constants";

const HomeContext = createContext<HomeContextType | null>(null);

type Props = { children: ReactNode };

export const HomeContextProvider = ({ children }: Props) => {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedTraits, setSelectedTraits] = useState<SelectedTrait[]>([]);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(
    dropdownOptions[0]
  );
  const [isFetching, setIsFetching] = useState(false);
  const [numericFilters, setNumericFilters] = useState(defaultNumericFilters);

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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
