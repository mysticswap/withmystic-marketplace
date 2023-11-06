import { TbExternalLink } from "react-icons/tb";
import { redirectToMSWalletPage, truncateAddress } from "../../utils";
import "./ActivityRow.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { Link } from "react-router-dom";
import { Activity } from "../../types/reservoir-types/collection-activity.types";
import { activityRenames, scanWebsites, tabOptions } from "../../constants";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { SiOpensea } from "react-icons/si";
import x2y2 from "../../assets/x2y2.png";

dayjs.extend(relativeTime);

type Props = { activity: Activity };

const ActivityRow = ({ activity }: Props) => {
  const { collectionChainId, setCurrentTab } = useGlobalContext()!;

  const nftImage = activity?.token?.tokenImage;
  const nftName = activity?.token?.tokenName;
  const collectionImage = activity?.collection?.collectionImage;
  const collectionName = activity?.collection?.collectionName;
  const timeStamp = dayjs(activity?.timestamp * 1000).fromNow();
  const fullTime = dayjs(activity?.timestamp * 1000).toString();
  const price = activity?.price?.amount?.decimal;
  const activityType = activity.type;
  const hasTxHash = activity.hasOwnProperty("txHash");
  const source = activity?.order?.source?.icon;
  const tokenId = activity?.token?.tokenId;
  const contract = activity?.collection?.collectionId;
  const singlePageLink = `/${contract}/${tokenId}`;
  const switchTab = () => !tokenId && setCurrentTab(tabOptions[0]);

  return (
    <div className="activity_row">
      <>
        <div className="activity_row_type">
          {!source?.includes("opensea") ? (
            <img src={source?.includes("x2y2") ? x2y2 : source} alt="" />
          ) : (
            <SiOpensea display="block" color="#3498db" size={20} />
          )}
          <Link to={tokenId ? singlePageLink : ""} onClick={switchTab}>
            {activityRenames[activityType]}
          </Link>
        </div>
        <div className="activity_row_item">
          <Link to={tokenId ? singlePageLink : ""} onClick={switchTab}>
            <img
              src={nftImage || collectionImage}
              className="activity_row_image"
              alt=""
            />
          </Link>
          <Link to={tokenId ? singlePageLink : ""} onClick={switchTab}>
            <p>{nftName || collectionName}</p>
          </Link>
        </div>
        <div>
          <Link to={tokenId ? singlePageLink : ""} onClick={switchTab}>
            {price} {activity?.price.currency.symbol}
          </Link>
        </div>
      </>
      <ActivityRowAddress address={activity?.fromAddress} isParagraph={false} />
      <ActivityRowAddress address={activity?.toAddress!} isParagraph={false} />
      <div>
        <CustomTooltip text={fullTime}>
          <p
            onClick={() => {
              hasTxHash &&
                window.open(
                  `${scanWebsites[collectionChainId]}tx/${activity?.txHash}`
                );
            }}
          >
            {timeStamp} {hasTxHash && <TbExternalLink display="block" />}
          </p>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default ActivityRow;

type AddressRowProps = { address: string; isParagraph: boolean };

export const ActivityRowAddress = ({
  address,
  isParagraph,
}: AddressRowProps) => {
  return (
    <>
      {isParagraph ? (
        <p onClick={() => redirectToMSWalletPage(address)}>
          {address ? <>{truncateAddress(address, 5, "...")}</> : "---"}
        </p>
      ) : (
        <div onClick={() => redirectToMSWalletPage(address)}>
          {address ? <>{truncateAddress(address, 5, "...")}</> : "---"}
        </div>
      )}
    </>
  );
};
