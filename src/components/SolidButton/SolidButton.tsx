import "./SolidButton.css";

type Props = { text: string; className?: string; onClick?: () => any };

const SolidButton = ({ text, className, onClick }: Props) => {
  return (
    <button className={`solid_button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default SolidButton;
