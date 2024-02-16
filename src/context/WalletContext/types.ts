export type WalletContextType = {
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  tokenId: string;
  setTokenId: React.Dispatch<React.SetStateAction<string>>;
  selectedDropdownOption: DropdownOption;
  setSelectedDropdownOption: React.Dispatch<
    React.SetStateAction<DropdownOption>
  >;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  numericFilters: NumericFiltersType;
  setNumericFilters: React.Dispatch<React.SetStateAction<NumericFiltersType>>;
  showMobileFilters: boolean;
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SelectedTrait = {
  type: string;
  value?: string;
  min?: string;
  max?: string;
};

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
