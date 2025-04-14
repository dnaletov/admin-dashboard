export type UserActivity = {
  id: number;
  firstName: string;
  lastName: string;
  loginStats: {
    date: string;
    count: number;
  }[];
};
