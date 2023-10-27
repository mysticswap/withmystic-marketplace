import { IoClose } from "react-icons/io5";
import "./ConfirmPurchaseModal.css";
import ModalNft from "../ModalNft/ModalNft";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import TransactionStages from "../TransactionStages/TransactionStages";

type Props = {
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmPurchaseModal = ({ setShowConfirmationModal }: Props) => {
  const {
    transactionNft,
    transactionStage,
    setTransactionHash,
    setTransactionStage,
  } = useTransactionContext()!;
  const nftData = transactionNft;

  return (
    <div className="modal_parent">
      <div className="modal_content">
        <p className="modal_header">
          {transactionStage !== 2
            ? "Confirm purchase"
            : "Congratulations on your purchase!"}
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
            <ModalNft nftData={nftData} />
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchaseModal;
