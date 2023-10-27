import { ReactNode, createContext, useContext, useState } from "react";
import { TransactionContextType } from "./types";
import { defaultOfferOrList } from "../../constants";

const TransactionContext = createContext<TransactionContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const TransactionContextProvider = ({ children }: Props) => {
  const [showOfferOrListingModal, setShowOfferOrListingModal] = useState(false);
  const [transactionNft, setTransactionNft] = useState(defaultOfferOrList);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [transactionStage, setTransactionStage] = useState(0);
  const [transactionHash, setTransactionHash] = useState("");

  return (
    <TransactionContext.Provider
      value={{
        showOfferOrListingModal,
        setShowOfferOrListingModal,
        transactionNft,
        setTransactionNft,
        showConfirmationModal,
        setShowConfirmationModal,
        transactionStage,
        setTransactionStage,
        transactionHash,
        setTransactionHash,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
