import { ReactNode, createContext, useContext, useState } from "react";

type ContextType = {
  tabOptions: string[];
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  minimalCards: boolean;
  setMinimalCards: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeContext = createContext<ContextType | null>(null);

type Props = { children: ReactNode };

export const HomeContextProvider = ({ children }: Props) => {
  const tabOptions = ["Items", "Activity"];
  const [currentTab, setCurrentTab] = useState(tabOptions[0]);
  const [minimalCards, setMinimalCards] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  return (
    <HomeContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        tabOptions,
        minimalCards,
        setMinimalCards,
        showFilters,
        setShowFilters,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
