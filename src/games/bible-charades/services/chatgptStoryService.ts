import { openAIClient } from '../../../services/openai/client';
import type { BibleStory } from '../types';

class ChatGPTStoryService {
  async generateStory(theme: string, difficulty: string): Promise<BibleStory> {
    try {
      const response = await openAIClient.generateStoryPrompt(theme, difficulty);
      let storyData;
      
      try {
        storyData = JSON.parse(response);
      } catch (parseError) {
        console.error('Error parsing ChatGPT response:', parseError);
        throw new Error('Invalid response format from ChatGPT');
      }

      // Generate a unique ID for the story
      const storyId = `story-${Date.now()}`;

      return {
        id: storyId,
        title: storyData.title,
        description: storyData.description,
        scripture: storyData.scripture,
        difficulty,
        images: [], // Will be populated by imageService
        fallbackDescription: storyData.description,
        options: storyData.options,
        devotional: storyData.devotional
      };
    } catch (error) {
      console.error('Error generating story from ChatGPT:', error);
      throw error;
    }
  }
}

export const chatgptStoryService = new ChatGPTStoryService();