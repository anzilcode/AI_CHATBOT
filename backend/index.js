const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch'); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.API_KEY; 

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const aiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';

    res.json({ message: aiResponse });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
