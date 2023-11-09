import "./Footer.css";
import mysticLogo from "../../assets/mystic-logo.svg";
import { RiDiscordFill, RiTwitterXLine } from "react-icons/ri";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

const Footer = () => {
  const { collectionMetadata, client } = useGlobalContext();

  const discordUrl = collectionMetadata?.collections?.[0]?.discordUrl;
  const twitterUrl = `https://twitter.com/${collectionMetadata?.collections[0]?.twitterUsername}`;

  return (
    <footer>
      <section>
        <p>
          {" "}
          © {new Date().getFullYear()} {client.collections[0].name}
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
          </span>
        </div>
      </section>

      <section className="socials">
        <a href={discordUrl}>
          <RiDiscordFill size={30} display="block" />
        </a>
        <a href={twitterUrl}>
          <RiTwitterXLine size={25} display="block" />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
