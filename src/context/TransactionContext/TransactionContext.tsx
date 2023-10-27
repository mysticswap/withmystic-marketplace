import { ReactNode, createContext, useContext, useState } from "react";
import { TransactionContextType } from "./types";
import { defaultOfferOrList } from "../../constants";

const TransactionContext = createContext<TransactionContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const TransactionContextProvider = ({ children }: Props) => {
  const [showOfferOrListingModal, setShowOfferOrListingModal] = useState(false);
  const [offerOrListModalContent, setOfferOrListModalContent] =
    useState(defaultOfferOrList);
  return (
    <TransactionContext.Provider
      value={{
        showOfferOrListingModal,
        setShowOfferOrListingModal,
        offerOrListModalContent,
        setOfferOrListModalContent,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
