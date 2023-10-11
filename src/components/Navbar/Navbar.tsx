import "./Navbar.css";
import {
  RiArrowDownSLine,
  RiDiscordFill,
  RiMenu3Fill,
  RiTwitterXLine,
} from "react-icons/ri";
import SolidButton from "../SolidButton/SolidButton";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { scrollToTop } from "../../utils";
import { connectWallets } from "../../services/web3Onboard";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import ConnectedWalletButton from "../ConnectedWalletButton/ConnectedWalletButton";
import { useIsMobile } from "../../hooks/useIsMobile";

const Navbar = () => {
  const { setProvider, user, collectionMetadata } = useGlobalContext()!;
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const discordUrl = collectionMetadata?.collections[0].discordUrl;
  const twitterUrl = `https://twitter.com/${collectionMetadata?.collections[0]?.twitterUsername}`;

  const connectWallet = () => {
    connectWallets(setProvider);
  };

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <section className="nav_left">
        <div className="logo_holder">
          <Link to="/">
            <img
              src="https://mysticswap.io/static/media/mystWizGuild2.824b89cd.png"
              alt="collection_logo"
            />
          </Link>
        </div>

        <div className="nav_main_contents">
          <div className="nav_links">
            <a href={discordUrl}>
              <RiDiscordFill size={25} display="block" />
            </a>
            <a href={twitterUrl}>
              <RiTwitterXLine size={20} display="block" />
            </a>
          </div>

          <div className="collections_dropdown">
            Collections <RiArrowDownSLine />
          </div>
        </div>
      </section>

      <section className="connect_and_menu">
        {!user ? (
          <SolidButton text="Connect Wallet" onClick={connectWallet} />
        ) : (
          <ConnectedWalletButton />
        )}
        {isMobile && (
          <RiMenu3Fill className="burger_btn" display="block" size={25} />
        )}
      </section>
    </nav>
  );
};

export default Navbar;
