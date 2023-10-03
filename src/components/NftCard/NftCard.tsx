import "./NftCard.css";
import { Link } from "react-router-dom";
import { TokenElement } from "../../types/reservoir-types/collection-nfts.types";
import { useEffect, useRef, useState } from "react";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import CustomTooltip from "../CustomTooltip/CustomTooltip";

type Props = { nft: TokenElement };

const NftCard = ({ nft }: Props) => {
  const { minimalCards } = useHomeContext()!;

  const nameRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const currentEthAmount =
    nft?.market?.floorAsk?.price?.amount?.decimal?.toFixed(4);
  const symbol = nft?.market?.floorAsk?.price?.currency?.symbol;
  const currentValue = Math.ceil(nft?.market?.floorAsk?.price?.amount?.usd);
  const lastSale = nft?.market?.floorAsk?.price?.amount?.decimal?.toFixed(4);
  const nftName = nft?.token?.name;
  const nftId = nft?.token?.tokenId;

  const nameLink = (
    <Link to={`/nft/${nftId}`}>
      <p ref={nameRef}>{nftName}</p>
    </Link>
  );

  useEffect(() => {
    if (nameRef.current) {
      const element = nameRef.current as HTMLElement;
      const isOverflowing = element.scrollWidth > element.clientWidth;
      setIsOverflowing(isOverflowing);
    }
  }, [nameRef, minimalCards]);

  return (
    <div className="nft_card">
      <Link to={`/nft/${nftId}`}>
        <img src={nft?.token?.image} alt="" />
      </Link>
      <div className="nft_card_details">
        <div className="card_name">
          {isOverflowing ? (
            <CustomTooltip text={nftName}>{nameLink}</CustomTooltip>
          ) : (
            <>{nameLink}</>
          )}
        </div>
        <Link to={`/nft/${nftId}`}>
          <p className="nft_card_amount">
            {currentEthAmount && currentValue ? (
              <>
                {currentEthAmount} <span>(${currentValue})</span>
              </>
            ) : (
              <span>---</span>
            )}
          </p>
        </Link>

        <p className="nft_card_last_sale">
          Last sale: {lastSale}
          {symbol} {!lastSale && !symbol && "---"}
        </p>
        {currentEthAmount && currentValue && <button>Buy now</button>}
      </div>
    </div>
  );
};

export default NftCard;
