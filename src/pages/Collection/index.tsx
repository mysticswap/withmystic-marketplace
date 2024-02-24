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
import ConfirmPurchaseBuyNowModal from "../../components/ConfirmPurchaseModal/ConfirmPurchaseBuyNowModal";

const Collection = () => {
  const { currentTab } = useGlobalContext();
  const {
    showOfferOrListingModal,
    setShowOfferOrListingModal,
    showConfirmationModal,
    setShowConfirmationModal,
    showConfirmationBuyNowModal,
    setShowConfirmationBuyNowModal,
  } = useTransactionContext()!;
  const isInItemsSection = currentTab == tabOptions[0];

  return (
    <div>
      <Banner details={true} activity={true} collectionInformation={true} />
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
      {showConfirmationBuyNowModal && (
        <ConfirmPurchaseBuyNowModal
          setShowConfirmationBuyNowModal={setShowConfirmationBuyNowModal}
        />
      )}
    </div>
  );
};

export default Collection;
