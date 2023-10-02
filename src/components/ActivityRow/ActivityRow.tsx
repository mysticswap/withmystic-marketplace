import { TbExternalLink } from "react-icons/tb";
import { redirectToMSWalletPage, truncateAddress } from "../../utils";
import "./ActivityRow.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { Link } from "react-router-dom";
import { Activity } from "../../types/reservoir-types/collection-activity.types";
import { activityRenames } from "../../constants";

dayjs.extend(relativeTime);

type Props = { activity: Activity };

const ActivityRow = ({ activity }: Props) => {
  const nftImage = activity?.token?.tokenImage;
  const nftName = activity?.token?.tokenName;
  const collectionImage = activity?.collection?.collectionImage;
  const collectionName = activity?.collection?.collectionName;
  const timeStamp = dayjs(activity?.timestamp * 1000).fromNow();
  const fullTime = dayjs(activity?.timestamp * 1000).toString();
  const price = activity?.price?.amount?.decimal;
  const activityType = activity.type;

  return (
    <div className="activity_row">
      <>
        <div>
          <Link to={`/nft/${activity?.token?.tokenId}`}>
            {activityRenames[activityType]}
          </Link>
        </div>
        <div className="activity_row_item">
          <Link to={`/nft/${activity?.token?.tokenId}`}>
            <img
              src={nftImage || collectionImage}
              className="activity_row_image"
              alt=""
            />
          </Link>
          <Link to={`/nft/${activity?.token?.tokenId}`}>
            <p>{nftName || collectionName}</p>
          </Link>
        </div>
        <div>
          <Link to={`/nft/${activity?.token?.tokenId}`}>
            {price} {activity?.price.currency.symbol}
          </Link>
        </div>
      </>
      <ActivityRowAddress address={activity?.fromAddress} />
      <ActivityRowAddress address={activity?.toAddress!} />
      <div>
        <CustomTooltip text={fullTime}>
          <p>
            {timeStamp} <TbExternalLink display="block" />
          </p>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default ActivityRow;

type AddressRowProps = { address: string };

const ActivityRowAddress = ({ address }: AddressRowProps) => {
  return (
    <div onClick={() => redirectToMSWalletPage(address)}>
      {address ? <>{truncateAddress(address, 5, "...")}</> : "---"}
    </div>
  );
};
