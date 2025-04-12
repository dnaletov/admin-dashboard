'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from './button';
import { STATIC_PAGES } from '@/constants/static-pages';

export function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: STATIC_PAGES.login });
  };

  return (
    <Button onClick={handleLogout} className="flex cursor-pointer items-center">
      <LogOut className="mr-2" />
      <span>Logout</span>
    </Button>
  );
}
