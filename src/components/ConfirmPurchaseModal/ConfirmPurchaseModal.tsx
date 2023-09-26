import { IoClose } from "react-icons/io5";
import "./ConfirmPurchaseModal.css";
import { SingleNftData } from "../../types/alchemy.types";
import ModalNft from "../ModalNft/ModalNft";

type Props = {
  nft: SingleNftData;
  setConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmPurchaseModal = ({ nft, setConfirmationModal }: Props) => {
  const nftData = {
    collectionName: nft?.contract?.name,
    nftName: nft?.rawMetadata?.name,
    nftImage: nft?.media[0]?.gateway,
    ethAmount: 4,
    price: 123,
  };

  return (
    <div className="modal_parent">
      <div className="modal_content">
        <p className="modal_header">Confirm purchase</p>
        <IoClose
          className="modal_closer"
          display="block"
          size={25}
          onClick={() => setConfirmationModal(false)}
        />
        <div className="confirm_purchase_modal">
          <div className="modal_nft_holder">
            <ModalNft nftData={nftData} />
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
