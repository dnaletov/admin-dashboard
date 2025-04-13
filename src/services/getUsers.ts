import { User } from '@/types/user';

export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch('/api/users');

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('❌ Error loading users:', error);
    return [];
  }
}
