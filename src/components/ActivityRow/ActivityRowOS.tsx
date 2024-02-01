/* eslint-disable no-prototype-builtins */
import { TbExternalLink } from "react-icons/tb";
import {
  convertToETH,
  convertToIPFSImage,
  redirectToMSWalletPage,
  truncateAddress,
} from "../../utils";
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
import { NftSale } from "../../types/alchemy.types";

dayjs.extend(relativeTime);

type Props = { activity: NftSale };

const ActivityRowOS = ({ activity }: Props) => {
  const { collectionChainId, setCurrentTab, client } = useGlobalContext();

  const nftImage = convertToIPFSImage(
    activity?.tokenMetadata.rawMetadata.image
  );
  const nftName = activity?.tokenMetadata.title;
  // const collectionImage = activity?.collection?.collectionImage;
  // const collectionName = activity?.collection?.collectionName;
  const timeStamp = dayjs(activity?.timestamp * 1000).fromNow();
  const fullTime = dayjs(activity?.timestamp * 1000).toString();
  const price = convertToETH(activity?.sellerFee.amount);
  // const activityType = activity.type;
  const hasTxHash = activity?.hasOwnProperty("transactionHash");
  // const source = activity?.order?.source?.icon;
  // const sourceDomain = activity?.order?.source?.domain;
  const tokenId = activity?.tokenId;
  const contract = activity?.contractAddress;
  const singlePageLink = `/${contract}/${tokenId}`;
  const switchTab = () => !tokenId && setCurrentTab(tabOptions[0]);
  // const isFromCurrentMarketplace = sourceDomain == client.hostname;

  return (
    <div className="activity_row">
      <>
        <div className="activity_row_type">
          {/* {!source?.includes("opensea") ? (
            <img
              src={
                source?.includes("x2y2")
                  ? x2y2
                  : isFromCurrentMarketplace
                  ? client.favicon
                  : source
              }
              alt=""
            />
          ) : ( */}
          <SiOpensea display="block" color="#3498db" size={20} />
          {/* )} */}
          <Link to={tokenId ? singlePageLink : ""} onClick={switchTab}>
            {/* {activityRenames[activityType]} */}
            Sale
          </Link>
        </div>
        <div className="activity_row_item">
          <Link to={tokenId ? singlePageLink : ""} onClick={switchTab}>
            <img src={nftImage} className="activity_row_image" alt="" />
          </Link>
          <Link to={tokenId ? singlePageLink : ""} onClick={switchTab}>
            <p>{nftName}</p>
          </Link>
        </div>
        <div>
          <Link to={tokenId ? singlePageLink : ""} onClick={switchTab}>
            {price < 0 ? "---" : price} {activity?.sellerFee.symbol || "ETH"}
          </Link>
        </div>
      </>
      <ActivityRowAddress
        address={activity?.sellerAddress}
        isParagraph={false}
      />
      <ActivityRowAddress
        address={activity!.buyerAddress!}
        isParagraph={false}
      />
      <div>
        <CustomTooltip text={fullTime}>
          <p
            onClick={() => {
              hasTxHash &&
                window.open(
                  `${scanWebsites[collectionChainId]}tx/${activity?.transactionHash}`
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

export default ActivityRowOS;

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
