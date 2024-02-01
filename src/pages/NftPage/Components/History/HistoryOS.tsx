import dayjs from "dayjs";
import "./History.css";
import { TbExternalLink } from "react-icons/tb";
import CustomTooltip from "../../../../components/CustomTooltip/CustomTooltip";
import { scanWebsites } from "../../../../constants";
import { ActivityRowAddress } from "../../../../components/ActivityRow/ActivityRow";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { v4 as uuid } from "uuid";
import { NFTHistory } from "../../../../types/alchemy.types";
import { convertToETH } from "../../../../utils";

type Props = {
  nftHistory: NFTHistory;
};

const HistoryOS = ({ nftHistory }: Props) => {
  const { collectionChainId } = useGlobalContext();

  return (
    <div className="history">
      <div className="history_table">
        <p className="alt_history_title">History</p>
        <div className="history_table_head">
          <p>History</p>
          <p>Price</p>
          <p>From</p>
          <p>To</p>
          <p>Time</p>
        </div>
        <div>
          {nftHistory.transactions.map((activity) => {
            const timeStamp = dayjs(activity.timestamp * 1000).fromNow();
            const fullTime = dayjs(activity.timestamp * 1000).toString();
            const hasTxHas = "transactionHash" in activity;
            // const hasTxHas2 = activity.hasOwnProperty("transactionHash");

            return (
              <div key={uuid()} className="history_row">
                <p>Sale</p>
                <p>
                  {convertToETH(activity.sellerFee.amount)}{" "}
                  {activity.sellerFee.symbol}
                </p>
                <ActivityRowAddress
                  address={activity.sellerAddress}
                  isParagraph
                />
                <ActivityRowAddress
                  address={activity.buyerAddress}
                  isParagraph
                />
                <CustomTooltip text={fullTime}>
                  <p
                    onClick={() =>
                      window.open(
                        `${scanWebsites[collectionChainId]}tx/${activity.transactionHash}`
                      )
                    }
                  >
                    {timeStamp} {hasTxHas && <TbExternalLink display="block" />}
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

export default HistoryOS;
