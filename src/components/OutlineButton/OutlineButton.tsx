import "./OutlineButton.css";

type Props = { text: string };

const OutlineButton = ({ text }: Props) => {
  return <button className="outline_button">{text}</button>;
};

export default OutlineButton;
