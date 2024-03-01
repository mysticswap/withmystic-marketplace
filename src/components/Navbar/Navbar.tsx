import "./Navbar.css";
import {
  RiDiscordFill,
  RiMenu3Fill,
  RiTwitterXLine,
} from "react-icons/ri";
import SolidButton from "../SolidButton/SolidButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { scrollToTop } from "../../utils";
import { connectWallets } from "../../services/web3Onboard";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import ConnectedWalletButton from "../ConnectedWalletButton/ConnectedWalletButton";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import UserNftsModal from "../UserNftsModal/UserNftsModal";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { BsCheck } from "react-icons/bs";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { tabOptions } from "../../constants";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useWindowFreeze } from "../../hooks/useWindowFreeze";

const Navbar = () => {
  const { setProvider, user, setUser, setChainId } = useConnectionContext()!;
  const {
    collectionMetadata,
    userNfts,
    availableCollections,
    selectedCollection,
    setSelectedCollection,
    setCurrentTab,
    client,
    source,
  } = useGlobalContext();

  const { setShowOfferOrListingModal } = useTransactionContext()!;
  const location = useLocation();
  const isMobile = useIsMobile();

  const [showUserNftsModal, setShowUserNftsModal] = useState(false);
  const dropdownRef = useRef(null);

  const [showDropdownOptions, setShowDropdownOptions] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const navigate = useNavigate();
  
  useOutsideClick(
    dropdownRef,
    setShowDropdownOptions,
    "collection_dropdown_trigger"
  );

  useWindowFreeze(showMobileMenu);
  const userHasNfts = userNfts?.tokens?.length > 0 && user;
  let discordUrl = collectionMetadata?.collections?.[0]?.discordUrl;

  if (
    (source == "deploy-preview-19--heroic-duckanoo-b32f52.netlify.app" ||
      source == "zooverse.withmystic.xyz") &&
    (discordUrl == "" || discordUrl == null)
  ) {
    discordUrl = "https://discord.gg/zooverse";
  }

  const twitterUrl = `https://twitter.com/${collectionMetadata?.collections?.[0]?.twitterUsername}`;

  const connectWallet = () => {
    connectWallets(setUser, setProvider, setChainId);
  };

  useEffect(() => {
    scrollToTop();
    setShowOfferOrListingModal(false);
  }, [location.pathname, setShowOfferOrListingModal]);

  useEffect(() => {
    if (
      collectionMetadata?.collections?.[0]?.primaryContract ==
      selectedCollection?.address
    ) {
      setShowMobileMenu(false);
    }
  }, [collectionMetadata, selectedCollection]);

  return (
    <nav className="navbar">
      <section className="nav_left">
        <div className="logo_holder">
          <Link
            to="/"
            onClick={() => {
              setCurrentTab(tabOptions[0]);
              setShowMobileMenu(false);
            }}
          >
            <img src={client.logoUrl} alt="collection_logo" />
          </Link>
        </div>

        <div
          className={`nav_main_contents ${
            showMobileMenu ? "show_nav_main_contents" : ""
          }`}
        >
          <div className="nav_links">
            <a href={discordUrl} target="_blank">
              <RiDiscordFill size={25} display="block" />
            </a>
            <a href={twitterUrl} target="_blank">
              <RiTwitterXLine size={20} display="block" />
            </a>
          </div>
          <div className="collections_dropdown">
            <button
              className="collection_dropdown_trigger"
              onClick={() => navigate('/collections')}
            >
              Collections{" "}

            </button>

            {showDropdownOptions && (
              <div className="collections_dropdown_list" ref={dropdownRef}>
                {availableCollections.map((collection) => {
                  const isSelected =
                    collection.address == selectedCollection.address;

                  return (
                    <Link key={collection.id} to="/">
                      <button
                        onClick={() => {
                          setSelectedCollection(collection);
                          setCurrentTab(tabOptions[0]);
                          setShowDropdownOptions(false);
                        }}
                      >
                        {collection.name}{" "}
                        {isSelected && <BsCheck size={15} display="block" />}
                      </button>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            to="/swaps"
            onClick={() => {
              setShowMobileMenu(false);
            }}
          >
            <button className="sell_button">Swap</button>
          </Link>

          {userHasNfts && location.pathname !== "/swaps" && (
            <button
              className="sell_button"
              onClick={() => setShowUserNftsModal(true)}
            >
              Sell
            </button>
          )}
        </div>
      </section>

      <section className="nav_right">
        {!user ? (
          <SolidButton text="Connect Wallet" onClick={connectWallet} />
        ) : (
          <ConnectedWalletButton />
        )}
        {isMobile && (
          <RiMenu3Fill
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="burger_btn"
            display="block"
            size={25}
          />
        )}
      </section>

      {showUserNftsModal && (
        <UserNftsModal setShowUserNftsModal={setShowUserNftsModal} />
      )}
    </nav>
  );
};

export default Navbar;
