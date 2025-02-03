import { BIBLE_STORIES } from '../constants/stories';
import { chatgptStoryService } from './chatgptStoryService';
import { promptService } from './promptService';
import type { BibleStory, StoryGenerationMode } from '../types';

class StoryService {
  private usedStoryIds: Set<string> = new Set();

  async fetchStoriesBatch(mode: StoryGenerationMode, theme: string, difficulty: string, batchSize: number = 10): Promise<BibleStory[]> {
    try {
      let stories: BibleStory[] = [];
      
      switch (mode) {
        case 'bedrock':
          const prompt = await promptService.generateStoryPrompt(theme, difficulty, batchSize);
          stories = Array.isArray(prompt) ? prompt.map(p => this.convertPromptToStory(p)) : [];
          break;

        case 'chatgpt':
          stories = await chatgptStoryService.generateStories(theme, difficulty, batchSize);
          break;

        case 'static':
        default:
          // Filter stories by difficulty first
          const difficultyStories = BIBLE_STORIES.filter(story => 
            story.difficulty === difficulty && !this.usedStoryIds.has(story.id)
          );
          
          if (difficultyStories.length === 0) {
            this.usedStoryIds.clear();
            stories = BIBLE_STORIES.filter(story => story.difficulty === difficulty).slice(0, batchSize);
          } else {
            stories = difficultyStories.slice(0, batchSize);
          }

          stories.forEach(story => this.usedStoryIds.add(story.id));
      }

      return stories.map(story => ({
        ...story,
        fallbackDescription: story.fallbackDescription || this.generateFallbackDescription(story)
      }));
    } catch (error) {
      console.error('Error fetching stories batch:', error);
      // Fallback to static stories with correct difficulty
      return BIBLE_STORIES.filter(story => story.difficulty === difficulty).slice(0, batchSize);
    }
  }

  private generateFallbackDescription(story: BibleStory): string {
    return `
      In this powerful biblical scene, ${story.description.toLowerCase()}
      The setting is ${story.scripture}, where this momentous event unfolds.
      Look carefully at the details that reveal this well-known story from Scripture.
    `.trim();
  }

  private convertPromptToStory(prompt: any): BibleStory {
    return {
      id: `story-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: prompt.title,
      description: prompt.description,
      scripture: prompt.scripture,
      difficulty: prompt.difficulty || 'medium',
      images: [],
      fallbackDescription: prompt.description,
      options: prompt.options,
      devotional: prompt.devotional
    };
  }

  resetUsedStories(): void {
    this.usedStoryIds.clear();
  }
}

export const storyService = new StoryService();