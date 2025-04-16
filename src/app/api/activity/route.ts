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
      loginHistory: generateLoginHistory(),
    }));

    return NextResponse.json(activity);
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to load activity' },
      { status: 500 }
    );
  }
}

function generateLoginHistory() {
  const devices = ['desktop', 'mobile', 'tablet'];
  const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
  const ipBase = '192.168.';

  const loginsCount = Math.floor(Math.random() * 10) + 1;

  const history = Array.from({ length: loginsCount }, () => {
    const daysAgo = Math.floor(Math.random() * 30);
    return {
      id: Math.floor(Math.random() * 10000),
      date: new Date(Date.now() - daysAgo * 86400000).toISOString(),
      device: devices[Math.floor(Math.random() * devices.length)],
      browser: browsers[Math.floor(Math.random() * browsers.length)],
      ip: `${ipBase}${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    };
  });

  return history.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}
