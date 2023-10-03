import { ReactNode, createContext, useContext, useState } from "react";
import { HomeContextType, SelectedTrait } from "./types";
import { dropdownOptions } from "../../constants";

const HomeContext = createContext<HomeContextType | null>(null);

type Props = { children: ReactNode };

export const HomeContextProvider = ({ children }: Props) => {
  const [minimalCards, setMinimalCards] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedTraits, setSelectedTraits] = useState<SelectedTrait[]>([]);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(
    dropdownOptions[0]
  );
  const [isFetching, setIsFetching] = useState(false);

  return (
    <HomeContext.Provider
      value={{
        minimalCards,
        setMinimalCards,
        showFilters,
        setShowFilters,
        selectedTraits,
        setSelectedTraits,
        selectedDropdownOption,
        setSelectedDropdownOption,
        isFetching,
        setIsFetching,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
