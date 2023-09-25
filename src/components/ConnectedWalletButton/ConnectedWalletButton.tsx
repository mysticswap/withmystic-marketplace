import { RiArrowDownSLine } from "react-icons/ri";
import "./ConnectedWalletButton.css";
import { useGlobalContext } from "../../context/GlobalContext";
import { truncateAddress } from "../../utils";
import { useState } from "react";

const ConnectedWalletButton = () => {
  const { user, setUser } = useGlobalContext()!;
  const [logout, setLogout] = useState(false);
  const logoutUser = () => {
    setUser(null);
  };
  return (
    <div className="connected_button_container">
      <button
        className="connected_wallet_button"
        onClick={() => setLogout(!logout)}
      >
        {truncateAddress(user!, 5, "...")}
        <RiArrowDownSLine size={20} />
      </button>

      {logout && (
        <button className="logout_btn" onClick={logoutUser}>
          Logout
        </button>
      )}
    </div>
  );
};

export default ConnectedWalletButton;
