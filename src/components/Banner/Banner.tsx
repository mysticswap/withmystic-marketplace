import "./Banner.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

import {
  tabOptions,
} from "../../constants";

type IProps = {
  activity: boolean
  displayCollectionAvatar: boolean
}

const Banner = ({activity, displayCollectionAvatar }:IProps) => {
  const {
    currentTab,
    setCurrentTab,
    client,
    collectionMetadata
  } = useGlobalContext();

  return (
    <div className="banner-wrapper">
      {displayCollectionAvatar && <img src={collectionMetadata?.collections?.[0]?.image} className="collection-avatar"/>}
      <div className="banner">
        <img src={collectionMetadata?.collections?.[0]?.banner  || client.bannerUrl} alt="" />
        {activity && <div className="tabs">
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
        </div>}
      </div>
    </div>
  );
};

export default Banner;
