import "./FlaggedWarning.css";
import { IoWarningSharp } from "react-icons/io5";

const FlaggedWarning = () => {
  return (
    <div className="flagged_warning">
      <IoWarningSharp size={25} display="block" />
      <p>Reported for suspicious activity on Opensea.</p>
    </div>
  );
};

export default FlaggedWarning;
