'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: Omit<User, 'id'>, id?: number) => void;
  user?: User | null;
};

export default function UserModal({ open, onClose, onSubmit, user }: Props) {
  const [form, setForm] = useState<Omit<User, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    status: 'offline',
    image: '',
    lastActive: '',
  });

  useEffect(() => {
    if (user) {
      const { id, ...rest } = user;
      setForm(rest);
    } else {
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        role: 'user',
        status: 'offline',
        image: '',
        lastActive: '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form, user?.id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogDescription>
            {user
              ? 'Edit the details of the selected user.'
              : 'Add a new user to the system.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
          />
          <Input
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
          <Input
            name="role"
            placeholder="Role (admin/user)"
            value={form.role}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>{user ? 'Update' : 'Create'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
