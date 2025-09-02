'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock user data - in a real app, this would come from your database
const initialUser = {
  name: 'Sample User',
  email: 'user@ubwenge.com',
  joined: '2024-01-01',
  avatarUrl: 'https://i.pravatar.cc/150?u=sampleuser',
  stats: {
    notesUploaded: 5,
    booksShared: 2,
    commentsMade: 12,
  },
};

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const { toast } = useToast();


  const handleSaveChanges = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: editedName,
      email: editedEmail,
    }));
    setIsEditDialogOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved (view only).",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Joined on {new Date(user.joined).toLocaleDateString()}
              </p>
              <Button className="mt-4 w-full" onClick={() => setIsEditDialogOpen(true)}>
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl font-bold font-headline mb-8">User Dashboard</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Notes Uploaded</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{user.stats.notesUploaded}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Books Shared</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{user.stats.booksShared}</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Comments Made</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{user.stats.commentsMade}</p>
              </CardContent>
            </Card>
          </div>

           <Card>
            <CardHeader>
                <CardTitle>My Activity</CardTitle>
                <CardDescription>A log of your recent actions on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Activity feed will be displayed here.</p>
            </CardContent>
           </Card>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
               <Label className="text-right col-span-1">Avatar</Label>
               <div className="col-span-3">
                <Button variant="outline" disabled>Upload Image (coming soon)</Button>
               </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
