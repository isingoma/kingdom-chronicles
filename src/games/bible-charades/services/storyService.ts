import { BIBLE_STORIES } from '../constants/stories';
import { chatgptStoryService } from './chatgptStoryService';
import { promptService } from './promptService';
import type { BibleStory, StoryGenerationMode } from '../types';

class StoryService {
  private usedStoryIds: Set<string> = new Set();

  async getNextStory(mode: StoryGenerationMode, theme: string, difficulty: string): Promise<BibleStory | null> {
    try {
      let story: BibleStory | null = null;
      
      switch (mode) {
        case 'bedrock':
          const prompt = await promptService.generateStoryPrompt(theme, difficulty);
          story = this.convertPromptToStory(prompt);
          break;
        case 'chatgpt':
          story = await chatgptStoryService.generateStory(theme, difficulty);
          break;
        case 'static':
        default:
          story = await this.getStaticStory();
      }

      if (!story) {
        throw new Error('Failed to generate story');
      }

      // Add descriptive fallback if not present
      if (!story.fallbackDescription) {
        story.fallbackDescription = this.generateFallbackDescription(story);
      }

      return story;
    } catch (error) {
      console.error('Error getting story:', error);
      return this.getStaticStory();
    }
  }

  private generateFallbackDescription(story: BibleStory): string {
    return `
      In this powerful biblical scene, ${story.description.toLowerCase()}
      The setting is ${story.scripture}, where this momentous event unfolds.
      Look carefully at the details that reveal this well-known story from Scripture.
    `.trim();
  }

  private async getStaticStory(): Promise<BibleStory> {
    const availableStories = BIBLE_STORIES.filter(
      story => !this.usedStoryIds.has(story.id)
    );

    if (availableStories.length === 0) {
      this.usedStoryIds.clear();
      return BIBLE_STORIES[0];
    }

    const story = availableStories[Math.floor(Math.random() * availableStories.length)];
    this.usedStoryIds.add(story.id);
    return story;
  }

  private convertPromptToStory(prompt: any): BibleStory {
    return {
      id: `story-${Date.now()}`,
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