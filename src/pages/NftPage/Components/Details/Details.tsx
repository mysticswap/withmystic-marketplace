import { TokenToken } from "../../../../types/reservoir-types/collection-nfts.types";
import { truncateAddress } from "../../../../utils";
import "./Details.css";

type Props = {
  nftInfo: TokenToken;
};

const Details = ({ nftInfo }: Props) => {
  const details = [
    { title: "Contract Address", value: nftInfo?.contract },
    { title: "Token ID", value: nftInfo?.tokenId },
    { title: "Token Standard", value: nftInfo?.kind.toUpperCase() },
    { title: "Royalties", value: "5%" },
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
              <p>
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
