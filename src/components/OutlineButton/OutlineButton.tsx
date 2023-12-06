import "./OutlineButton.css";

type Props = { text: string; onClick?: (...args: any[]) => void };

const OutlineButton = ({ text, onClick }: Props) => {
  return (
    <button className="outline_button" onClick={onClick}>
      {text}
    </button>
  );
};

export default OutlineButton;
