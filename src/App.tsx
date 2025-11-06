import { useState, useEffect } from 'react';
import { Chat } from './components/Chat';
import { ollamaService } from './services/ollama';
import './App.css';

function App() {
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('llama2');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const availableModels = await ollamaService.listModels();
      if (availableModels.length > 0) {
        setModels(availableModels);
        setSelectedModel(availableModels[0]);
      } else {
        setError('No models found. Please pull a model first (e.g., ollama pull llama2)');
      }
    } catch (err) {
      setError('Failed to connect to Ollama. Make sure Ollama is running on localhost:11434');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Ollama Chat</h1>
        <div className="model-selector">
          {isLoading ? (
            <p>Loading models...</p>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <button onClick={loadModels} className="retry-button">
                Retry
              </button>
            </div>
          ) : (
            <>
              <label htmlFor="model-select">Model:</label>
              <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="model-select"
              >
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </header>

      <main className="app-main">
        {!isLoading && !error && <Chat model={selectedModel} />}
      </main>

      <footer className="app-footer">
        <p>
          Powered by <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">Ollama</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
