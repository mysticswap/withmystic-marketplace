import { IoClose, IoSearchSharp } from "react-icons/io5";
import "./ControlBarSearchInput.css";
import { useWalletContext } from "../../context/WalletContext/WalletContext";

const WalletControlBarSearchInput = () => {
  const { tokenId, setTokenId } = useWalletContext()!;

  const clearInput = () => {
    setTokenId("");
  };

  return (
    <div className="control_bar_search">
      <input
        // type="number"
        placeholder="Search by Token ID"
        value={tokenId || ""}
        onChange={(e) => {
          // Remove every non-digit so that it doesn't appear in the 
          // search bar
          setTokenId(e.target.value.replace(/[^0-9]/g, ''));
        }}
      />
      {!tokenId ? (
        <IoSearchSharp size={20} />
      ) : (
        <IoClose size={20} className="input_closer" onClick={clearInput} />
      )}
    </div>
  );
};

export default WalletControlBarSearchInput;
