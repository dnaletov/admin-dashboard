import { useEffect, useState } from 'react';
import { UserActivity } from '@/types/user-activity';
import { getUserActivity } from '@/services/get-user-activity';

export function useUserActivity() {
  const [activity, setActivity] = useState<UserActivity[]>([]);

  useEffect(() => {
    getUserActivity().then((data) => {
      setActivity(data);
    });
  }, []);

  const totalLoginsByDate = activity.reduce(
    (acc, entry) => {
      entry.loginStats.forEach(({ date, count }) => {
        acc[date] = (acc[date] || 0) + count;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const totalLast30Days = Object.values(totalLoginsByDate).reduce(
    (sum, n) => sum + n,
    0
  );

  return {
    totalLast30Days,
    totalLoginsByDate,
  };
}
