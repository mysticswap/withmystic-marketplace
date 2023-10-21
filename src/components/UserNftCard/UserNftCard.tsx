import { useRef } from "react";
import { UserTokenElement } from "../../types/reservoir-types/user-nfts.types";
import "./UserNftCard.css";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { useIsOverflow } from "../../hooks/useIsOverflow";

type Props = {
  nft: UserTokenElement;
};

const UserNftCard = ({ nft }: Props) => {
  const nameRef = useRef(null);
  const isOverflowing = useIsOverflow(nameRef);

  const nftName = nft?.token?.name;
  const rarityRank = nft?.token?.rarityRank;

  return (
    <div className="nft_card user_nft_card">
      <img src={nft?.token?.image} alt="" />

      <div className="nft_card_details">
        <div className="card_name">
          {isOverflowing ? (
            <CustomTooltip text={nftName}>
              <p ref={nameRef}>{nftName}</p>
            </CustomTooltip>
          ) : (
            <p ref={nameRef}>{nftName}</p>
          )}
        </div>
        <p className="user_nft_card_rarity">#{rarityRank}</p>
      </div>
    </div>
  );
};

export default UserNftCard;
