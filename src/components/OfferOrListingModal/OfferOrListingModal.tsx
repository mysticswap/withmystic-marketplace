import { IoClose } from "react-icons/io5";
import "./OfferOrListingModal.css";
import ModalNft from "../ModalNft/ModalNft";
import { BsCalendar } from "react-icons/bs";
import { useRef, useState } from "react";
import SolidButton from "../SolidButton/SolidButton";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { durationOptions } from "../../constants";
import {
  createBid,
  createListing,
} from "../../services/api/buy-offer-list.api";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { collectionContract } from "../../config";
import { convertTokenAmountToDecimal, getHostName } from "../../utils";
import { handleListingData } from "../../services/listing-service";
import { handleBiddingData } from "../../services/bidding-service";

type Props = {
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const OfferOrListingModal = ({ setShowOfferOrListingModal }: Props) => {
  const { chainId, user } = useConnectionContext()!;
  const { userBalance, offerOrListModalContent, collectionMetadata } =
    useGlobalContext()!;
  const dropdownRef = useRef(null);

  const { isOffer, tokenId } = offerOrListModalContent;

  const headerContent = isOffer ? "Make an offer" : "Create a listing";
  const inputPlaceholder = isOffer ? "Enter offer" : "Listing price";
  const collectionFloorPrice =
    collectionMetadata?.collections?.[0]?.floorAsk?.price?.amount?.decimal;
  const Royalties =
    Number(
      collectionMetadata?.collections?.[0]?.allRoyalties?.opensea?.[0]?.bps
    ) * 0.01;

  const [selectedDuration, setSelectedDuration] = useState(durationOptions[6]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [offerAmount, setOfferAmount] = useState<number | string>("");

  useOutsideClick(dropdownRef, setShowDropdown, "duration_trigger");

  const offerBottom = (
    <>
      <p>
        <span>Your Balance</span>
        <span>{userBalance?.WETH} wETH</span>
      </p>
      <p>
        <span>Floor price</span>
        <span>{collectionFloorPrice} ETH</span>
      </p>
    </>
  );

  const listBottom = (
    <>
      <p>
        <span>Creator earnings</span>
        <span>{Royalties}%</span>
      </p>
      <p>
        <span>Marketplace fee</span>
        <span>0%</span>
      </p>
    </>
  );

  const initialiseListing = () => {
    const source = getHostName();
    const token = `${collectionContract}:${tokenId}`;
    const weiPrice = convertTokenAmountToDecimal(
      Number(offerAmount)
    ).toString();
    const expiration = String(selectedDuration.time);

    console.log(isOffer);

    if (!isOffer) {
      createListing(chainId, user!, source, token, weiPrice, expiration).then(
        async (result) => {
          handleListingData(chainId, result);
        }
      );
    } else {
      createBid(chainId, user!, source, token, weiPrice, expiration).then(
        (result) => {
          handleBiddingData(chainId, result);
        }
      );
    }
  };

  return (
    <div className="modal_parent">
      <div className="modal_content">
        <p className="modal_header">{headerContent}</p>
        <IoClose
          className="modal_closer"
          display="block"
          size={25}
          onClick={() => {
            setShowOfferOrListingModal?.(false);
          }}
        />

        <div className="listing_or_offer_modal">
          <div className="modal_nft_holder">
            <ModalNft nftData={offerOrListModalContent} />
          </div>

          <div className="listing_or_offer_modal_bottom">
            <div className="input_area">
              <input
                type="number"
                placeholder={inputPlaceholder}
                value={offerAmount}
                onChange={(e) => {
                  setOfferAmount(Number(e.target.value));
                }}
              />
              <p>wETH</p>
            </div>

            <div className="duration_area">
              <p>Expires in</p>
              <div className="duration_container">
                <button
                  className="duration_trigger"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <BsCalendar display="block" />
                  {selectedDuration.title}
                </button>

                {showDropdown && (
                  <div className="duration_list" ref={dropdownRef}>
                    {durationOptions.map((duration) => {
                      return (
                        <button
                          key={duration.title}
                          onClick={() => {
                            setSelectedDuration(duration);
                            setShowDropdown(false);
                          }}
                        >
                          {duration.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="bottom_details">
              {isOffer ? offerBottom : listBottom}
            </div>

            <SolidButton
              text={isOffer ? "Make Offer" : "Create Listing"}
              onClick={initialiseListing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferOrListingModal;
