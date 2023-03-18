import React from 'react';
import Message from './Message.tsx';
import './MessageList.css'

interface MessageListProps {
  messages: { text: string; isUser: boolean }[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <Message key={index} text={message.text} isUser={message.isUser} />
      ))}
    </div>
  );
};

export default MessageList;