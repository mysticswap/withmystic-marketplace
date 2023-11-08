import { IoClose } from "react-icons/io5";
import "./OfferOrListingModal.css";
import ModalNft from "../ModalNft/ModalNft";
import { BsCalendar } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import SolidButton from "../SolidButton/SolidButton";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { durationOptions } from "../../constants";
import {
  createBid,
  createListing,
} from "../../services/api/buy-offer-list.api";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { convertTokenAmountToDecimal, getHostName } from "../../utils";
import { handleListOrBidData } from "../../services/list-bid-service";
import ProcessComponent from "../TransactionStages/TransactionStages";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { switchChains } from "../../utils/wallet-connection";

type Props = {
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const OfferOrListingModal = ({ setShowOfferOrListingModal }: Props) => {
  const { user, chainId } = useConnectionContext()!;
  const {
    userBalance,
    collectionMetadata,
    collectionChainId,
    collectionContract,
    ethValue,
  } = useGlobalContext();
  const {
    transactionNft,
    transactionStage,
    setTransactionStage,
    setTransactionNft,
  } = useTransactionContext()!;
  const dropdownRef = useRef(null);

  const { isOffer, tokenId } = transactionNft;

  const headerContent = isOffer ? "Make an offer" : "Create a listing";
  const finalHeader = isOffer ? "Offer completed!" : "Listing completed!";
  const inputPlaceholder = isOffer ? "Enter offer" : "Listing price";

  const collectionFloorPrice =
    collectionMetadata?.collections?.[0]?.floorAsk?.price?.amount?.decimal;
  const Royalties =
    Number(
      collectionMetadata?.collections?.[0]?.allRoyalties?.opensea?.[0]?.bps
    ) * 0.01;

  const [selectedDuration, setSelectedDuration] = useState(durationOptions[6]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [isOverBalance, setIsOverBalance] = useState(false);

  useOutsideClick(dropdownRef, setShowDropdown, "duration_trigger");

  useEffect(() => {
    const isOverUserBalance = Number(offerAmount) > Number(userBalance.WETH);
    isOffer && setIsOverBalance(isOverUserBalance);
  }, [offerAmount, isOffer]);

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

  const createBidOrList = () => {
    const source = getHostName();
    const token = `${collectionContract}:${tokenId}`;
    const weiPrice = convertTokenAmountToDecimal(
      Number(offerAmount)
    ).toString();
    const expiration = String(selectedDuration.time);
    setTransactionStage(1);

    switchChains(chainId, collectionChainId).then(() => {
      if (!isOffer) {
        createListing(
          collectionChainId,
          user!,
          source,
          token,
          weiPrice,
          expiration
        ).then(async (result) => {
          handleListOrBidData(
            collectionChainId,
            result,
            setTransactionStage,
            setShowOfferOrListingModal
          );
        });
      } else {
        createBid(
          collectionChainId,
          user!,
          source,
          token,
          weiPrice,
          expiration
        ).then((result) => {
          handleListOrBidData(
            collectionChainId,
            result,
            setTransactionStage,
            setShowOfferOrListingModal
          );
        });
      }
    });
  };

  const transactionButtonIsDisable =
    Number(offerAmount) <= 0 || (isOffer && isOverBalance);
  const transactionButtonText = isOffer ? "Make Offer" : "Create Listing";

  return (
    <div className="modal_parent">
      <div className="modal_content">
        <p className="modal_header">
          {transactionStage !== 2 ? headerContent : finalHeader}
        </p>
        <IoClose
          className="modal_closer"
          display="block"
          size={25}
          onClick={() => {
            setShowOfferOrListingModal?.(false);
            setTransactionStage(0);
          }}
        />

        <div className="listing_or_offer_modal">
          <div className="modal_nft_holder">
            <ModalNft nftData={transactionNft} />
          </div>

          {!transactionStage ? (
            <div className="listing_or_offer_modal_bottom">
              <div
                className={`input_area ${
                  isOverBalance && isOffer ? "balance_warning" : ""
                }`}
              >
                <input
                  type="number"
                  placeholder={inputPlaceholder}
                  value={offerAmount}
                  onChange={(e) => {
                    setOfferAmount(e.target.value);
                    setTransactionNft({
                      ...transactionNft,
                      amount: Number(e.target.value),
                      price: ethValue * Number(e.target.value),
                    });
                  }}
                />
                <p>{!isOffer ? "ETH" : "wETH"}</p>
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
                className="list_or_bid_submit_btn"
                text={
                  isOverBalance ? "Insufficient Funds" : transactionButtonText
                }
                onClick={createBidOrList}
                disabled={transactionButtonIsDisable}
              />
            </div>
          ) : (
            <ProcessComponent stage={transactionStage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferOrListingModal;
