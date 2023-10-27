import { BiLoaderCircle } from "react-icons/bi";
import "./ProcessComponent.css";
import { RiTwitterXLine } from "react-icons/ri";

type Props = {
  stage: number;
};

const ProcessComponent = ({ stage }: Props) => {
  return (
    <div className="process_component">
      {stage == 1 && (
        <div className="stage">
          <p>Processing...</p>
          <BiLoaderCircle className="loader" size={50} />
        </div>
      )}

      {stage == 2 && (
        <div className="stage">
          <p>Share it:</p>
          <RiTwitterXLine className="twitter_share" size={50} display="block" />
        </div>
      )}
    </div>
  );
};

export default ProcessComponent;
