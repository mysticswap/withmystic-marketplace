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
import ActivityRowOS from "../ActivityRow/ActivityRowOS";
import { CollectionHistory } from "../../types/alchemy.types";
import { getCollectionHistory } from "../../services/api/marketplace-api";

const ActivityScreen = () => {
  const {
    collectionMetadata,
    collectionActivity,
    setCollectionActivity,
    selectedActivities,
    collectionChainId,
    collectionActivityOS,
    setCollectionActivityOS,
    collectionContract,
    client,
  } = useGlobalContext();
  const { setShowMobileFilters } = useHomeContext()!;
  const [activities, setActivities] = useState(collectionActivity?.activities);
  const [activitiesOS, setActivitiesOS] = useState(
    collectionActivityOS?.nftSales
  );
  const [canFetch, setCanFetch] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setActivities(collectionActivity?.activities);
    setActivitiesOS(collectionActivityOS?.nftSales);
  }, [collectionActivity, collectionActivityOS]);

  const fetchCollectionActivityOS = async () => {
    try {
      setCanFetch(false);
      setIsFetching(true);
      const res: CollectionHistory = await getCollectionHistory(
        collectionContract,
        collectionChainId,
        client.apiKey
      );
      setCollectionActivityOS({
        nftSales: [...collectionActivityOS!.nftSales, ...res.nftSales],
        pageKey: res.pageKey,
      });
    } catch (error) {
      console.log("Error");
    } finally {
      setCanFetch(true);
      setIsFetching(false);
    }
  };

  const loadMoreHistory = () => {
    const selectedActivityTypes = JSON.stringify(selectedActivities);
    setCanFetch(false);
    setIsFetching(true);
    if (collectionChainId === 1) {
      fetchCollectionActivityOS();
    } else {
      setCanFetch(false);
      setIsFetching(true);
      getCollectionActivity(
        collectionChainId,
        collectionMetadata!.collections[0].primaryContract!,
        selectedActivityTypes
      )
        .then((result) => {
          setCollectionActivity({
            activities: [
              ...collectionActivity.activities,
              ...result.activities,
            ],
            continuation: result.continuation,
          });
        })
        .finally(() => {
          setCanFetch(true);
          setIsFetching(false);
        });
    }
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

        {!activities?.length ||
          (!activitiesOS?.length && (
            <p className="activities_loading">Loading...</p>
          ))}

        {/* ChainID === 1 */}
        {/* {!activitiesOS?.length && (
          <p className="activities_loading">Loading...</p>
        )} */}

        {activitiesOS?.map((activity) => {
          return <ActivityRowOS key={uuid()} activity={activity} />;
        })}

        {/* {collectionActivityOS?.pageKey && canFetch && (
          <SolidButton text="Show more" onClick={loadMoreHistory} />
        )} */}

        {/* ChainID !== 1 */}

        {activities?.map((activity) => {
          return <ActivityRow key={uuid()} activity={activity} />;
        })}

        {collectionActivity.continuation ||
          (collectionActivityOS?.pageKey && canFetch && (
            <SolidButton text="Show more" onClick={loadMoreHistory} />
          ))}
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
