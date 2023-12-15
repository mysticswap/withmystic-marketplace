import { scanWebsites } from "../../../../constants";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { TokenToken } from "../../../../types/rsv-types/collection-nfts.types";
import { truncateAddress } from "../../../../utils";
import "./Details.css";

type Props = {
  nftInfo: TokenToken;
};

const Details = ({ nftInfo }: Props) => {
  const { collectionMetadata, collectionChainId } = useGlobalContext();
  const Royalties =
    collectionMetadata?.collections?.[0]?.allRoyalties?.opensea?.[0]?.bps;
  const details = [
    { title: "Contract Address", value: nftInfo?.contract },
    { title: "Token ID", value: nftInfo?.tokenId },
    { title: "Token Standard", value: nftInfo?.kind.toUpperCase() },
    { title: "Royalties", value: `${Number(Royalties)! * 0.01 || "-- "}%` },
  ];

  return (
    <div className="details">
      <p className="details_title">Details</p>
      <div className="details_table">
        {details.map((detail, index) => {
          const isFirst = index == 0;
          return (
            <div key={detail.title}>
              <p>{detail.title}</p>
              <p
                className={isFirst ? "detail_address" : ""}
                onClick={() =>
                  isFirst &&
                  window.open(
                    `${scanWebsites[collectionChainId]}address/${detail.value}`
                  )
                }
              >
                {isFirst
                  ? truncateAddress(detail.value, 5, "...")
                  : detail.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Details;
