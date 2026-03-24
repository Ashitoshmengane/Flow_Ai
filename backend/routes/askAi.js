import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const MODELS = [
  'mistralai/mistral-small-3.1-24b-instruct:free',
  'google/gemma-3-27b-it:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'openrouter/free',
];

router.post('/', async (req, res) => {
  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': process.env.SITE_URL || 'https://ai-flow-app.vercel.app',
      'X-OpenRouter-Title': 'AI Flow App',
    },
  });

  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  for (const model of MODELS) {
    try {
      const completion = await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
      });

      const responseText = completion.choices[0].message.content;
      return res.json({ response: responseText, model });
    } catch (error) {
      console.warn(`Model ${model} failed:`, error.status, '— trying next...');

      if (error.status !== 429 && error.status !== 400) {
        console.error('Non-retryable error:', error);
        return res.status(500).json({ error: 'AI service error' });
      }
    }
  }

  res.status(503).json({ error: 'All models are rate limited. Try again in a minute.' });
});

export default router;