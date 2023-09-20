import { SingleNftData } from "../../../../types/alchemy.types";
import { truncateAddress } from "../../../../utils";
import "./Details.css";

type Props = {
  nftData: SingleNftData;
};

const Details = ({ nftData }: Props) => {
  const details = [
    { title: "Contract Address", value: nftData?.contract?.address },
    { title: "Token ID", value: nftData?.tokenId },
    { title: "Token Standard", value: nftData?.tokenType },
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
