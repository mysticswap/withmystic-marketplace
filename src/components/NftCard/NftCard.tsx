import "./NftCard.css";
import { Link } from "react-router-dom";
import { TokenElement } from "../../types/reservoir-types/collection-nfts.types";

type Props = { nft: TokenElement };

const NftCard = ({ nft }: Props) => {
  const currentEthAmount =
    nft?.market?.floorAsk?.price?.amount?.decimal?.toFixed(4);
  const symbol = nft?.market?.floorAsk?.price?.currency?.symbol;
  const currentValue = Math.ceil(nft?.market?.floorAsk?.price?.amount?.usd);
  const lastSale = nft?.market?.floorAsk?.price?.amount?.decimal?.toFixed(4);

  return (
    <div className="nft_card">
      <Link to={`/nft/${nft?.token?.tokenId}`}>
        <img src={nft?.token?.image} alt="" />
      </Link>
      <div className="nft_card_details">
        <div className="card_name">
          <Link to={`/nft/${nft?.token?.tokenId}`}>
            <p>{nft?.token?.name}</p>
          </Link>
        </div>
        <Link to={`/nft/${nft?.token?.tokenId}`}>
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
