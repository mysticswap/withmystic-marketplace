/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";
import { TransactionContextType } from "./types";
import { defaultOfferOrList } from "../../constants";
import { useGlobalContext } from "../GlobalContext/GlobalContext";

const TransactionContext = createContext<TransactionContextType | null>(null);

type Props = {
  children: ReactNode;
};
// Manage all related with the transactions of nfts
export const TransactionContextProvider = ({ children }: Props) => {
  const { userBalance } = useGlobalContext();

  const [showOfferOrListingModal, setShowOfferOrListingModal] = useState(false);
  const [transactionNft, setTransactionNft] = useState(defaultOfferOrList);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showConfirmationBuyNowModal, setShowConfirmationBuyNowModal] =
    useState(false);
  const [transactionStage, setTransactionStage] = useState(0);
  const [transactionHash, setTransactionHash] = useState("");

  const tokenSymbol = transactionNft.symbol;

  // const userCanCompleteTransaction =
  //   Number(userBalance?.ETH) >= transactionNft?.amount;
  const userCanCompleteTransaction =
    Number(userBalance?.[tokenSymbol]) >= transactionNft?.amount;

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
        showConfirmationBuyNowModal,
        setShowConfirmationBuyNowModal,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
