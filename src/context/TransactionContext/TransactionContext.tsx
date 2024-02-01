import { ReactNode, createContext, useContext, useState } from "react";
import { TransactionContextType } from "./types";
import { defaultOfferOrList } from "../../constants";
import { useGlobalContext } from "../GlobalContext/GlobalContext";

const TransactionContext = createContext<TransactionContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const TransactionContextProvider = ({ children }: Props) => {
  const { userBalance } = useGlobalContext();

  const [showOfferOrListingModal, setShowOfferOrListingModal] = useState(false);
  const [transactionNft, setTransactionNft] = useState(defaultOfferOrList);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [transactionStage, setTransactionStage] = useState(0);
  const [transactionHash, setTransactionHash] = useState("");

  const userCanCompleteTransaction =
    Number(userBalance?.ETH) >= transactionNft?.amount;

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
        userCanCompleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (context === undefined)
    throw new Error(
      "TransactionContext was used outside the TransactionContextProvider"
    );
  return context;
};
