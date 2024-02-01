import { scanWebsites } from "../../../../constants";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useNftPageContext } from "../../../../context/NftPageContext/NftPageContext";
import { TokenToken } from "../../../../types/reservoir-types/collection-nfts.types";
import { truncateAddress } from "../../../../utils";
import "./Details.css";

type Props = {
  nftInfo: TokenToken;
};

const DetailsOS = ({ nftInfo }: Props) => {
  const { collectionMetadata, collectionChainId } = useGlobalContext();
  const { nftDataOS } = useNftPageContext()!;
  const Royalties =
    collectionMetadata?.collections?.[0]?.allRoyalties?.opensea?.[0]?.bps;
  const details = [
    { title: "Contract Address", value: nftDataOS.contract.address },
    { title: "Token ID", value: nftDataOS.tokenId },
    { title: "Token Standard", value: nftDataOS.contract.tokenType },
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

export default DetailsOS;
