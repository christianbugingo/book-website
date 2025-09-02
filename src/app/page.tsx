import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, MessageSquare, Search, Users, PlusCircle } from 'lucide-react';
import HeroAnimation from '@/components/hero-animation';
import NewsFeed from '@/components/news-feed';

const mockBooks = [
    { id: '1', title: 'The Laws of Human Nature', author: 'Robert Greene', cover: 'https://picsum.photos/300/400' },
    { id: '2', title: 'Atomic Habits', author: 'James Clear', cover: 'https://picsum.photos/300/401' },
    { id: '3', title: 'The Psychology of Money', author: 'Morgan Housel', cover: 'https://picsum.photos/300/402' },
    { id: '4', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', cover: 'https://picsum.photos/300/403' },
    { id: '5', title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'https://picsum.photos/300/404' },
    { id: '6', title: '1984', author: 'George Orwell', cover: 'https://picsum.photos/300/405' },
];

export default function Home() {
  return (
    <>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground mb-6">
                Unlock Your Potential with <span className="text-primary">Ubwenge</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Your intelligent partner in learning. Upload notes, collaborate with peers, and stay updated with AI-curated news relevant to your studies.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button asChild size="lg">
                  <Link href="/login">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-96 flex items-center justify-center">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Ubwenge?</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Everything you need to supercharge your study sessions and stay ahead.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="pt-4">Note Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Easily upload, organize, and access your study notes from anywhere.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="pt-4">Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Discuss and clarify concepts with peers using the integrated comment system.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="pt-4">Powerful Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Quickly find the information you need with our robust search functionality.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="pt-4">Dynamic News Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Stay current with AI-powered news updates tailored to your field of study.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div className='text-center md:text-left'>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Books</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                Explore a curated collection of books from various fields.
                </p>
            </div>
            <Button asChild>
                <Link href="/login">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload Book
                </Link>
            </Button>
          </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {mockBooks.map((book) => (
                    <Card key={book.id} className="overflow-hidden flex flex-col">
                        <Image src={book.cover} alt={book.title} width={300} height={400} className="w-full h-auto object-cover" />
                        <CardHeader className="p-4 flex-grow">
                            <CardTitle className="text-base truncate">{book.title}</CardTitle>
                            <CardDescription className="text-xs truncate">{book.author}</CardDescription>
                        </CardHeader>
                         <CardFooter className="p-2">
                           <Button asChild variant="secondary" size="sm" className="w-full">
                                <Link href={`/login`}>Read Now</Link>
                           </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Stay Informed</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Discover the latest articles and breakthroughs in your field. Enter a topic to generate a personalized news feed.
            </p>
          </div>
          <NewsFeed />
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Ready to Elevate Your Learning?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Join Ubwenge today and take the first step towards smarter, more efficient studying.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/login" className="flex items-center gap-2">
                Sign Up Now <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
