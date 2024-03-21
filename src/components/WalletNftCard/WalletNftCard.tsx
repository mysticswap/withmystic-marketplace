import { TokenToken } from "../../types/rsv-types/collection-nfts.types";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import "./WalletNftCard.css";

type props = {
  nft: NftCard;
};
type NftCard = {
  token: TokenToken;
  ownerShip: object;
};
const WalletNftCard = ({ nft }: props) => {
  console.log("card", nft);
  return (
    <div className="wallet_nftCard_container">
      {nft?.token?.media != null && nft?.token?.image === null ? (
        <div className="video_container">
          <VideoPlayer videoUrl={nft?.token?.media} />
        </div>
      ) : (
        <img src={nft?.token?.image} alt="nft" title="nft_img" />
      )}
      <p>{nft.token.name}</p>
    </div>
  );
};
export default WalletNftCard;
