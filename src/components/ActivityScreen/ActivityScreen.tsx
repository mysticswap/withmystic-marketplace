import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import "./ActivityScreen.css";
import ActivityRow from "../ActivityRow/ActivityRow";
import SolidButton from "../SolidButton/SolidButton";
import { getCollectionHistory } from "../../services/marketplace-api";
import { API_KEY } from "../../config";
import { BiLoaderCircle } from "react-icons/bi";

const ActivityScreen = () => {
  const {
    collectionHistory,
    setCollectionHistory,
    collectionMetadata,
    chainId,
  } = useGlobalContext()!;
  const [sales, setSales] = useState(collectionHistory?.nftSales);
  const [pageKey, setPageKey] = useState(collectionHistory.pageKey);
  const [canFetch, setCanFetch] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setSales(collectionHistory.nftSales);
    setPageKey(collectionHistory.pageKey);
  }, [collectionHistory]);

  const loadMoreHistory = () => {
    setCanFetch(false);
    setIsFetching(true);
    getCollectionHistory(
      collectionMetadata?.collections[0].primaryContract!,
      chainId,
      API_KEY,
      pageKey
    )
      .then((result) => {
        setCollectionHistory({
          nftSales: [...collectionHistory.nftSales, ...result?.nftSales],
          pageKey: result?.pageKey,
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
      {sales?.map((sale, index) => {
        return <ActivityRow key={sale.blockNumber * index} activity={sale} />;
      })}
      {pageKey && canFetch && (
        <SolidButton text="Show more" onClick={loadMoreHistory} />
      )}
      {isFetching && <BiLoaderCircle className="loader" size={50} />}
    </div>
  );
};

export default ActivityScreen;
