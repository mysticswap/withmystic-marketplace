import React from 'react';
import './SolidButton.css';

type Props = { text: string };

const SolidButton = ({ text }: Props) => {
  return <button className="ms_mp_solid_button">{text}</button>;
};

export default SolidButton;
