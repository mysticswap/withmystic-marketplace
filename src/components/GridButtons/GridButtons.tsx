import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import "./GridButtons.css";

const GridButtons = () => {
  const { setMinimalCards, minimalCards } = useHomeContext()!;
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
