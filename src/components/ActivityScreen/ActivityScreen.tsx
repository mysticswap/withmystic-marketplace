import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import "./ActivityScreen.css";
import ActivityRow from "../ActivityRow/ActivityRow";
import SolidButton from "../SolidButton/SolidButton";
import { BiLoaderCircle } from "react-icons/bi";
import { getCollectionActivity } from "../../services/api/marketplace-reservoir-api";
import FiltersSidebar from "../FiltersSidebar/FiltersSidebar";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import { v4 as uuid } from "uuid";

const ActivityScreen = () => {
  const {
    collectionMetadata,
    collectionActivity,
    setCollectionActivity,
    selectedActivities,
    collectionChainId,
  } = useGlobalContext();
  const { setShowMobileFilters } = useHomeContext()!;
  const [activities, setActivities] = useState(collectionActivity?.activities);
  const [canFetch, setCanFetch] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setActivities(collectionActivity?.activities);
  }, [collectionActivity]);

  const loadMoreHistory = () => {
    const selectedActivityTypes = JSON.stringify(selectedActivities);
    setCanFetch(false);
    setIsFetching(true);
    getCollectionActivity(
      collectionChainId,
      collectionMetadata?.collections[0].primaryContract!,
      selectedActivityTypes
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
    <div className="activity_screen_parent">
      <FiltersSidebar isForTraits={false} />
      <div className="activity_screen">
        <div className="sales_table_head">
          <div></div>
          <div>Item</div>
          <div>Price</div>
          <div>From</div>
          <div>To</div>
          <div>Time</div>
        </div>
        {!activities?.length && (
          <p className="activities_loading">Loading...</p>
        )}
        {activities?.map((activity) => {
          return <ActivityRow key={uuid()} activity={activity} />;
        })}
        {collectionActivity.continuation && canFetch && (
          <SolidButton text="Show more" onClick={loadMoreHistory} />
        )}
        {isFetching && <BiLoaderCircle className="loader" size={50} />}
        {isMobile && (
          <button
            className="mobile_activity_filter_button"
            onClick={() => setShowMobileFilters(true)}
          >
            Activity Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityScreen;
