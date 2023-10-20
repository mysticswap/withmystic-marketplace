import { IoClose } from "react-icons/io5";
import "./OfferOrListingModal.css";
import { convertTokenAmountToDecimal, extractMetadata } from "../../utils";
import ModalNft from "../ModalNft/ModalNft";
import { BsCalendar } from "react-icons/bs";
import { useRef, useState } from "react";
import SolidButton from "../SolidButton/SolidButton";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import {
  Market,
  TokenToken,
} from "../../types/reservoir-types/collection-nfts.types";
import { durationOptions, wethAddresses } from "../../constants";
import { ListOrOfferType } from "../../types/market-schemas.types";
import { useNftPageContext } from "../../context/NftPageContext/NftPageContext";
import { collectionContract } from "../../config";
import { handleCreateOffer } from "../../services/seaport";

type Props = {
  isOffer: boolean;
  nft: TokenToken;
  nftMarketInfo: Market;
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const OfferOrListingModal = ({
  isOffer,
  nft,
  nftMarketInfo,
  setShowOfferOrListingModal,
}: Props) => {
  const { userBalance, user, chainId } = useGlobalContext()!;
  const { nftInfo } = useNftPageContext()!;
  const dropdownRef = useRef(null);
  const nftData = extractMetadata(nft, nftMarketInfo);
  const headerContent = isOffer ? "Make an offer" : "Create a listing";
  const inputPlaceholder = isOffer ? "Enter offer" : "Listing price";

  const [selectedDuration, setSelectedDuration] = useState(durationOptions[6]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [offerAmount, setOfferAmount] = useState<number | string>("");

  useOutsideClick(dropdownRef, setShowDropdown, "duration_trigger");

  const nftSchema = nftInfo.kind.toUpperCase();
  const body: ListOrOfferType = {
    chainId: chainId,
    consideration: [
      {
        itemtype: nftSchema,
        amount: "1",
        identifier: nftInfo.tokenId,
        token: collectionContract,
      },
    ],
    creatorAddress: user!,
    endTime: String(selectedDuration.time),
    offer: [
      {
        itemtype: "ERC20",
        amount: String(convertTokenAmountToDecimal(Number(offerAmount!))),
        identifier: "0",
        token: wethAddresses[chainId],
      },
    ],
    offerer: user!,
    takerAddress: nftInfo.owner,
    type: "offer",
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
            setShowOfferOrListingModal(false);
          }}
        />

        <div className="listing_or_offer_modal">
          <div className="modal_nft_holder">
            <ModalNft nftData={nftData} />
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
              {isOffer ? (
                <>
                  <p>
                    <span>Your Balance</span>
                    <span>{userBalance?.WETH} wETH</span>
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

            <SolidButton
              text={isOffer ? "Make Offer" : "Create Listing"}
              onClick={() => handleCreateOffer(body)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferOrListingModal;
