import "./Banner.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import millify from "millify";
import {
  collectionNetworkIcon,
  collectionsWithHiddenNames,
  tabOptions,
} from "../../constants";

const Banner = () => {
  const {
    collectionMetadata,
    currentTab,
    setCurrentTab,
    collectionChainId,
    client,
  } = useGlobalContext();

  const pillData = [
    { title: "Items", value: collectionMetadata?.collections?.[0]?.tokenCount },
    {
      title: "Owners",
      value: collectionMetadata?.collections?.[0]?.ownerCount,
    },
    {
      title: "Volume",
      value: collectionMetadata?.collections?.[0]?.volume?.allTime,
      icon: collectionNetworkIcon[collectionChainId],
    },
    {
      title: "Floor",
      value:
        collectionMetadata?.collections?.[0]?.floorAsk?.price?.amount?.native,
      icon: collectionNetworkIcon[collectionChainId],
    },
  ];
  const collectionContract =
    collectionMetadata?.collections?.[0]?.primaryContract;
  const nameShouldBeHidden = collectionsWithHiddenNames[collectionContract!];

  return (
    <div className="banner">
      <img src={client.bannerUrl} alt="" />
      <div className="banner_details">
        {!nameShouldBeHidden && (
          <h1>{collectionMetadata?.collections?.[0]?.name}</h1>
        )}
        <div className="collection_pill">
          {pillData.map((item) => {
            return (
              <div className="pill_item" key={item.title}>
                <div>
                  {item.icon && (
                    <img className="banner_pill_icon" src={item.icon} />
                  )}
                  <p>
                    {Number(item.value) < 1
                      ? Number(item.value)
                      : Number(item.value)
                      ? millify(Number(item.value))
                      : "--"}
                  </p>
                </div>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="tabs">
        {tabOptions.map((item) => {
          return (
            <button
              key={item}
              className={item == currentTab ? "active_tab" : ""}
              onClick={() => {
                setCurrentTab(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;
