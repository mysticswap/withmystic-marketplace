import dayjs from "dayjs";
import "./History.css";
import { TbExternalLink } from "react-icons/tb";
import CustomTooltip from "../../../../components/CustomTooltip/CustomTooltip";
import { CollectionActivity as NftActivity } from "../../../../types/reservoir-types/collection-activity.types";
import {
  activityRenames,
  reservoirActivityTypes,
  scanWebsites,
} from "../../../../constants";
import { ActivityRowAddress } from "../../../../components/ActivityRow/ActivityRow";
import { useState } from "react";
import { getNftActivity } from "../../../../services/api/marketplace-reservoir-api";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { v4 as uuid } from "uuid";

type Props = {
  nftActivity: NftActivity;
  token: string;
  setNftActivity: React.Dispatch<React.SetStateAction<NftActivity>>;
};

const History = ({ nftActivity, token, setNftActivity }: Props) => {
  const { collectionChainId } = useGlobalContext()!;
  const [isFetching, setIsFetching] = useState(false);
  const fetchMoreActivity = () => {
    setIsFetching(true);
    getNftActivity(
      collectionChainId,
      token,
      reservoirActivityTypes,
      nftActivity.continuation!
    )
      .then((result) => {
        setNftActivity({
          activities: [...nftActivity.activities, ...result.activities],
          continuation: nftActivity.continuation,
        });
      })
      .finally(() => {
        setIsFetching(false);
      });
  };
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
          {nftActivity?.activities?.map((activity) => {
            const timeStamp = dayjs(activity.timestamp * 1000).fromNow();
            const fullTime = dayjs(activity.timestamp * 1000).toString();
            const hasTxHas = activity.hasOwnProperty("txHash");

            return (
              <div key={uuid()} className="history_row">
                <p>{activityRenames[activity.type]}</p>
                <p>
                  {activity.price.amount.decimal}{" "}
                  {activity.price.currency.symbol}
                </p>
                <ActivityRowAddress
                  address={activity.fromAddress}
                  isParagraph
                />
                <ActivityRowAddress address={activity.toAddress!} isParagraph />
                <CustomTooltip text={fullTime}>
                  <p
                    onClick={() =>
                      window.open(
                        `${scanWebsites[collectionChainId]}tx/${activity.txHash}`
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

      {nftActivity.continuation && !isFetching && (
        <button className="more_offers_btn" onClick={fetchMoreActivity}>
          Load More
        </button>
      )}
    </div>
  );
};

export default History;
