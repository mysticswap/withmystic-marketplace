import { IoClose } from "react-icons/io5";
import "./ConfirmPurchaseModal.css";
import ModalNft from "../ModalNft/ModalNft";
import { extractMetadata } from "../../utils";
import {
  Market,
  TokenToken,
} from "../../types/reservoir-types/collection-nfts.types";
import { OfferOrListUiData } from "../../context/GlobalContext/types";

type Props = {
  nft: TokenToken;
  nftMarketInfo: Market;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmPurchaseModal = ({
  nft,
  nftMarketInfo,
  setShowConfirmationModal,
}: Props) => {
  const nftData = extractMetadata(nft, nftMarketInfo);

  return (
    <div className="modal_parent">
      <div className="modal_content">
        <p className="modal_header">Confirm purchase</p>
        <IoClose
          className="modal_closer"
          display="block"
          size={25}
          onClick={() => setShowConfirmationModal(false)}
        />
        <div className="confirm_purchase_modal">
          <div className="modal_nft_holder">
            <ModalNft nftData={nftData as unknown as OfferOrListUiData} />
          </div>
          <div className="confirm_purchase_modal_buttom">
            <p>Confirm in Wallet</p>
            <p>
              Approve this purchase by accepting the transaction in your wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchaseModal;
