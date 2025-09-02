'use server';

import {
  generateDynamicNewsFeed,
  type GenerateDynamicNewsFeedInput,
  type GenerateDynamicNewsFeedOutput,
} from '@/ai/flows/generate-dynamic-news-feed';

export async function getNewsAction(
  input: GenerateDynamicNewsFeedInput
): Promise<GenerateDynamicNewsFeedOutput> {
  // In a real application, you might add authentication checks here
  // to ensure the user is allowed to perform this action.

  try {
    const result = await generateDynamicNewsFeed(input);
    return result;
  } catch (error) {
    console.error('Error generating news feed:', error);
    // You can re-throw the error or return a structured error object
    throw new Error('Failed to generate news feed.');
  }
}
