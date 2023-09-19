import "./Checkbox.css";
import { BsCheck } from "react-icons/bs";

type Prop = { isClicked: boolean };

const Checkbox = ({ isClicked }: Prop) => {
  return (
    <div
      role="button"
      className={`ms_mp_checkbox ${isClicked ? "ms_mp_clicked_check" : ""}`}
    >
      {isClicked && <BsCheck size={15} color="white" />}
    </div>
  );
};

export default Checkbox;
