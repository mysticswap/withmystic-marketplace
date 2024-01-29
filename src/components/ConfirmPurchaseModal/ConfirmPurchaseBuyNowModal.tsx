import { IoClose } from "react-icons/io5";
import "./ConfirmPurchaseModal.css";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import TransactionStages from "../TransactionStages/TransactionStages";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import ModalNftBuyNow from "../ModalNft/ModalNftBuyNow";
// import { useNftPageContext } from "../../context/NftPageContext/NftPageContext";

type Props = {
  setShowConfirmationBuyNowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmPurchaseBuyNowModal = ({
  setShowConfirmationBuyNowModal,
}: Props) => {
  const {
    transactionNft,
    transactionStage,
    setTransactionHash,
    setTransactionStage,
    userCanCompleteTransaction,
  } = useTransactionContext()!;

  // const { currentToken, userBalance, supportedTokens } = useGlobalContext();
  const { currentToken, supportedTokens } = useGlobalContext();

  // const { nftPriceData } = useNftPageContext()!;
  // const cryptoSymbol = nftPriceData.floorAsk.price.currency.symbol;

  const nftData = transactionNft;
  console.log(nftData);
  const modalTitle = transactionNft.isOffer && "Confirm purchase";

  const successMessage =
    transactionNft.isOffer && "Congratulations on your purchase!";

  // const userCanCompleteTransactionToken =
  //   Number(userBalance[cryptoSymbol]) >= transactionNft.amount;

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
            setShowConfirmationBuyNowModal(false);
            setTransactionHash("");
            setTransactionStage(0);
          }}
        />
        <div className="confirm_purchase_modal">
          <div className="modal_nft_holder">
            <ModalNftBuyNow
              nftData={nftData}
              supportedTokens={supportedTokens}
              currentToken={currentToken}
              offerAmount={nftData.amount}
            />
          </div>

          {userCanCompleteTransaction ? (
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

export default ConfirmPurchaseBuyNowModal;
