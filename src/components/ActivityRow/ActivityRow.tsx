import { TbExternalLink } from "react-icons/tb";
import { useGlobalContext } from "../../context/GlobalContext";
import { NftSale } from "../../types/alchemy.types";
import { convertDecimalsToReadableNumbers, truncateAddress } from "../../utils";
import "./ActivityRow.css";

type Props = { activity: NftSale };

const ActivityRow = ({ activity }: Props) => {
  const { collectionMetadata } = useGlobalContext()!;
  const collectionImage = collectionMetadata?.openSea?.imageUrl;
  const collectionName = collectionMetadata?.name;
  return (
    <div className="activity_row">
      <div>Sale</div>
      <div className="activity_row_item">
        <img src={collectionImage} className="activity_row_image" alt="" />
        <p>
          {collectionName} #{activity.tokenId}
        </p>
      </div>
      <div>
        {convertDecimalsToReadableNumbers(
          activity.sellerFee.amount,
          activity.sellerFee.decimals
        )}{" "}
        {activity.sellerFee.symbol}
      </div>
      <div>{truncateAddress(activity.sellerAddress, 5, "...")}</div>
      <div>{truncateAddress(activity.buyerAddress, 5, "...")}</div>
      <div>
        <p>
          3 days ago <TbExternalLink display="block" />
        </p>
      </div>
    </div>
  );
};

export default ActivityRow;
