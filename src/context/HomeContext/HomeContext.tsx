import { ReactNode, createContext, useContext, useState } from "react";
import { HomeContextType, SelectedTrait } from "./types";

const HomeContext = createContext<HomeContextType | null>(null);

type Props = { children: ReactNode };

export const HomeContextProvider = ({ children }: Props) => {
  const dropdownOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rarity: Low to High",
    "Rarity: High to Low",
    "Token ID: Low to High",
  ];
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
        dropdownOptions,
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
