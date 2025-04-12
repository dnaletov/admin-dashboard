'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { SessionProvider } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { STATIC_PAGES } from '@/constants/static-pages';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Reset the error message on every attempt

    // Here you would typically handle authentication
    // For example: await signIn(email, password)

    // Call NextAuth's signIn function
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    // Simulate API call

    setIsLoading(false);

    if (res?.error) {
      setErrorMessage('Invalid email or password, please try again.');
    } else {
      // Redirect on successful login
      router.push(STATIC_PAGES.home);
    }
  };

  return (
    <SessionProvider>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-primary text-sm hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Show error message if credentials are invalid */}
              {errorMessage && (
                <div className="mt-2 text-sm text-red-500">{errorMessage}</div>
              )}
            </CardContent>
            <CardFooter className={'mt-4'}>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
              </Button>
            </CardFooter>
          </form>
          <div className="px-8 pb-6 text-center text-sm">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </Card>
      </div>
    </SessionProvider>
  );
}
