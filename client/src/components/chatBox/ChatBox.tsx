import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput.tsx';
import './ChatBox.css';
import Message from './Message.tsx';
import ChatBotApi from '../openAi/ChatBotAPI.tsx';

interface ChatBoxProps {
  sendMessage: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ sendMessage }) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [botMessage, setBotMessage] = useState('');

  useEffect(() => {
    if (botMessage !== '') {
      setMessages((prevMessages) => [...prevMessages, { text: botMessage, isUser: false }]);
      setBotMessage('');
    }
  }, [botMessage]);

  const handleMessageSend = async (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUser: true }]);
    sendMessage(text);
  };

  const getBotResponse = async (message: string) => {
    const url = process.env.REACT_APP_CHATBOT_API_URL || '';
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
    const body = { prompt: message, temperature: 0.7, max_tokens: 100 };
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    try {
      const data = await response.json();
      if (data?.choices?.length > 0) {
        return data.choices[0].text;
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error('Error parsing response:', err);
      return '';
    }
  };


  const handleBotMessage = async () => {
    if (messages.length > 0) {
      const response = await getBotResponse(messages[messages.length - 1].text);
      console.log('Response:', response);
      if (response !== '') {
        setBotMessage(response);
      }
    }
  };

  useEffect(() => {
    handleBotMessage();
  }, [messages]);

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((message, i) => (
          <Message key={i} text={message.text} isUser={message.isUser} />
        ))}
        {botMessage && (
          <Message key={messages.length} text={botMessage} isUser={false} />
        )}
      </div>
      <MessageInput onSend={handleMessageSend} />
      <ChatBotApi message={messages[messages.length - 1]?.text || ''} />
    </div>
  );
};

export default ChatBox;