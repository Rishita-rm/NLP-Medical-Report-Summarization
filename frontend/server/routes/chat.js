const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'system',
          content: `You are a helpful medical assistant for HealthEase...`
        },
        ...messages
      ],
      max_tokens: 150,
      temperature: 0.7,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

module.exports = router; 