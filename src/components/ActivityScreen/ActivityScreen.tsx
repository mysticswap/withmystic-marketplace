import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import "./ActivityScreen.css";
import ActivityRow from "../ActivityRow/ActivityRow";
import SolidButton from "../SolidButton/SolidButton";
import { BiLoaderCircle } from "react-icons/bi";
import { getCollectionActivity } from "../../services/marketplace-reservoir-api";
import { reservoirActivityTypes } from "../../constants";

const ActivityScreen = () => {
  const {
    collectionMetadata,
    chainId,
    collectionActivity,
    setCollectionActivity,
  } = useGlobalContext()!;
  const [sales, setSales] = useState(collectionActivity?.activities);
  const [canFetch, setCanFetch] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setSales(collectionActivity?.activities);
  }, [collectionActivity]);

  const loadMoreHistory = () => {
    setCanFetch(false);
    setIsFetching(true);
    getCollectionActivity(
      chainId,
      collectionMetadata?.collections[0].primaryContract!,
      reservoirActivityTypes
    )
      .then((result) => {
        setCollectionActivity({
          activities: [...collectionActivity.activities, ...result.activities],
          continuation: result.continuation,
        });
      })
      .finally(() => {
        setCanFetch(true);
        setIsFetching(false);
      });
  };

  return (
    <div className="activity_screen">
      <div className="sales_table_head">
        <div></div>
        <div>Item</div>
        <div>Price</div>
        <div>From</div>
        <div>To</div>
        <div>Time</div>
      </div>
      {sales?.map((sale) => {
        return <ActivityRow key={sale?.order?.id} activity={sale} />;
      })}
      {collectionActivity.continuation && canFetch && (
        <SolidButton text="Show more" onClick={loadMoreHistory} />
      )}
      {isFetching && <BiLoaderCircle className="loader" size={50} />}
    </div>
  );
};

export default ActivityScreen;
