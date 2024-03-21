// import { IconType } from "react-icons";
import "./ActivityFilterButton.css";
import Checkbox from "../Checkbox/Checkbox";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { BiInfoCircle } from "react-icons/bi";
import InfoCircle from "../../assets/info.svg";

const Icon = ({ text }: { text: string }) => {
  return (
    <div className="tooltip">
      <img src={InfoCircle} alt="icon" style={{ width: 20, height: 20 }} />
      <span className="tooltiptext">{text}</span>
    </div>
  );
};

export default Icon;
