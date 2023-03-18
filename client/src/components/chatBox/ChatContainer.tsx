import React, { useState } from 'react';
import ChatBox from './ChatBox';
import MessageList from './MessageList';
import ChatBotApi from '../openAi/ChatBotAPI';

interface ChatContainerProps {
  apiKey: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ apiKey }) => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    // TODO: send message to chatbot API and handle response
  };

  return (
    <div>
      <MessageList messages={messages} />
      <ChatBox sendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;