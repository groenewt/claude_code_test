# Ollama Chat - TypeScript React App

A simple and elegant chat interface for interacting with Ollama AI models, built with React, TypeScript, and Vite.

## Features

- Modern, responsive chat interface
- Support for multiple Ollama models
- Real-time conversation with AI
- Clean and intuitive UI
- TypeScript for type safety
- Fast development with Vite

## Prerequisites

Before running this application, make sure you have the following installed:

1. **Node.js** (v18 or higher)
2. **Ollama** - Install from [ollama.ai](https://ollama.ai)

## Setup

### 1. Install Ollama

If you haven't installed Ollama yet:

```bash
# On macOS/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# On Windows
# Download from https://ollama.ai/download
```

### 2. Pull an Ollama Model

Pull at least one model to use with the chat:

```bash
# Pull llama2 (recommended for general use)
ollama pull llama2

# Or pull other models
ollama pull mistral
ollama pull codellama
ollama pull llama3
```

### 3. Start Ollama Service

Make sure Ollama is running:

```bash
ollama serve
```

The Ollama API should now be accessible at `http://localhost:11434`

### 4. Install Dependencies

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Chat.tsx          # Main chat component
│   ├── services/
│   │   └── ollama.ts         # Ollama API service
│   ├── App.tsx               # Root application component
│   ├── App.css               # Application styles
│   ├── index.css             # Global styles
│   └── main.tsx              # Entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Usage

1. **Select a Model**: Choose from available Ollama models in the dropdown at the top
2. **Start Chatting**: Type your message in the input field and press Send
3. **Clear Chat**: Click the "Clear Chat" button to start a new conversation

## Available Ollama Commands

```bash
# List installed models
ollama list

# Pull a new model
ollama pull <model-name>

# Remove a model
ollama rm <model-name>

# Show model information
ollama show <model-name>
```

## Troubleshooting

### Cannot connect to Ollama

- Make sure Ollama is running (`ollama serve`)
- Check that Ollama is accessible at `http://localhost:11434`
- Verify firewall settings

### No models available

- Pull at least one model: `ollama pull llama2`
- Restart the application after pulling models

### Slow responses

- Larger models require more resources
- Try smaller models like `llama2` or `mistral` for faster responses
- Ensure your system meets the requirements for running AI models locally

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **Ollama** - Local AI model runtime

## License

MIT

## Contributing

Feel free to open issues or submit pull requests for improvements!
