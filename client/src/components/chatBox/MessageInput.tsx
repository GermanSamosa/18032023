import React, { useState } from 'react';
import './MessageInput.css';
import SendButton from '../button/SendButton.tsx';

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="message-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <SendButton onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default MessageInput;