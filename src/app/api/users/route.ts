import { mockUsers } from '@/mocks/mock-users';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const externalRes = await fetch('https://dummyjson.com/users');
    const json = await externalRes.json();

    const dummyUsers = json.users.map((user: any) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      role: user.role,
      lastActive: new Date(
        Date.now() - Math.random() * 86400000 * 30
      ).toISOString(),
      firstActive: new Date(
        Date.now() - Math.random() * 86400000 * 30
      ).toISOString(),
      status: 'offline',
    }));

    const allUsers = [...dummyUsers, ...mockUsers];
    return NextResponse.json(allUsers);
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to load users' },
      { status: 500 }
    );
  }
}
