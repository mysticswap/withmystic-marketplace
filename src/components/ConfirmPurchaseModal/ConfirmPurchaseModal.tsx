import { IoClose } from "react-icons/io5";
import "./ConfirmPurchaseModal.css";
import ModalNft from "../ModalNft/ModalNft";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import TransactionStages from "../TransactionStages/TransactionStages";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

type Props = {
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmPurchaseModal = ({ setShowConfirmationModal }: Props) => {
  const {
    transactionNft,
    transactionStage,
    setTransactionHash,
    setTransactionStage,
    userCanCompleteTransaction,
  } = useTransactionContext()!;

  const { currentToken } = useGlobalContext();

  const { supportedTokens } = useGlobalContext();
  const nftData = transactionNft;
  const modalTitle = transactionNft.isSale
    ? "Confirm transaction"
    : "Confirm purchase";
  const successMessage = transactionNft.isSale
    ? "Congratulations on your sale!"
    : "Congratulations on your purchase!";

  return (
    <div className="modal_parent">
      <div className="modal_content">
        <p className="modal_header">
          {/* {transactionStage !== 2 ? modalTitle : successMessage} */}
          {transactionStage !== 2 ? modalTitle : successMessage}
        </p>
        <IoClose
          className="modal_closer"
          display="block"
          size={25}
          onClick={() => {
            setShowConfirmationModal(false);
            setTransactionHash("");
            setTransactionStage(0);
          }}
        />
        <div className="confirm_purchase_modal">
          <div className="modal_nft_holder">
            <ModalNft
              nftData={nftData}
              supportedTokens={supportedTokens!}
              currentToken={currentToken}
              offerAmount={nftData.amount}
            />
          </div>

          {userCanCompleteTransaction || nftData.isSale ? (
            <>
              {!transactionStage ? (
                <div className="confirm_purchase_modal_buttom">
                  <p>Confirm in Wallet</p>
                  <p>
                    Approve this purchase by accepting the transaction in your
                    wallet.
                  </p>
                </div>
              ) : (
                <TransactionStages stage={transactionStage} />
              )}
            </>
          ) : (
            <div className="stage">
              <p>Insufficient funds</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchaseModal;
