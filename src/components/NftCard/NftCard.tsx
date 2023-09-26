import "./NftCard.css";
import { SingleNftData } from "../../types/alchemy.types";
import { Link } from "react-router-dom";

type Props = { nft: SingleNftData };

const NftCard = ({ nft }: Props) => {
  return (
    <div className="nft_card">
      <img src={nft?.media[0]?.gateway} alt="" />
      <div className="nft_card_details">
        <div className="card_name">
          <Link to={`/nft/${nft.tokenId}`}>
            <p>{nft.title}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
