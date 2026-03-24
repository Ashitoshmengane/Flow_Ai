import express from 'express';
import Prompt from '../models/Prompt.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { prompt, response } = req.body;
    const newEntry = new Prompt({ prompt, response });
    await newEntry.save();
    res.status(201).json({ message: 'Saved to MongoDB', id: newEntry._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;