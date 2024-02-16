import "./ControlBar.css";
import GridButtons from "../GridButtons/GridButtons";
import WalletControlBarDropdown from "../ControlBarDropdown/WalletControlBarDropdown";
import WalletFilterButton from "../FilterButton/WalletFilterButton";
import WalletControlBarSearchInput from "../ControlBarSearchInput/WalletControlBarSearchInput";

type Props = {
  hide?: boolean;
};

// This is intended to be a generic replacement for ControlBar
const WalletControlBar = ({ hide = false }: Props) => {
  return (
    <div className={`control_bar ${hide ? "hide" : ""}`}>
      <WalletFilterButton />
      <WalletControlBarSearchInput />
      <WalletControlBarDropdown />
      <GridButtons />
    </div>
  );
};

export default WalletControlBar;
