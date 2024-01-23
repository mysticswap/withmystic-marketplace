/* eslint-disable @typescript-eslint/no-explicit-any */
import "./SolidButton.css";

type Props = {
  text: string | null;
  className?: string;
  onClick?: (...args: any[]) => void;
  disabled?: boolean;
};

const SolidButton = ({ text, className, onClick, disabled }: Props) => {
  if (text === null) {
    return;
  }
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
