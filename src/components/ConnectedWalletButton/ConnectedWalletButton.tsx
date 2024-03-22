import { RiArrowDownSLine } from "react-icons/ri";
import "./ConnectedWalletButton.css";
import { truncateAddress } from "../../utils";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { disconnectWallets } from "../../services/web3Onboard";
import { Link } from "react-router-dom";

const ConnectedWalletButton = () => {
  const { user, setUser, setProvider, setChainId } = useConnectionContext()!;
  const [logout, setLogout] = useState(false);
  const logoutRef = useRef(null);
  const logoutUser = () => {
    disconnectWallets(setUser, setProvider, setChainId);
  };
  const isMobile = useIsMobile();
  useOutsideClick(logoutRef, setLogout, "connected_wallet_button");

  return (
    <div className="connected_button_container">
      <button
        className="connected_wallet_button"
        onClick={() => setLogout(!logout)}
      >
        {truncateAddress(user!, isMobile ? 2 : 5, "...")}
        <RiArrowDownSLine size={20} />
      </button>

      {logout && (
        <div className="logout_btn" ref={logoutRef}>
          <Link to={`wallet/${user}`}>Profile</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ConnectedWalletButton;
