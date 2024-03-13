import { IoClose } from "react-icons/io5";
import "./OfferOrListingModal.css";
import ModalNft from "../ModalNft/ModalNft";
import { BsCalendar, BsCheck2, BsChevronDown } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import SolidButton from "../SolidButton/SolidButton";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { durationOptions, wethAddresses } from "../../constants";
import {
  createBid,
  createListing,
} from "../../services/api/buy-offer-list.api";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { convertTokenAmountToDecimals, getHostName } from "../../utils";
import {
  handleAuctionOrBidData,
  handleListOrBidData,
} from "../../services/list-bid-service";
import ProcessComponent from "../TransactionStages/TransactionStages";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { switchChains } from "../../utils/wallet-connection";
import { generateListOrBidActivity } from "../../utils/activity-utils";
import { useOutsideClicks } from "../../hooks/useOutsideClicks";
// import Checkbox from "../Checkbox/Checkbox";
import AuctionButton from "../ActivityFilterButton/AuctionChoiceButton";
import {
  bidAuction,
  createAuction,
  getAllTokenAuctions,
} from "../../services/api/marketplace-api";
import { AuctionEnumType } from "../../types/market-schemas.types";

type Props = {
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// const WETH_CONTRACT_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const ETH_CONTRACT_ADDRESS =
  "0x0000000000000000000000000000000000000000";

const OfferOrListingModal = ({ setShowOfferOrListingModal }: Props) => {
  const { user, chainId } = useConnectionContext()!;
  const {
    userBalance,
    collectionMetadata,
    collectionChainId,
    collectionContract,
    cryptoValue,
    supportedTokens,
    currentToken,
    setCurrentToken,
    isAuction,
    setIsAuction,
  } = useGlobalContext();
  const {
    transactionNft,
    transactionStage,
    setTransactionStage,
    setTransactionNft,
  } = useTransactionContext()!;
  const dropdownRef = useRef(null);

  const { isOffer, tokenId } = transactionNft;
  const currencyIsListing =
    supportedTokens[currentToken]?.contract === wethAddresses[collectionChainId]
      ? ETH_CONTRACT_ADDRESS
      : supportedTokens[currentToken]?.contract;

  // const currencyIsListing = supportedTokens[currentToken].contract;

  const currency = isOffer ? wethAddresses[collectionChainId] : "";

  const headerContent = isOffer ? "Make an offer" : "Create a listing";
  const finalHeader = isOffer ? "Offer completed!" : "Listing completed!";
  const inputPlaceholder = isOffer ? "Enter offer" : "Listing price";

  const collectionFloorPrice =
    collectionMetadata?.collections?.[0]?.floorAsk?.price?.amount?.decimal;
  const royalties =
    Number(
      collectionMetadata?.collections?.[0]?.allRoyalties?.opensea?.[0]?.bps
    ) * 0.01;

  const [selectedDuration, setSelectedDuration] = useState(durationOptions[6]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [isOverBalance, setIsOverBalance] = useState(false);
  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);

  const [showTokensDropdown, setShowTokensDropdown] = useState(false);

  useEffect(() => {
    setIsAuction(false);
  }, []);

  const closeDropdown = () => {
    setShowTokensDropdown(false);
  };

  const ref = useOutsideClicks(() => {
    closeDropdown();
  }, false);

  useOutsideClick(dropdownRef, setShowDropdown, "duration_trigger");
  const activity = generateListOrBidActivity(
    transactionNft,
    collectionMetadata!,
    user!
  );

  const getUserBalance = () =>
    userBalance[supportedTokens[currentToken].symbol] || 0;

  useEffect(() => {
    const isOverUserBalance = Number(offerAmount) > Number(getUserBalance());
    isOffer && setIsOverBalance(isOverUserBalance);
  }, [offerAmount, isOffer, userBalance.WETH]);

  useEffect(() => {
    getActiveAuction();
  }, []);

  const offerBottom = (
    <>
      <p>
        <span>Your Balance</span>
        <span>
          {getUserBalance()} {supportedTokens[currentToken].symbol || "WETH"}
        </span>
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
        <span>{isNaN(royalties) ? "--" : royalties}%</span>
      </p>
      <p>
        <span>Marketplace fee</span>
        <span>0%</span>
      </p>
    </>
  );

  const getActiveAuction = async () => {
    let auctions = await getAllTokenAuctions(
      collectionContract,
      collectionChainId
    );

    auctions = auctions.filter((auction: any) => {
      return auction.auctionComponent
        .map((i: any) => i.identifier)
        .includes(tokenId);
    });
    setActiveAuctions(auctions);
    return auctions;
  };

  const createAuctionList = async () => {
    // const source = getHostName();
    // const token = `${collectionContract}:${tokenId}`;

    const weiPrice = convertTokenAmountToDecimals(
      Number(offerAmount),
      supportedTokens[currentToken]?.decimals
    ).toString();
    console.log(selectedDuration.time);

    const expiration = selectedDuration.time + "";
    setTransactionStage(1);

    try {
      await switchChains(chainId, collectionChainId);
      let result;
      if (isOffer) {
        result = await bidAuction(
          collectionChainId,
          activeAuctions[0]._id,
          wethAddresses[collectionChainId],
          weiPrice,
          user!
        );
      } else {
        result = await createAuction({
          endTime: expiration,
          startAmount: weiPrice,
          chainId: collectionChainId,
          offerer: user!,
          offer: [
            {
              itemtype: "ERC721",
              token: collectionContract,
              amount: "1",
              identifier: tokenId,
            },
          ],
          type: AuctionEnumType.Basic,
        });
      }
      await handleAuctionOrBidData(
        collectionChainId,
        result,
        setTransactionStage,
        setShowOfferOrListingModal,
        activity,
        isOffer
      );
    } catch (error) {
      // Handle errors here
    }
  };

  const createBidOrList = async () => {
    if (isAuction || (isOffer && activeAuctions.length > 0)) {
      return await createAuctionList();
    }

    const source = getHostName();
    const token = `${collectionContract}:${tokenId}`;

    const weiPrice = convertTokenAmountToDecimals(
      Number(offerAmount),
      supportedTokens[currentToken]?.decimals
    ).toString();

    const expiration = String(selectedDuration.time);
    setTransactionStage(1);

    // switchChains(chainId, collectionChainId).then(() => {
    //   if (!isOffer) {
    //     createListing(
    //       collectionChainId,
    //       user!,
    //       source,
    //       token,
    //       weiPrice,
    //       expiration,
    //       !isOffer,
    //       currency
    //     ).then(async (result) => {
    //       console.log(result);
    //       handleListOrBidData(
    //         collectionChainId,
    //         result,
    //         setTransactionStage,
    //         setShowOfferOrListingModal,
    //         activity
    //       );
    //     });
    //   } else {
    //     createBid(
    //       collectionChainId,
    //       user!,
    //       source,
    //       token,
    //       weiPrice,
    //       expiration
    //     ).then((result) => {
    //       handleListOrBidData(
    //         collectionChainId,
    //         result,
    //         setTransactionStage,
    //         setShowOfferOrListingModal,
    //         activity
    //       );
    //     });
    //   }
    // });
    try {
      await switchChains(chainId, collectionChainId);

      if (!isOffer) {
        const result = await createListing(
          collectionChainId,
          user!,
          source,
          token,
          weiPrice,
          expiration,
          !isOffer,
          currencyIsListing
        );
        await handleListOrBidData(
          collectionChainId,
          result,
          setTransactionStage,
          setShowOfferOrListingModal,
          activity
        );
      } else {
        const result = await createBid(
          collectionChainId,
          user!,
          source,
          token,
          weiPrice,
          expiration,
          !isOffer,
          supportedTokens[currentToken].contract || currency
        );
        await handleListOrBidData(
          collectionChainId,
          result,
          setTransactionStage,
          setShowOfferOrListingModal,
          activity
        );
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const transactionButtonIsDisable =
    Number(offerAmount) <= 0 || (isOffer && isOverBalance);
  const transactionButtonText = isOffer
    ? "Make Offer"
    : isAuction
    ? "Create Auction"
    : "Create Listing";

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
            <ModalNft
              nftData={transactionNft}
              supportedTokens={supportedTokens}
              currentToken={currentToken}
              offerAmount={offerAmount}
              isSale={false}
            />

            {!isOffer && <AuctionButton />}
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
                  min={0}
                  // className={isOffer ? "weth-value-2" : "weth-value no-right"}
                  className={
                    isOffer
                      ? "weth-value-2"
                      : `${
                          supportedTokens.length === 1
                            ? "weth-value no-right"
                            : "weth-value"
                        }`
                  }
                  placeholder={inputPlaceholder}
                  value={offerAmount}
                  onChange={(e) => {
                    setOfferAmount(e.target.value);
                    setTransactionNft({
                      ...transactionNft,
                      amount: Number(e.target.value),
                      price: cryptoValue * Number(e.target.value),
                    });

                    if (e.target.value.includes("-")) {
                      setOfferAmount("");
                      setTransactionNft({
                        ...transactionNft,
                        amount: Number(""),
                        price: cryptoValue * Number(""),
                      });
                    }
                  }}
                />
                <div
                  // className={isOffer ? "chevron-down-2" : "chevron-down"}
                  className={isAuction ? "chevron-down-2" : "chevron-down"}
                  ref={ref}
                  onClick={() => {
                    // if (isOffer || supportedTokens.length === 1) return;
                    setShowTokensDropdown(!showTokensDropdown);
                  }}
                >
                  {!(isAuction || (isOffer && activeAuctions.length > 0)) && (
                    <BsChevronDown />
                  )}
                  <p>
                    {supportedTokens!.length > 0
                      ? supportedTokens![currentToken].symbol
                      : "wETH"}
                  </p>
                </div>
                {showTokensDropdown &&
                  !(isAuction || (isOffer && activeAuctions.length > 0)) && (
                    <div className="tokens-dropdown">
                      {supportedTokens?.map((token, index) => {
                        return (
                          <div
                            className="single-token"
                            key={token?.contract + "-" + index}
                            onClick={() => {
                              setCurrentToken(index);
                              setShowTokensDropdown(false);
                            }}
                          >
                            <div className="single-inner-token">
                              <img src={token.image} alt="" />
                              <p>{token.symbol}</p>
                            </div>
                            {index === currentToken && (
                              <BsCheck2 className="token-checkmark" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
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
                  isOverBalance ? "Insufficient Balance" : transactionButtonText
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
//
