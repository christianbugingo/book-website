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
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';

const mockNotes = [
  { id: '1', title: 'Calculus I Review', subject: 'Mathematics', date: '2023-10-26' },
  { id: '2', title: 'Photosynthesis Process', subject: 'Biology', date: '2023-10-25' },
  { id: '3', title: 'React Hooks Explained', subject: 'Computer Science', date: '2023-10-24' },
  { id: '4', title: 'The French Revolution', subject: 'History', date: '2023-10-22' },
  { id: '5', title: 'Quantum Mechanics Intro', subject: 'Physics', date: '2023-10-21' },
  { id: '6', title: 'Shakespearean Sonnets', subject: 'Literature', date: '2023-10-20' },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here are your recent notes.</p>
        </div>
        <div className="flex w-full md:w-auto items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search notes..." className="pl-10" />
          </div>
          <Button asChild>
            <Link href="/notes/upload">
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Note
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>{note.subject}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Uploaded on {new Date(note.date).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" size="sm">
                <Link href={`/notes/${note.id}`}>View Note</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
