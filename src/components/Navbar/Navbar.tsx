import "./Navbar.css";
import {
  RiArrowDownSLine,
  RiDiscordFill,
  RiTwitterXLine,
} from "react-icons/ri";
import SolidButton from "../SolidButton/SolidButton";
import { Link } from "react-router-dom";

const Navbar = () => {
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

        <div className="nav_links">
          <a href="">
            <RiDiscordFill size={25} />
          </a>
          <a href="">
            <RiTwitterXLine size={20} />
          </a>
        </div>

        <div className="collections_dropdown">
          Collections <RiArrowDownSLine />
        </div>
      </section>
      <section>
        <SolidButton text="Connect Wallet" />
      </section>
    </nav>
  );
};

export default Navbar;
