import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import "./GridButtons.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

const GridButtons = () => {
  const { setMinimalCards, minimalCards } = useGlobalContext()!;
  return (
    <div className="grid_buttons">
      <button
        onClick={() => {
          setMinimalCards(true);
        }}
      >
        <BsFillGridFill opacity={minimalCards ? 0.25 : 1} size={20} />
      </button>
      <button
        onClick={() => {
          setMinimalCards(false);
        }}
      >
        <BsFillGrid3X3GapFill opacity={!minimalCards ? 0.25 : 1} size={20} />
      </button>
    </div>
  );
};

export default GridButtons;
