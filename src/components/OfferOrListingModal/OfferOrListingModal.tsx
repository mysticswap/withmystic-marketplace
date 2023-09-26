import { IoClose } from "react-icons/io5";
import "./OfferOrListingModal.css";
import { SingleNftData } from "../../types/alchemy.types";
import { extractMetadata } from "../../utils";
import ModalNft from "../ModalNft/ModalNft";
import { BsCalendar } from "react-icons/bs";
import { useRef, useState } from "react";
import SolidButton from "../SolidButton/SolidButton";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = {
  isOffer: boolean;
  nft: SingleNftData;
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const OfferOrListingModal = ({
  isOffer,
  nft,
  setShowOfferOrListingModal,
}: Props) => {
  const { userBalance } = useGlobalContext()!;
  const dropdownRef = useRef(null);
  const nftData = extractMetadata(nft);
  const headerContent = isOffer ? "Make an offer" : "Create a listing";
  const inputPlaceholder = isOffer ? "Enter offer" : "Listing price";
  const durationOptions = [
    "1 Hour",
    "12 Hours",
    "1 Day",
    "3 Days",
    "1 Week",
    "1 Month",
    "3 Months",
    "6 Months",
  ];
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[6]);
  const [showDropdown, setShowDropdown] = useState(false);

  useOutsideClick(dropdownRef, setShowDropdown, "duration_trigger");

  return (
    <div className="modal_parent">
      <div className="modal_content">
        <p className="modal_header">{headerContent}</p>
        <IoClose
          className="modal_closer"
          display="block"
          size={25}
          onClick={() => {
            setShowOfferOrListingModal(false);
          }}
        />

        <div className="listing_or_offer_modal">
          <div className="modal_nft_holder">
            <ModalNft nftData={nftData} />
          </div>

          <div className="listing_or_offer_modal_bottom">
            <div className="input_area">
              <input type="text" placeholder={inputPlaceholder} />
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
                  {selectedDuration}
                </button>

                {showDropdown && (
                  <div className="duration_list" ref={dropdownRef}>
                    {durationOptions.map((duration) => {
                      return (
                        <button
                          key={duration}
                          onClick={() => {
                            setSelectedDuration(duration);
                            setShowDropdown(false);
                          }}
                        >
                          {duration}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="bottom_details">
              {isOffer ? (
                <>
                  <p>
                    <span>Your Balance</span>
                    <span>{userBalance} ETH</span>
                  </p>
                  <p>
                    <span>Floor price</span>
                    <span>{nftData.floorPrice} ETH</span>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span>Creator earnings</span>
                    <span>5%</span>
                  </p>
                  <p>
                    <span>Marketplace fee</span>
                    <span>0%</span>
                  </p>
                </>
              )}
            </div>

            <SolidButton text={isOffer ? "Make Offer" : "Create Listing"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferOrListingModal;
