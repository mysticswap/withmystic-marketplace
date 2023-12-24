import { TransactionNft } from "../../context/TransactionContext/types";
import "./ModalNft.css";

type Props = {
  nftData: TransactionNft;
};

const ModalNft = ({ nftData }: Props) => {
  return (
    <div className="modal_nft">
      <div className="modal_nft_metadata">
        <img src={nftData.nftImage} alt="" />
        <div className="ellipsis">
          <p className="ellipsis">{nftData.collectionName}</p>
          <p className="ellipsis">{nftData.nftName}</p>
        </div>
      </div>

      <p className="modal_nft_value">
        {nftData.amount || "--"} {nftData.isOffer ? "wETH" : "ETH"}{" "}
        <span>(${Math.ceil(nftData.price) || "--"})</span>
      </p>
    </div>
  );
};

export default ModalNft;
