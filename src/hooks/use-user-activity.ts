import { useEffect, useState } from 'react';
import { UserActivity } from '@/types/user-activity';
import { getUserActivity } from '@/services/get-user-activity';

export function useUserActivity(userId?: number) {
  const [activity, setActivity] = useState<UserActivity[]>([]);

  useEffect(() => {
    getUserActivity().then((data) => {
      setActivity(data);
    });
  }, []);

  const userActivity = userId
    ? (activity.find((entry) => entry.id === userId)?.loginHistory ?? [])
    : [];

  const totalLoginsByDate = activity.reduce(
    (acc, entry) => {
      if (Array.isArray(entry.loginHistory)) {
        entry.loginHistory.forEach(({ date }) => {
          acc[date] = (acc[date] || 0) + 1;
        });
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const totalLast30Days = Object.values(totalLoginsByDate).reduce(
    (sum, n) => sum + n,
    0
  );
  console.log(userActivity);
  console.log(totalLoginsByDate);
  console.log(totalLast30Days);
  return {
    totalLast30Days,
    totalLoginsByDate,
    userActivity,
  };
}
