import React, { useState, useEffect } from 'react';
import './App.css';
import ChatBox from './components/chatBox/ChatBox.tsx';

function generateBotResponse(userInput: string): string {
  // Here you can implement any logic to generate a bot response based on the user input
  return `Thanks for your message: "${userInput}"`;
}

function App() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const sendMessage = (message: string) => {
    const newMessage = { text: message, isUser: true };
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.isUser) {
      const botResponse = generateBotResponse(lastMessage.text);
      const newBotMessage = { text: botResponse, isUser: false };
      setTimeout(() => {
        setMessages([...messages, newBotMessage]);
      }, 1000);
    }
  }, [messages]);

  return (
    <div className="App">
      <header className="App-header">
        <ChatBox messages={messages} sendMessage={sendMessage} />
      </header>
    </div>
  );
}

export default App;