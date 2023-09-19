import React from 'react';
import './Navbar.css';
import {
  RiArrowDownSLine,
  RiDiscordFill,
  RiTwitterXLine,
} from 'react-icons/ri';
import SolidButton from '../SolidButton/SolidButton';

type Props = { logo: string };

const Navbar = ({ logo }: Props) => {
  return (
    <nav className="ms_mp_navbar">
      <section className="ms_mp_nav_left">
        <div className="ms_mp_logo_holder">
          <img src={logo} alt="collection_logo" />
        </div>

        <div className="ms_mp_nav_links">
          <a href="">
            <RiDiscordFill size={25} />
          </a>
          <a href="">
            <RiTwitterXLine size={20} />
          </a>
        </div>

        <div className="ms_mp_collections_dropdown">
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
