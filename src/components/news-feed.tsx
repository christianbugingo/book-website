'use client';

import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getNewsAction } from '@/app/actions';
import type { GenerateDynamicNewsFeedOutput } from '@/ai/flows/generate-dynamic-news-feed';
import { Loader2, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';

const formSchema = z.object({
  fieldOfStudy: z.string().min(2, 'Please enter a field of study.').max(50),
});

const NewsFeed = () => {
  const [news, setNews] = useState<GenerateDynamicNewsFeedOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldOfStudy: 'Computer Science',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setNews(null);
    try {
      const result = await getNewsAction({
        fieldOfStudy: values.fieldOfStudy,
        numArticles: 6,
      });
      setNews(result);
    } catch (e) {
      setError('Failed to generate news feed. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const getScoreColor = (score: number) => {
    if (score > 0.7) return 'bg-green-500';
    if (score > 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-end gap-4">
              <FormField
                control={form.control}
                name="fieldOfStudy"
                render={({ field, fieldState, formState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Biology, History, AI" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Feed'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && <p className="text-center text-destructive">{error}</p>}
      
      {isLoading && !news && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                      <CardHeader>
                          <div className="h-6 bg-muted rounded w-3/4"></div>
                          <div className="h-4 bg-muted rounded w-1/4 mt-2"></div>
                      </CardHeader>
                      <CardContent>
                          <div className="h-4 bg-muted rounded w-full mb-2"></div>
                          <div className="h-4 bg-muted rounded w-full mb-2"></div>
                          <div className="h-4 bg-muted rounded w-5/6"></div>
                      </CardContent>
                      <CardFooter>
                           <div className="h-8 bg-muted rounded w-24"></div>
                      </CardFooter>
                  </Card>
              ))}
          </div>
      )}

      {news && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.articles.map((article: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; source: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; summary: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; relevanceScore: number; credibilityScore: number; url: string | undefined; }, index: Key | null | undefined) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg leading-snug">{article.title}</CardTitle>
                <CardDescription>{article.source}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">{article.summary}</p>
                 <div className="flex flex-wrap gap-2 text-xs">
                   <Badge className="flex items-center gap-1.5">
                    Relevance <span className={`h-2 w-2 rounded-full ${getScoreColor(article.relevanceScore)}`}></span> {Math.round(article.relevanceScore * 100)}%
                   </Badge>
                   <Badge className="flex items-center gap-1.5">
                    Credibility <span className={`h-2 w-2 rounded-full ${getScoreColor(article.credibilityScore)}`}></span> {Math.round(article.credibilityScore * 100)}%
                   </Badge>
                 </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="border border-input bg-background hover:bg-accent text-sm px-3 py-1">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read More <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
