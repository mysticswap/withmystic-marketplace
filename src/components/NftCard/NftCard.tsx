import "./NftCard.css";
import { SingleNftData } from "../../types/alchemy.types";
import { VscVerifiedFilled } from "react-icons/vsc";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { Link } from "react-router-dom";

type Props = { nft: SingleNftData };

const NftCard = ({ nft }: Props) => {
  return (
    <div className="nft_card">
      <img src={nft.media[0].gateway} alt="" />
      <div className="nft_card_details">
        <div className="card_name">
          <Link to={`/nft/${nft.tokenId}`}>
            <p>{nft.title}</p>
          </Link>
          <CustomTooltip text="This collection has been verified">
            <span>
              <VscVerifiedFilled color="#3498db" display="block" size={20} />
            </span>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
