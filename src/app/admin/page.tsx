import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockUsers = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', joined: '2023-01-15' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user', joined: '2023-02-20' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'admin', joined: '2023-01-10' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'user', joined: '2023-03-01' },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-3 md:w-fit">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Manage your users and their roles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Email</TableHead>
                                <TableHead className="hidden md:table-cell">Role</TableHead>
                                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                                    <TableCell className="hidden md:table-cell"><Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge></TableCell>
                                    <TableCell className="hidden lg:table-cell">{new Date(user.joined).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="content">
            <Card>
                <CardHeader>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>Manage notes and other user-generated content.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Content management interface will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="settings">
            <Card>
                <CardHeader>
                    <CardTitle>Site Settings</CardTitle>
                    <CardDescription>Configure general site settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Site settings interface will be here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

      
    </div>
  );
}
