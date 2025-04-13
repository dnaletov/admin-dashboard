export type LoginStats = {
  date: string;
  count: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role: string;
  status: string;
  lastActive: string;
  loginStats: LoginStats[];
};
