import dayjs from "dayjs";
import { SingleNftHistory } from "../../../../types/alchemy.types";
import {
  convertDecimalsToReadableNumbers,
  redirectToMSWalletPage,
  truncateAddress,
} from "../../../../utils";
import "./History.css";
import { TbExternalLink } from "react-icons/tb";
import CustomTooltip from "../../../../components/CustomTooltip/CustomTooltip";

type Props = {
  nftHistory: SingleNftHistory;
};

const History = ({ nftHistory }: Props) => {
  const historyData = nftHistory.transactions;

  return (
    <div className="history">
      <div className="history_table">
        <div className="history_table_head">
          <p>History</p>
          <p>Price</p>
          <p>From</p>
          <p>To</p>
          <p>Time</p>
        </div>
        <div>
          {historyData.map((item) => {
            const price = convertDecimalsToReadableNumbers(
              String(
                Number(item?.sellerFee?.amount) +
                  Number(item?.marketplaceFee?.amount) +
                  Number(item?.protocolFee?.amount)
              ),
              item?.sellerFee?.decimals
            );
            const timeStamp = dayjs(item?.timestamp * 1000).fromNow();
            const fullTime = dayjs(item?.timestamp * 1000).toString();
            return (
              <div key={item.timestamp} className="history_row">
                <p>Sale</p>
                <p>{price} ETH</p>
                <p onClick={() => redirectToMSWalletPage(item.sellerAddress)}>
                  {truncateAddress(item.sellerAddress, 5, "...")}
                </p>
                <p onClick={() => redirectToMSWalletPage(item.buyerAddress)}>
                  {truncateAddress(item.buyerAddress, 5, "...")}
                </p>
                <CustomTooltip text={fullTime}>
                  <p>
                    {timeStamp} <TbExternalLink display="block" />
                  </p>
                </CustomTooltip>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
