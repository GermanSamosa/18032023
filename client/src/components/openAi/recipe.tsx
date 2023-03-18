import React, { useState } from 'react';
import ChatBotApi from './ChatBotAPI.tsx';

function RecipeChatBot() {
  const [question, setQuestion] = useState('');

  const handleMessageSend = (text: string) => {
    setQuestion(text);
  };

  return (
    <div>
      <ChatBotApi message={question} />
      <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} />
      <button onClick={() => handleMessageSend(question)}>Send</button>
    </div>
  );
}

export default RecipeChatBot;