import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { STATIC_PAGES } from '@/constants/static-pages';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const res = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  });
  const users = await res.json();

  return (
    <div>
      <div className={'my-7'}>
        <h1 className={'text-7xl'}>
          Welcome, {session?.user?.name} ({session?.user?.email})
        </h1>
      </div>
      <div>
        <Link href={STATIC_PAGES.users}>
          <Card className={'hover:bg-primary/10'}>
            <CardHeader>
              <CardTitle className={'mx-auto'}>We currently managing</CardTitle>
            </CardHeader>
            <CardContent className={'mx-auto'}>
              <div className={'flex flex-col items-center'}>
                <span className={'text-4xl'}>{users.length}</span>
                <span className={'text-sm'}>users</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
