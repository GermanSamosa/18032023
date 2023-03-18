import React, { useState, useEffect } from 'react';

interface ChatBotApiProps {
  message: string;
}

const ChatBotApi = ({ message }: ChatBotApiProps) => {
  const [response, setResponse] = useState('');

  const getBotResponse = async (message: string) => {
    const url = process.env.REACT_APP_CHATBOT_API_URL || '';
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
    const body = { prompt: message, temperature: 0.7, max_tokens: 100 };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setResponse(data.choices[0].text);
    } catch (err) {
      console.error('Error while calling ChatBot API:', err);
      setResponse('');
    }
  };

  useEffect(() => {
    if (message) {
      getBotResponse(message);
    }
  }, [message]);

  return null;
};

export default ChatBotApi;