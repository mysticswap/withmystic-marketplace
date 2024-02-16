import "./ControlBar.css";
// import GridButtons from "../GridButtons/GridButtons";
// import ControlBarDropdown from "../ControlBarDropdown/ControlBarDropdown";
import WalletFilterButton from "../FilterButton/WalletFilterButton";
import WalletControlBarSearchInput from "../ControlBarSearchInput/WalletControlBarSearchInput";
// import WalletFilterButton from "";

type Props = {
  hide?: boolean;
};

// This is intended to be a generic replacement for ControlBar
const WalletControlBar = ({ hide = false }: Props) => {
  return (
    <div className={`control_bar ${hide ? "hide" : ""}`}>
      <WalletFilterButton />
      <WalletControlBarSearchInput />
      {/* <ControlBarDropdown /> */}
      {/* <GridButtons /> */}
    </div>
  );
};

export default WalletControlBar;
