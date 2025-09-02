'use server';

/**
 * @fileOverview A dynamic news feed generator for study-related articles.
 *
 * - generateDynamicNewsFeed - A function that generates a dynamic news feed.
 * - GenerateDynamicNewsFeedInput - The input type for the generateDynamicNewsFeed function.
 * - GenerateDynamicNewsFeedOutput - The return type for the generateDynamicNewsFeed function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NewsArticleSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  source: z.string().describe('The source of the news article (e.g., website name).'),
  url: z.string().url().describe('The URL of the news article.'),
  relevanceScore: z.number().describe('A score indicating the relevance of the article to the user\'s study field (0-1).'),
  credibilityScore: z.number().describe('A score indicating the credibility of the news source (0-1).'),
  summary: z.string().describe('A brief summary of the news article.'),
});

const GenerateDynamicNewsFeedInputSchema = z.object({
  fieldOfStudy: z.string().describe('The user\'s field of study (e.g., Computer Science, Biology).'),
  numArticles: z.number().int().positive().default(5).describe('The number of news articles to include in the feed.'),
});
export type GenerateDynamicNewsFeedInput = z.infer<typeof GenerateDynamicNewsFeedInputSchema>;

const GenerateDynamicNewsFeedOutputSchema = z.object({
  articles: z.array(NewsArticleSchema).describe('An array of relevant news articles.'),
});
export type GenerateDynamicNewsFeedOutput = z.infer<typeof GenerateDynamicNewsFeedOutputSchema>;

export async function generateDynamicNewsFeed(input: GenerateDynamicNewsFeedInput): Promise<GenerateDynamicNewsFeedOutput> {
  return generateDynamicNewsFeedFlow(input);
}

const analyzeSource = ai.defineTool(
  {
    name: 'analyzeSource',
    description: 'Analyzes a news source for relevance and credibility based on the user\'s field of study.',
    inputSchema: z.object({
      sourceUrl: z.string().url().describe('The URL of the news source to analyze.'),
      fieldOfStudy: z.string().describe('The user\'s field of study.'),
    }),
    outputSchema: z.object({
      relevanceScore: z.number().describe('A score (0-1) indicating the relevance of the source to the field of study.'),
      credibilityScore: z.number().describe('A score (0-1) indicating the credibility of the news source.'),
    }),
  },
  async input => {
    // Dummy implementation for relevance and credibility analysis.
    // Replace with actual implementation using a web scraping and analysis service.
    return {
      relevanceScore: Math.random(),
      credibilityScore: Math.random(),
    };
  }
);

const summarizeArticle = ai.defineTool({
  name: 'summarizeArticle',
  description: 'Summarizes a news article from a given URL.',
  inputSchema: z.object({
    articleUrl: z.string().url().describe('The URL of the news article to summarize.'),
  }),
  outputSchema: z.object({
    summary: z.string().describe('A brief summary of the news article.'),
  }),
}, async input => {
  // Dummy implementation for summarization.
  // Replace with actual implementation using a text summarization service.
  return {
    summary: `Summary of ${input.articleUrl}`,
  };
});

const prompt = ai.definePrompt({
  name: 'generateDynamicNewsFeedPrompt',
  tools: [analyzeSource, summarizeArticle],
  input: {schema: GenerateDynamicNewsFeedInputSchema},
  output: {schema: GenerateDynamicNewsFeedOutputSchema},
  prompt: `You are a news aggregator that provides a dynamic news feed based on the user's field of study.

  The user is studying: {{{fieldOfStudy}}}.
  You should return the {{numArticles}} most relevant and credible news articles.

  Here's how you should determine the articles:

  1.  **Identify Potential Sources:** Find a list of potential news sources related to the field of study. For each source, use the \`analyzeSource\` tool to assess its relevance and credibility.

  2.  **Select Top Articles:** From the analyzed sources, pick the most promising articles.

  3.  **Summarize and Format:** For each selected article, use the \`summarizeArticle\` tool to create a brief summary. Then, format the final output according to the provided schema.`,
});

const generateDynamicNewsFeedFlow = ai.defineFlow(
  {
    name: 'generateDynamicNewsFeedFlow',
    inputSchema: GenerateDynamicNewsFeedInputSchema,
    outputSchema: GenerateDynamicNewsFeedOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
