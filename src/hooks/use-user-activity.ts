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
          const day = new Date(date).toISOString().split('T')[0];
          acc[day] = (acc[day] || 0) + 1;
        });
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const loginChartData = Object.entries(totalLoginsByDate)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, count]) => ({ date, count }));

  const totalLast30Days = Object.values(totalLoginsByDate).reduce(
    (sum, n) => sum + n,
    0
  );
  return {
    totalLast30Days,
    loginChartData,
    userActivity,
  };
}
