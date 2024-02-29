import { RiArrowDownSLine } from "react-icons/ri";
import "./ConnectedWalletButton.css";
import { truncateAddress } from "../../utils";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { disconnectWallets } from "../../services/web3Onboard";
import { useNavigate } from "react-router-dom";
const ConnectedWalletButton = () => {
  const { user, setUser, setProvider, setChainId } = useConnectionContext()!;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const logoutUser = () => {
    disconnectWallets(setUser, setProvider, setChainId);
  };
  const isMobile = useIsMobile();
  useOutsideClick(dropdownRef, setProvider, "connected_wallet_button");

  return (
    <div className="connected_button_container">
      <button
        className="connected_wallet_button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {truncateAddress(user!, isMobile ? 2 : 5, "...")}
        <RiArrowDownSLine size={20} />
      </button>

      {showDropdown && (
        <div className="dropdown-container">
          <button className="navbar-button" onClick={logoutUser} ref={dropdownRef}>
            Logout
          </button>
          <button className="navbar-button" onClick={() => navigate("/wallet")} ref={dropdownRef}>
          Wallet
        </button>
        </div>
      )}
    </div>
  );
};

export default ConnectedWalletButton;
