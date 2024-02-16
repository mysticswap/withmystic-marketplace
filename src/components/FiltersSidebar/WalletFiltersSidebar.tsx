import "./FiltersSidebar.css";
import { useWalletContext } from "../../context/WalletContext/WalletContext";
import { IoClose } from "react-icons/io5";
import { ReactElement } from "react";

type Props = {
  children?: ReactElement | ReactElement[];
};


const WalletFiltersSidebar = ({ children }: Props) => {
  const { showMobileFilters, setShowMobileFilters } =
    useWalletContext()!;

  return (
    <div
      className={`filters_sidebar ${showMobileFilters ? "show_sidebar" : ""}`}
    >
      <div className="filters_header">
        <p>Filters</p>
        <IoClose
          display="block"
          size={25}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        />
      </div>
      { children }
    </div>
  );
};

export default WalletFiltersSidebar;
