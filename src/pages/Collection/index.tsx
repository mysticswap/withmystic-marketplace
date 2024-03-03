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
import CollectionInformation from "../../components/CollectionInformation/CollectionInformation";
import {useParams, useNavigate} from 'react-router-dom'
import { useEffect } from "react";

const Collection = () => {
  const { currentTab, setSelectedCollection, availableCollections } = useGlobalContext();
  const {
    showOfferOrListingModal,
    setShowOfferOrListingModal,
    showConfirmationModal,
    setShowConfirmationModal,
    showConfirmationBuyNowModal,
    setShowConfirmationBuyNowModal,
  } = useTransactionContext()!;
  
  const {id:collectionId} = useParams()
  const navigate = useNavigate()
  useEffect(()=>{
      const selectedCollection = availableCollections.find((collection) => String(collection.id) === collectionId)
      if(!selectedCollection) return navigate('/')
      setSelectedCollection(selectedCollection)
  },[])
  const isInItemsSection = currentTab == tabOptions[0];

  return (
    <div>
      <Banner activity={true} displayCollectionAvatar={true} />
      <CollectionInformation/>
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
