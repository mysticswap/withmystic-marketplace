export type HomeContextType = {
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  minimalCards: boolean;
  setMinimalCards: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTraits: SelectedTrait[];
  setSelectedTraits: React.Dispatch<React.SetStateAction<SelectedTrait[]>>;
  selectedDropdownOption: DropdownOption;
  setSelectedDropdownOption: React.Dispatch<
    React.SetStateAction<DropdownOption>
  >;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SelectedTrait = { type: string; value: string };
export type DropdownOption = {
  title: string;
  value: string;
  order: string;
};
