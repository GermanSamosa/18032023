import React from 'react';
import './SendButton.css'

interface SendButtonProps {
  onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>Send</button>
  );
};

export default SendButton;