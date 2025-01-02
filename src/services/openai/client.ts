import { OPENAI_CONFIG } from './config';

interface ChatGPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = OPENAI_CONFIG.apiKey;
    this.baseUrl = OPENAI_CONFIG.baseUrl;

    if (!this.apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
  }

  async generateStoryPrompt(theme: string, difficulty: string): Promise<string> {
    try {
      const prompt = `Generate a Bible-themed story question with the following requirements:
        - Theme: ${theme}
        - Difficulty: ${difficulty}
        - Include a title, description, scripture reference, and 4 multiple choice options
        - Make it engaging and educational
        - Format as JSON with fields: title, description, scripture, options (array), devotional
        - First option should be the correct answer
        - Keep it appropriate for all ages`;
      console.log(`${this.baseUrl}/chat/completions`)
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: OPENAI_CONFIG.model,
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to generate story from ChatGPT');
      }

      const data = await response.json() as ChatGPTResponse;
      console.log(`my response data `,data.choices[0].message.content)
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
}

export const openAIClient = new OpenAIClient();