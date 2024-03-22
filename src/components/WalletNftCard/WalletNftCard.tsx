import { TokenToken } from "../../types/rsv-types/collection-nfts.types";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import "./WalletNftCard.css";

type props = {
  nft: NftCard;
};
export type NftCard = {
  token: TokenToken;
  ownerShip: object;
};
const WalletNftCard = ({ nft }: props) => {
  // console.log(nft);
  const nativeAmount = nft?.token?.floorAsk?.price?.amount?.native;
  const currentValue = nft?.token?.floorAsk?.price?.amount?.usd?.toFixed();

  const lastSale = nft?.token?.lastSale?.price?.amount?.native;

  return (
    <div className="wallet_nftCard_container">
      {nft?.token?.media != null && nft?.token?.image === null ? (
        <div className="video_container">
          <VideoPlayer videoUrl={nft?.token?.media} />
        </div>
      ) : (
        <img src={nft?.token?.image} alt="nft" title={nft?.token?.name} />
      )}
      <div className="wallet_nftCard_details">
        <p>{nft?.token?.name}</p>
        {nativeAmount && (
          <p className="nft_card_amount">
            {nativeAmount} <span>(${currentValue})</span>
          </p>
        )}
        {lastSale && (
          <p className="nft_card_last_sale">Last sale: {lastSale}</p>
        )}
      </div>
    </div>
  );
};
export default WalletNftCard;
