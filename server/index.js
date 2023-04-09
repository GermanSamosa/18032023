// Import required modules
import express, { json } from 'express';
import axios from 'axios';
import { config } from 'dotenv';
config();

// Create the Express app
const app = express();
app.use(json());

// Define the route for recipe recommendations
app.post('/api/recipes', async (req, res) => {
  try {
    // Get the user's message from the request body
    const { message } = req.body;

    // Generate a recipe recommendation based on the user's message using the OpenAI API
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      data: {
        prompt: `Give me some recipes for ${message}`,
        max_tokens: 150,
        n: 1,
        stop: '\n',
        temperature: 0.5
      }
    });

    // Extract the recommended recipe from the OpenAI API response
    const { choices } = response.data;
    const { text } = choices[0];

    // Send the recipe recommendation back to the frontend as a JSON object
    res.json({ message: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to generate recipe recommendations' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});