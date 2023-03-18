import React from 'react';
import './Message.css'

interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div className={`message ${isUser ? 'user' : 'bot'}`}>
      <div className="message-bubble">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;