import "./ModalNft.css";

type Props = {
  nftData: {
    collectionName: string;
    nftName: string;
    nftImage: string;
    ethAmount: number;
    price: number;
  };
};

const ModalNft = ({ nftData }: Props) => {
  return (
    <div className="modal_nft">
      <div className="modal_nft_metadata">
        <img src={nftData.nftImage} alt="" />
        <div>
          <p>{nftData.collectionName}</p>
          <p>{nftData.nftName}</p>
        </div>
      </div>

      <p className="modal_nft_value">
        {nftData.ethAmount} ETH <span>(${nftData.price})</span>
      </p>
    </div>
  );
};

export default ModalNft;
