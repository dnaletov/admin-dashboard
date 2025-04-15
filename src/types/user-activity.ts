export type UserActivity = {
  id: number;
  loginHistory: {
    id: number;
    date: string;
    device: string;
    browser: string;
    ip: string;
  }[];
};
