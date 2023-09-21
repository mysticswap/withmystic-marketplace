import "./Footer.css";
import mysticLogo from "../../assets/mystic-logo.svg";
import { RiDiscordFill, RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
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
          <span>
            <img src={mysticLogo} alt="" />
          </span>
        </div>
      </section>

      <section className="socials">
        <RiDiscordFill size={25} />
        <RiTwitterXLine size={25} />
      </section>
    </footer>
  );
};

export default Footer;
