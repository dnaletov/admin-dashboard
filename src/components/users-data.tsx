'use client';

import { MoreHorizontal, Search } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useUsers } from '@/hooks/use-users';
import { useState } from 'react';
import { User } from '@/types/user';
import UserModal from './user-modal';
import LoginTrendChart from './login-trend-chart';
import { useUserActivity } from '@/hooks/use-user-activity';

export default function UsersData() {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { totalLast30Days, totalLoginsByDate } = useUserActivity();

  const handleSave = (userData: Omit<User, 'id'>, id?: number) => {
    if (id) {
      updateUser(id, userData);
    } else {
      addUser(userData);
    }
  };

  const filteredUsers = users.filter((user) =>
    [user.firstName, user.lastName, user.email]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Step 1: Separate online and offline users from the filtered users
  const onlineUsers = filteredUsers.filter((user) => user.status === 'online');

  // Step 2: Sort online users by last active time
  const sortedOnlineUsers = onlineUsers.sort((a, b) => {
    const aLastActivity = new Date(a.lastActive).getTime();
    const bLastActivity = new Date(b.lastActive).getTime();
    return bLastActivity - aLastActivity;
  });

  // Step 3: Get the offline users and sort them by last active time
  const offlineUsers = filteredUsers.filter((user) => user.status !== 'online');

  // Sort offline users by last active time
  const sortedOfflineUsers = offlineUsers.sort((a, b) => {
    const aLastActivity = new Date(a.lastActive).getTime();
    const bLastActivity = new Date(b.lastActive).getTime();
    return bLastActivity - aLastActivity;
  });

  // Step 4: Combine online and offline users
  const sortedUsers = [...sortedOnlineUsers, ...sortedOfflineUsers];

  // Step 5: Limit the number of displayed users to 10
  const displayedUsers =
    sortedUsers.length >= 10 ? sortedUsers.slice(0, 10) : sortedUsers;

  if (loading) return <p className="mt-10 text-center">Loading users...</p>;

  return (
    <div>
      <h1>Users analytics</h1>
      <div className={'mx-auto my-7 flex max-w-4xl gap-4'}>
        <Card>
          <CardTitle className={'mx-auto'}>
            <p className="text-lg font-semibold">Total Users</p>
          </CardTitle>
          <CardContent className={'mx-auto'}>
            <p className="text-2xl font-bold">{users.length}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Updated xx minutes ago</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={'mx-auto'}>
              <p className="text-lg font-semibold">New Users</p>
            </CardTitle>
          </CardHeader>
          <CardContent className={'mx-auto'}>
            <p className="text-2xl font-bold">56</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Updated xx minutes ago</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className={'mx-auto'}>
              <p className="text-lg font-semibold">Total login past 30 days</p>
            </CardTitle>
          </CardHeader>
          <CardContent className={'mx-auto'}>
            <p className="text-2xl font-bold">{totalLast30Days}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Updated xx minutes ago</p>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card className="mx-auto w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-2xl">
              Active Users
              <Button
                className="cursor-pointer"
                onClick={() => {
                  setEditingUser(null);
                  setModalOpen(true);
                }}
              >
                Add User
              </Button>
            </CardTitle>
            <CardDescription>
              View the last 10 active users in your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {displayedUsers.map((user) => (
                <div
                  key={user.id}
                  className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <Link
                        href={`/users/${user.id}`}
                        className="text-primary font-medium hover:underline"
                      >
                        {user.firstName} {user.lastName}
                      </Link>
                      <div className="text-muted-foreground text-sm">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden flex-col items-end md:flex">
                      <Badge
                        variant={
                          user.status === 'online'
                            ? 'default'
                            : user.status === 'away'
                              ? 'destructive'
                              : 'secondary'
                        }
                        className="mb-1"
                      >
                        {user.status}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="hidden md:inline-flex">
                      {user.role}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link
                            href={`/users/${user.id}`}
                            className="flex w-full"
                          >
                            View profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            queueMicrotask(() => {
                              // queueMicrotask() is used here to delay the state updates (setEditingUser and setModalOpen) until the next event loop tick.
                              setEditingUser(user);
                              setModalOpen(true);
                            });
                          }}
                        >
                          Edit user
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to delete ${user.firstName}?`
                              )
                            ) {
                              deleteUser(user.id);
                            }
                          }}
                        >
                          Delete user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              <Card>
                <CardHeader>
                  <CardTitle>Login Trend past 30 days</CardTitle>
                </CardHeader>
                <CardContent>
                  <LoginTrendChart
                    data={Object.entries(totalLoginsByDate).map(
                      ([date, count]) => ({
                        date,
                        count,
                      })
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      <UserModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleSave}
        user={editingUser}
      />
    </div>
  );
}
