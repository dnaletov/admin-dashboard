export type UserActivity = {
  id: number;
  firstName: string;
  lastName: string;
  lastActive: string;
  loginStats: {
    date: string;
    count: number;
  }[];
};
