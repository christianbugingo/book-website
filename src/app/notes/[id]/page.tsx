import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const mockNote = {
    id: '1',
    title: 'Calculus I Review',
    subject: 'Mathematics',
    date: '2023-10-26',
    author: 'Alice Johnson',
    content: `
# Limits and Continuity

A limit is the value that a function approaches as the input approaches some value.

## Definition of a Limit
Let f(x) be a function defined on an open interval containing c (except possibly at c) and let L be a real number.
The statement lim(x->c) f(x) = L means that for each ε > 0 there exists a δ > 0 such that if 0 < |x - c| < δ, then |f(x) - L| < ε.

# Derivatives

The derivative of a function of a real variable measures the sensitivity to change of the function value (output value) with respect to a change in its argument (input value).

## Power Rule
d/dx(x^n) = nx^(n-1)
`
};

const mockComments = [
    { id: 'c1', author: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?u=bob', date: '2023-10-26', text: "This is a great summary! The definition of a limit always confused me." },
    { id: 'c2', author: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=charlie', date: '2023-10-27', text: "Could you add an example for the power rule?" },
];

export default function NoteDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="mb-8">
                            <p className="text-base font-semibold text-primary">{mockNote.subject}</p>
                            <h1 className="text-4xl font-bold font-headline mt-2">{mockNote.title}</h1>
                            <p className="text-muted-foreground mt-4">By {mockNote.author} on {new Date(mockNote.date).toLocaleDateString()}</p>
                        </div>
                        {/* A simple markdown renderer would be better here in a real app */}
                        <div dangerouslySetInnerHTML={{ __html: mockNote.content.replace(/\n/g, '<br/>').replace(/# (.*)/g, '<h2>$1</h2>') }}></div>
                    </article>

                    <Separator className="my-12" />

                    {/* Comments Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Discussion ({mockComments.length})</h2>
                        <div className="space-y-6">
                            {/* Add Comment Form */}
                            <div className="flex items-start space-x-4">
                                <Avatar>
                                    <AvatarImage src="https://i.pravatar.cc/150?u=currentuser" />
                                    <AvatarFallback>You</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <Textarea placeholder="Add a comment..." className="mb-2" />
                                    <Button>Post Comment</Button>
                                </div>
                            </div>
                            {/* Existing Comments */}
                            {mockComments.map(comment => (
                                <div key={comment.id} className="flex items-start space-x-4">
                                    <Avatar>
                                        <AvatarImage src={comment.avatar} />
                                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold">{comment.author}</p>
                                            <p className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</p>
                                        </div>
                                        <p className="text-muted-foreground">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About the Author</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="https://i.pravatar.cc/150?u=alice" />
                                <AvatarFallback>AJ</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">{mockNote.author}</p>
                                <p className="text-sm text-muted-foreground">Joined 2023</p>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Related Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li className="text-primary hover:underline cursor-pointer">Introduction to Derivatives</li>
                                <li className="text-primary hover:underline cursor-pointer">Chain Rule Practice</li>
                                <li className="text-primary hover:underline cursor-pointer">Understanding Integrals</li>
                            </ul>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    )
}
