import { TbExternalLink } from "react-icons/tb";
import { NftSale } from "../../types/alchemy.types";
import {
  convertDecimalsToReadableNumbers,
  formatOnlyDecimals,
  redirectToMSWalletPage,
  truncateAddress,
} from "../../utils";
import "./ActivityRow.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

type Props = { activity: NftSale };

const ActivityRow = ({ activity }: Props) => {
  const collectionImage = activity?.tokenMetadata?.media?.[0]?.gateway;
  const collectionName = activity?.tokenMetadata?.title;
  const timeStamp = dayjs(activity?.timestamp * 1000).fromNow();
  const fullTime = dayjs(activity?.timestamp * 1000).toString();
  const price = convertDecimalsToReadableNumbers(
    String(
      Number(activity?.sellerFee?.amount) +
        Number(activity?.marketplaceFee?.amount) +
        Number(activity?.protocolFee?.amount)
    ),
    activity?.sellerFee?.decimals
  );

  return (
    <div className="activity_row">
      <>
        <div>
          <Link to={`/nft/${activity?.tokenId}`}>Sale</Link>
        </div>
        <div className="activity_row_item">
          <Link to={`/nft/${activity?.tokenId}`}>
            <img src={collectionImage} className="activity_row_image" alt="" />
          </Link>
          <Link to={`/nft/${activity?.tokenId}`}>
            <p>{collectionName}</p>
          </Link>
        </div>
        <div>
          <Link to={`/nft/${activity?.tokenId}`}>
            {formatOnlyDecimals(price)} {activity?.sellerFee?.symbol}
          </Link>
        </div>
      </>

      <div onClick={() => redirectToMSWalletPage(activity?.sellerAddress)}>
        {truncateAddress(activity?.sellerAddress, 5, "...")}
      </div>
      <div onClick={() => redirectToMSWalletPage(activity?.buyerAddress)}>
        {truncateAddress(activity?.buyerAddress, 5, "...")}
      </div>
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
