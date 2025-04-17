import { useEffect, useState } from 'react';
import { getUserActivity } from '@/services/get-user-activity';
import { UserActivity } from '@/types/user-activity';

type SuspiciousUser = {
  id: number;
  reason: string;
  daysWithHighLogins?: number;
  spikeDate?: string;
};

export function useSuspiciousUsers() {
  const [suspiciousUsers, setSuspiciousUsers] = useState<SuspiciousUser[]>([]);

  useEffect(() => {
    getUserActivity().then((data: UserActivity[]) => {
      const suspects: SuspiciousUser[] = [];

      data.forEach((user) => {
        const loginsByDay: Record<string, number> = {};

        user.loginHistory.forEach(({ date }) => {
          const day = new Date(date).toISOString().split('T')[0];
          loginsByDay[day] = (loginsByDay[day] || 0) + 1;
        });

        const loginsArray = Object.entries(loginsByDay).filter(([day]) => {
          const dayDate = new Date(day);
          const now = new Date();
          const diffDays =
            (now.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24);
          return diffDays <= 30;
        });

        const daysWithOver10 = loginsArray.filter(
          ([_, count]) => count > 10
        ).length;
        const allCounts = loginsArray.map(([_, count]) => count);
        const avg =
          allCounts.reduce((sum, n) => sum + n, 0) / (allCounts.length || 1);
        const spike = loginsArray.find(
          ([_, count]) => count >= 15 && count > avg * 3
        );

        if (daysWithOver10 >= 3) {
          suspects.push({
            id: user.id,
            reason: `High activity on ${daysWithOver10} days (>10 logins/day)`,
            daysWithHighLogins: daysWithOver10,
          });
        } else if (spike) {
          suspects.push({
            id: user.id,
            reason: `Spike: ${spike[1]} logins on ${spike[0]}`,
            spikeDate: spike[0],
          });
        }
      });

      setSuspiciousUsers(suspects);
    });
  }, []);

  return suspiciousUsers;
}
