import { useState } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function App() {
  const [prompt, setPrompt] = useState('What is the capital of France?');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('');

  const handleAsk = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    setLoading(true);
    setResponse('');
    setModel('');

    try {
      const res = await axios.post(`${BACKEND_URL}/api/ask-ai`, { prompt: trimmedPrompt });
      setResponse(res.data.response);
      setModel(res.data.model || 'grok-beta');
    } catch (err) {
      setResponse('Unable to reach the AI service right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!prompt.trim() || !response) return;

    try {
      await axios.post(`${BACKEND_URL}/api/save`, { prompt, response });
      const btn = document.getElementById('save-btn');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = '✓ Saved';
        setTimeout(() => (btn.textContent = original), 1800);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const hasResponse = response && response.length > 0;

  return (
    <div className="app">
      {/* Clean Top Navigation */}
      <nav className="top-nav">
        <div className="nav-brand">
          <div className="brand-orb">✧</div>
          <span className="brand-name">Lumina</span>
        </div>

        <div className="nav-actions">
          <button
            className="btn btn-secondary"
            id="save-btn"
            onClick={handleSave}
            disabled={!hasResponse}
          >
            Save
          </button>
        </div>
      </nav>

      <div className="main-content">
        <div className="interface-wrapper">
          {/* Prompt Input Card */}
          <div className="card input-card">
            <div className="card-header">
              <div className="card-icon">✦</div>
              <div className="card-title">Your Prompt</div>
            </div>

            <textarea
              className="prompt-textarea"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything... What shall we explore today?"
              rows={6}
            />

            <button
              className="btn btn-primary generate-btn"
              onClick={handleAsk}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Thinking...
                </>
              ) : (
                'Generate Response'
              )}
            </button>
          </div>

          {/* Response Output Card */}
          <div className="card response-card">
            <div className="card-header">
              <div className="card-icon">◈</div>
              <div className="card-title">AI Response</div>
              {model && <div className="model-tag">⚡ {model.split('/').pop()}</div>}
            </div>

            <div className={`response-content ${hasResponse ? 'has-content' : ''}`}>
              {loading ? (
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              ) : hasResponse ? (
                <div className="response-text">{response}</div>
              ) : (
                <div className="empty-state">
                  Your response will appear here after you generate ✨
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="footer-hint">
          Clean • Minimal • Powered by Lumina
        </div>
      </div>
    </div>
  );
}