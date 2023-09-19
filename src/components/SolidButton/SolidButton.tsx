import "./SolidButton.css";

type Props = { text: string };

const SolidButton = ({ text }: Props) => {
  return <button className="solid_button">{text}</button>;
};

export default SolidButton;
