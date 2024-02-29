import "./Banner.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

import {
  tabOptions,
} from "../../constants";

type IProps = {
  activity: boolean
}

const Banner = ({activity }:IProps) => {
  const {
    currentTab,
    setCurrentTab,
    client,
  } = useGlobalContext();

  return (
    <div className="wrapper">
      <div className="banner">
        <img src={client.bannerUrl} alt="" />
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
