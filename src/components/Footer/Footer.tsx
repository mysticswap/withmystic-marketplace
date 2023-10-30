import "./Footer.css";
import mysticLogo from "../../assets/mystic-logo.svg";
import { RiDiscordFill, RiTwitterXLine } from "react-icons/ri";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

const Footer = () => {
  const { collectionMetadata } = useGlobalContext()!;

  const discordUrl = collectionMetadata?.collections?.[0]?.discordUrl;
  const twitterUrl = `https://twitter.com/${collectionMetadata?.collections[0]?.twitterUsername}`;

  return (
    <footer>
      <section>
        <p> © {new Date().getFullYear()} Mystical Wizard Guild</p>
      </section>
      <section className="footer_links_holder">
        <a>Privacy Policy</a>
        <a>Terms & Conditions</a>
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
