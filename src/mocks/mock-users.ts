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
    lastActive: getActiveDate(),
    firstActive: getActiveDate(),
  },
  {
    id: 102,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    role: 'moderator',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    status: 'offline',
    lastActive: getActiveDate(),
    firstActive: getActiveDate(),
  },
  {
    id: 103,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie@example.com',
    role: 'user',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    status: 'away',
    lastActive: getActiveDate(),
    firstActive: getActiveDate(),
  },
  {
    id: 999,
    firstName: 'Test',
    lastName: 'Suspicious',
    email: 'suspicious@example.com',
    role: 'user',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'away',
    lastActive: getActiveDate(),
    firstActive: getActiveDate(),
  },
  {
    id: 1000,
    firstName: 'Suspicious',
    lastName: 'Test',
    email: 'suspicious@example.com',
    role: 'user',
    image: 'https://randomuser.me/api/portraits/men/31.jpg',
    status: 'away',
    lastActive: getActiveDate(),
    firstActive: getActiveDate(),
  },
];

function getActiveDate() {
  return new Date(Date.now() - Math.random() * 86400000 * 30).toISOString();
}
