import { IoClose } from "react-icons/io5";
import "./OfferOrListingModal.css";
import ModalNft from "../ModalNft/ModalNft";
import { BsCalendar } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import SolidButton from "../SolidButton/SolidButton";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { durationOptions, wethAddresses } from "../../constants";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { convertTokenAmountToDecimals } from "../../utils";
import { handleAuctionOrBidData } from "../../services/list-bid-service";
import ProcessComponent from "../TransactionStages/TransactionStages";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { switchChains } from "../../utils/wallet-connection";
import { generateListOrBidActivity } from "../../utils/activity-utils";
import { useOutsideClicks } from "../../hooks/useOutsideClicks";
import {
  bidAuction,
  createAuction,
  getAllTokenAuctions,
} from "../../services/api/marketplace-api";
import { AuctionEnumType } from "../../types/market-schemas.types";

type Props = {
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ETH_CONTRACT_ADDRESS =
  "0x0000000000000000000000000000000000000000";

const AuctionModal = ({ setShowOfferOrListingModal }: Props) => {
  const { user, chainId } = useConnectionContext()!;
  const {
    userBalance,
    collectionMetadata,
    collectionChainId,
    collectionContract,
    cryptoValue,
    supportedTokens,
    currentToken,
  } = useGlobalContext();
  const {
    transactionNft,
    transactionStage,
    setTransactionStage,
    setTransactionNft,
  } = useTransactionContext()!;
  const dropdownRef = useRef(null);

  const { isOffer, tokenId } = transactionNft;

  // const currencyIsListing = supportedTokens[currentToken].contract;

  // const currency = wethAddresses[collectionChainId];

  const headerContent = isOffer ? "Bid This Auction" : "Create An Auction";
  const finalHeader = isOffer ? "Bid completed!" : "Auction created!";
  const inputPlaceholder = isOffer ? "Enter bid" : "Auction price";

  const [selectedDuration, setSelectedDuration] = useState(durationOptions[6]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [auctionAmount, setAuctionAmount] = useState("");
  const [isOverBalance, setIsOverBalance] = useState(false);
  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);

  const [showTokensDropdown, setShowTokensDropdown] = useState(false);

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

  const getUserBalance = () => userBalance.WETH;

  useEffect(() => {
    const isOverUserBalance = Number(auctionAmount) > Number(getUserBalance());
    isOffer && setIsOverBalance(isOverUserBalance);
  }, [auctionAmount, isOffer, userBalance.WETH]);

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
      {true && (
        <p>
          <span>Last Bid</span>
          <span>
            {(activeAuctions?.[0]?.lastBidAmount || 0) / 10 ** 18} ETH
          </span>
        </p>
      )}
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

  const createBidOrList = async () => {
    // const source = getHostName();
    // const token = `${collectionContract}:${tokenId}`;

    const weiPrice = convertTokenAmountToDecimals(
      Number(auctionAmount),
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

  const transactionButtonIsDisable =
    Number(auctionAmount) <= 0 || (isOffer && isOverBalance);
  const transactionButtonText = isOffer ? "Make Offer" : "Create Listing";

  return (
    <div className="modal_parent">
      {activeAuctions.length <= 0 && isOffer ? (
        <div className="modal_content">
          <p className="modal_header ellipsis">No Auctions Available Yet</p>
          <IoClose
            className="modal_closer"
            display="block"
            size={25}
            onClick={() => {
              setShowOfferOrListingModal?.(false);
              setTransactionStage(0);
            }}
          />
        </div>
      ) : (
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
                offerAmount={auctionAmount}
                isSale={false}
              />
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
                    value={auctionAmount}
                    onChange={(e) => {
                      setAuctionAmount(e.target.value);
                      setTransactionNft({
                        ...transactionNft,
                        amount: Number(e.target.value),
                        price: cryptoValue * Number(e.target.value),
                      });

                      if (e.target.value.includes("-")) {
                        setAuctionAmount("");
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
                    className={
                      isOffer
                        ? "chevron-down-2"
                        : `${
                            supportedTokens.length === 1
                              ? "chevron-down"
                              : "chevron-down no-cursor"
                          }`
                    }
                    ref={ref}
                    onClick={() => {
                      // if (isOffer || supportedTokens.length === 1) return;
                      setShowTokensDropdown(!showTokensDropdown);
                    }}
                  >
                    {/* {supportedTokens.length === 1 ||
                    (!isOffer && <BsChevronDown />)} */}
                    <p>
                      {/* {supportedTokens!.length > 0
                      ? supportedTokens![currentToken].symbol
                      : "wETH"} */}
                      WETH
                    </p>
                  </div>
                  {/* {showTokensDropdown && (
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
                )} */}
                </div>

                {!isOffer && (
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
                )}

                <div className="bottom_details">{offerBottom}</div>

                <SolidButton
                  className="list_or_bid_submit_btn"
                  text={
                    isOverBalance
                      ? "Insufficient Balance"
                      : transactionButtonText
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
      )}
    </div>
  );
};

export default AuctionModal;
