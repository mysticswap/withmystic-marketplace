export type HomeContextType = {
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  // minimalCards: boolean;
  // setMinimalCards: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTraits: SelectedTrait[];
  setSelectedTraits: React.Dispatch<React.SetStateAction<SelectedTrait[]>>;
  selectedDropdownOption: DropdownOption;
  setSelectedDropdownOption: React.Dispatch<
    React.SetStateAction<DropdownOption>
  >;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  numericFilters: NumericFiltersType;
  setNumericFilters: React.Dispatch<React.SetStateAction<NumericFiltersType>>;
};

export type SelectedTrait = { type: string; value: string };
export type DropdownOption = {
  title: string;
  value: string;
  order: string;
};
export type NumericFiltersType = {
  minRarityRank: string;
  maxRarityRank: string;
  minFloorAskPrice: string;
  maxFloorAskPrice: string;
};
