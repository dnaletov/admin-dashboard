import { mockUsers } from '@/mocks/mock-users';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const externalRes = await fetch('https://dummyjson.com/users');
    const json = await externalRes.json();

    const dummyUsers = json.users.map((user: any) => ({
      id: user.id,
    }));

    const allUsers = [...dummyUsers, ...mockUsers];

    const activity = allUsers.map((user) => ({
      id: user.id,
      loginStats: generateLoginStats(),
    }));

    return NextResponse.json(activity);
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to load activity' },
      { status: 500 }
    );
  }
}

function generateLoginStats() {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
    count: Math.floor(Math.random() * 5),
  })).reverse();
}
