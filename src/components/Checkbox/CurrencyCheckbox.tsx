// import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import "./Checkbox.css";
import { BsCheck } from "react-icons/bs";

type Prop = {
  isClicked: boolean;
  currentIndex: number | undefined;
  tokenIndex: number;
};

const CurrencyCheckbox = ({ isClicked, tokenIndex, currentIndex }: Prop) => {
  return (
    <div
      role="button"
      className={`checkbox ${
        tokenIndex === currentIndex ? "clicked_check" : ""
      }`}
    >
      {isClicked && <BsCheck size={15} color="white" />}
    </div>
  );
};

export default CurrencyCheckbox;
