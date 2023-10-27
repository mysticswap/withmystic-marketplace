import "./SolidButton.css";

type Props = {
  text: string;
  className?: string;
  onClick?: (...args: any[]) => void;
  disabled?: boolean;
};

const SolidButton = ({ text, className, onClick, disabled }: Props) => {
  return (
    <button
      className={`solid_button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SolidButton;
