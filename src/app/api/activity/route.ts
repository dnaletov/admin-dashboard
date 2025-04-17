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
      loginHistory: generateLoginHistory(user.id),
    }));

    return NextResponse.json(activity);
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to load activity' },
      { status: 500 }
    );
  }
}

function generateLoginHistory(userId?: number) {
  //two fake suspicious users
  if (userId === 999) {
    return [0, 1, 2].flatMap((offset) =>
      Array.from({ length: 11 }).map(() => ({
        id: Math.floor(Math.random() * 10000),
        date: new Date(Date.now() - offset * 86400000).toISOString(),
        device: 'desktop',
        browser: 'Chrome',
        ip: '192.168.1.1',
      }))
    );
  }

  if (userId === 1000) {
    const spikeDay = 3;
    const normalDays = [0, 1, 2, 4, 5, 6, 7];

    const normalHistory = normalDays.flatMap((offset) =>
      Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() => ({
        id: Math.floor(Math.random() * 10000),
        date: new Date(Date.now() - offset * 86400000).toISOString(),
        device: 'mobile',
        browser: 'Safari',
        ip: '192.168.1.55',
      }))
    );

    const spikeHistory = Array.from({ length: 16 }).map(() => ({
      id: Math.floor(Math.random() * 10000),
      date: new Date(Date.now() - spikeDay * 86400000).toISOString(),
      device: 'desktop',
      browser: 'Chrome',
      ip: '192.168.1.99',
    }));

    return [...normalHistory, ...spikeHistory].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
  //
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
