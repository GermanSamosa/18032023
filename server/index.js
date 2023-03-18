const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/messages", async (req, res) => {
  const { message } = req.body;
  console.log("API key***************:", process.env.REACT_APP_OPENAI_API_KEY);
  const prompt = `I want to make a hotdog. Can you provide the recipe?`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt,
        max_tokens: 1024,
        temperature: 0.5,
        n: 1,
        stop: "\n",
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      }
    );

    const { choices } = response.data;
    const { text } = choices[0];

    res.json({ message: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));