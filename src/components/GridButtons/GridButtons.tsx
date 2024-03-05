import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import "./GridButtons.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

const GridButtons = () => {
  const { setMinimalCards, minimalCards, listView, setListView } =
    useGlobalContext();
  return (
    <div className="grid_buttons">
      <button
        onClick={() => {
          setListView(false);
          setMinimalCards(true);
        }}
      >
        <BsFillGridFill opacity={!minimalCards ? 0.25 : 1} size={20} />
      </button>
      <button
        onClick={() => {
          setListView(true);
          setMinimalCards(false);
        }}
      >
        <FaThList opacity={!listView ? 0.25 : 1} size={20} />
      </button>
      <button
        onClick={() => {
          setMinimalCards(false);
          setListView(false);
        }}
      >
        <BsFillGrid3X3GapFill
          opacity={minimalCards || listView ? 0.25 : 1}
          size={20}
        />
      </button>
    </div>
  );
};

export default GridButtons;
