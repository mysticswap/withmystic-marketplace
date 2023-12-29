import { RiArrowDownSLine } from "react-icons/ri";
import "./ConnectedWalletButton.css";
import { truncateAddress } from "../../utils";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";

const ConnectedWalletButton = () => {
  const { user, setUser, setProvider } = useConnectionContext()!;
  const [logout, setLogout] = useState(false);
  const logoutRef = useRef(null);
  const logoutUser = () => {
    setProvider(null)
    setUser(null);
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
        <button className="logout_btn" onClick={logoutUser} ref={logoutRef}>
          Logout
        </button>
      )}
    </div>
  );
};

export default ConnectedWalletButton;
