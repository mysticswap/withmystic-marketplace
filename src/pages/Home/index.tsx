import "./index.css";
import Banner from "../../components/Banner/Banner";
import ControlBar from "../../components/ControlBar/ControlBar";
import ItemsScreen from "../../components/ItemsScreen/ItemsScreen";
import ActivityScreen from "../../components/ActivityScreen/ActivityScreen";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { tabOptions } from "../../constants";
import OfferOrListingModal from "../../components/OfferOrListingModal/OfferOrListingModal";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import ConfirmPurchaseModal from "../../components/ConfirmPurchaseModal/ConfirmPurchaseModal";

const Home = () => {
  const { currentTab } = useGlobalContext()!;
  const {
    showOfferOrListingModal,
    setShowOfferOrListingModal,
    showConfirmationModal,
    setShowConfirmationModal,
  } = useTransactionContext()!;
  const isInItemsSection = currentTab == tabOptions[0];
  return (
    <div>
      <Banner
        bannerImage={
          "https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840"
        }
      />
      <ControlBar isInItemsSection={isInItemsSection} />

      {isInItemsSection ? <ItemsScreen /> : <ActivityScreen />}

      {showOfferOrListingModal && (
        <OfferOrListingModal
          setShowOfferOrListingModal={setShowOfferOrListingModal}
        />
      )}

      {showConfirmationModal && (
        <ConfirmPurchaseModal
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}
    </div>
  );
};

export default Home;
