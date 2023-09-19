import "./index.css";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import ControlBar from "../../components/ControlBar/ControlBar";
import ItemsScreen from "../../components/ItemsScreen/ItemsScreen";
import { useHomeContext } from "../../context/HomeContext";
import ActivityScreen from "../../components/ActivityScreen/ActivityScreen";

const Home = () => {
  const { currentTab, tabOptions } = useHomeContext()!;
  const isInItemsSection = currentTab == tabOptions[0];
  return (
    <div>
      <Navbar
        logo={"https://mysticswap.io/static/media/mystWizGuild2.824b89cd.png"}
      />
      <Banner
        bannerImage={
          "https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840"
        }
      />
      <ControlBar />
      {isInItemsSection ? <ItemsScreen /> : <ActivityScreen />}
    </div>
  );
};

export default Home;
