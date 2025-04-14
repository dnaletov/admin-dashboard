import { UserActivity } from '@/types/user-activity';

export async function getUserActivity(): Promise<UserActivity[]> {
  try {
    const res = await fetch('/api/activity');
    if (!res.ok) throw new Error('Failed to fetch activity');
    return await res.json();
  } catch (err) {
    console.error('❌ Error fetching user activity:', err);
    return [];
  }
}
