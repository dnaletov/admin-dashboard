import { User } from '@/types/user';

export const mockUsers: User[] = [
  {
    id: 101,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    role: 'admin',
    image: 'https://randomuser.me/api/portraits/women/81.jpg',
    status: 'online',
    lastActive: new Date().toISOString(),
    loginStats: generateLoginStats(),
  },
  {
    id: 102,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    role: 'editor',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    status: 'offline',
    lastActive: new Date(Date.now() - 2 * 86400000).toISOString(),
    loginStats: generateLoginStats(),
  },
  {
    id: 103,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie@example.com',
    role: 'user',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    status: 'away',
    lastActive: new Date(Date.now() - 5 * 86400000).toISOString(),
    loginStats: generateLoginStats(),
  },
];

function generateLoginStats() {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
    count: Math.floor(Math.random() * 5),
  })).reverse();
}
