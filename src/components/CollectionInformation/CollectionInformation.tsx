import './CollectionInformation.css'
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import millify from "millify";
import discordIcon from './../../assets/discord_icon.png'
import xIcon from './../../assets/twitter-x-logo.png'
import webSiteIcon from './../../assets/website-link-icon.png'
import {
  collectionNetworkIcon,
  collectionsWithHiddenNames,
} from "../../constants";
const CollectionInformation= () => {
  const {
    collectionMetadata,
    collectionChainId,
  } = useGlobalContext();
  
  const collectionContract =
    collectionMetadata?.collections?.[0]?.primaryContract;
  const nameShouldBeHidden = collectionsWithHiddenNames[collectionContract!];
  
  return(
    <div className="collection_information_wrapper">
          <div className="collection-information-container">
            <img src={collectionMetadata?.collections?.[0]?.image} className="collection-main-image"/>
            {!nameShouldBeHidden && <span className="collection_name">{collectionMetadata?.collections?.[0]?.name}</span>}
            <div className="collection-info-container">
              <span className="collection_info_label">Contract:{" "}<span className="collection_info">{collectionMetadata?.collections?.[0]?.floorAsk?.token?.contract}</span></span>
              <span className="collection_info_label">Royalties:{" "}<span className="collection_info">{collectionMetadata?.collections?.[0]?.allRoyalties?.opensea?.[0]?.bps}</span></span>
              <span className="collection_info_label">Created By:{" "}<span className="collection_info">{collectionMetadata?.collections?.[0]?.floorAsk.maker}</span></span>
              <div className="social-icons-container">
               <a href={`https://twitter.com/${collectionMetadata?.collections?.[0]?.twitterUsername}`}> <img className="social-icon" src={xIcon}></img></a>
               <a href={collectionMetadata?.collections?.[0]?.discordUrl}><img className="social-icon" src={discordIcon}></img></a>
               <a href={collectionMetadata?.collections?.[0]?.externalUrl} target='_blank'><img className="social-icon" src={webSiteIcon}></img></a> 
              </div>
            </div>
            <p className="collection-description">{collectionMetadata?.collections?.[0]?.description}</p>
          </div>
          <div className="items-information-container">
              <div className="item-information">
                <div className="item-information-value">{millify(Number(collectionMetadata?.collections?.[0]?.tokenCount))}</div>
                <span className="item-information-label">Items</span>
              </div>
              <div className="item-information">
                <div className="item-information-value">{millify(Number(collectionMetadata?.collections?.[0]?.ownerCount))}</div>
                <span className="item-information-label">Owners</span>
              </div>
              <div className="item-information">
                <div className="item-price-information">
                  <img className="item-info-ethereum-icon" src={collectionNetworkIcon[collectionChainId]}></img>
                  <span className="item-price-information-value">{millify(Number(collectionMetadata?.collections?.[0]?.volume?.allTime))}</span>
                </div>
                <span className="item-information-label">Total vol.</span>
              </div>
              <div className="item-information">
                <div className="item-price-information">
                  <img className="item-info-ethereum-icon" src={collectionNetworkIcon[collectionChainId]}></img>
                  <span className="item-price-information-value">
                    {Number(collectionMetadata?.collections?.[0]?.floorAsk?.price?.amount?.native) < 1
                        ? Number(collectionMetadata?.collections?.[0]?.floorAsk?.price?.amount?.native)
                        : Number(collectionMetadata?.collections?.[0]?.floorAsk?.price?.amount?.native)
                        ? millify(Number(collectionMetadata?.collections?.[0]?.floorAsk?.price?.amount?.native))
                        : "--"}
                    </span>
                  </div>
                <span className="item-information-label">Floor price</span>
              </div>
            </div>
        </div>
  )
}

export default CollectionInformation
