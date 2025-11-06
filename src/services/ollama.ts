import axios from 'axios';

const OLLAMA_API_URL = 'http://localhost:11434/api';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  model: string;
  created_at: string;
  message: Message;
  done: boolean;
}

export interface GenerateRequest {
  model: string;
  prompt: string;
  stream?: boolean;
}

export interface ChatRequest {
  model: string;
  messages: Message[];
  stream?: boolean;
}

export const ollamaService = {
  /**
   * Generate a response from Ollama
   */
  async generate(prompt: string, model: string = 'llama2'): Promise<string> {
    try {
      const response = await axios.post(`${OLLAMA_API_URL}/generate`, {
        model,
        prompt,
        stream: false,
      });

      return response.data.response;
    } catch (error) {
      console.error('Error calling Ollama API:', error);
      throw new Error('Failed to generate response from Ollama');
    }
  },

  /**
   * Chat with Ollama using conversation history
   */
  async chat(messages: Message[], model: string = 'llama2'): Promise<string> {
    try {
      const response = await axios.post(`${OLLAMA_API_URL}/chat`, {
        model,
        messages,
        stream: false,
      });

      return response.data.message.content;
    } catch (error) {
      console.error('Error calling Ollama chat API:', error);
      throw new Error('Failed to chat with Ollama');
    }
  },

  /**
   * List available models
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await axios.get(`${OLLAMA_API_URL}/tags`);
      return response.data.models?.map((m: any) => m.name) || [];
    } catch (error) {
      console.error('Error listing Ollama models:', error);
      return [];
    }
  },

  /**
   * Stream chat responses (returns async generator)
   */
  async *streamChat(messages: Message[], model: string = 'llama2'): AsyncGenerator<string, void, unknown> {
    try {
      const response = await axios.post(`${OLLAMA_API_URL}/chat`, {
        model,
        messages,
        stream: true,
      }, {
        responseType: 'stream',
      });

      const reader = response.data;
      let buffer = '';

      for await (const chunk of reader) {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              if (data.message?.content) {
                yield data.message.content;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error streaming from Ollama:', error);
      throw new Error('Failed to stream from Ollama');
    }
  }
};
