import "./Footer.css";
import mysticLogo from "../../assets/mystic_plain.png";
import { RiDiscordFill, RiTwitterXLine } from "react-icons/ri";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { tabOptions } from "../../constants";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { collectionMetadata, client, currentTab, source } = useGlobalContext();
  const [hideClass, setHideClass] = useState(false);
  const location = useLocation();

  let discordUrl = collectionMetadata?.collections?.[0]?.discordUrl;
  const twitterUrl = `https://twitter.com/${collectionMetadata?.collections[0]?.twitterUsername}`;

  if (
    (source == "deploy-preview-19--heroic-duckanoo-b32f52.netlify.app" ||
      source == "zooverse.withmystic.xyz") &&
    (discordUrl == "" || discordUrl == null)
  ) {
    discordUrl = "https://discord.gg/zooverse";
  }

  useEffect(() => {
    if (location.pathname == "/" && currentTab == tabOptions[0]) {
      setHideClass(true);
    } else {
      setHideClass(false);
    }
  }, [location.pathname, currentTab]);
  return (
    <footer id="footer" className={hideClass ? "hide" : ""}>
      <section>
        <p>
          {" "}
          © {new Date().getFullYear()} {client.collections?.[0].name}
        </p>
      </section>
      <section className="footer_links_holder">
        <a href="https://www.withmystic.xyz/privacy-policy" target="_blank">
          Privacy Policy
        </a>
        <a href="https://www.withmystic.xyz/terms-of-service" target="_blank">
          Terms & Conditions
        </a>
        <div>
          <p>Powered by</p>
          <span onClick={() => window.open("https://withmystic.xyz")}>
            <img src={mysticLogo} alt="" />
            Mystic
          </span>
        </div>
      </section>

      <section className="socials">
        <a href={discordUrl} target="_blank">
          <RiDiscordFill size={30} display="block" />
        </a>
        <a href={twitterUrl} target="_blank">
          <RiTwitterXLine size={25} display="block" />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
