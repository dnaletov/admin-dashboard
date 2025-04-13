import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { getUsers } from '@/services/getUsers';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const addUser = (user: Omit<User, 'id'>) => {
    setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
  };

  const updateUser = (id: number, updatedUser: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return { users, loading, addUser, updateUser, deleteUser };
}
