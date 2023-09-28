export type HomeContextType = {
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  minimalCards: boolean;
  setMinimalCards: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTraits: SelectedTrait[];
  setSelectedTraits: React.Dispatch<React.SetStateAction<SelectedTrait[]>>;
  dropdownOptions: string[];
  selectedDropdownOption: string;
  setSelectedDropdownOption: React.Dispatch<React.SetStateAction<string>>;
};

export type SelectedTrait = { type: string; value: string };
