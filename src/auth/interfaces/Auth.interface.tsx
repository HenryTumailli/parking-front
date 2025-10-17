export interface Login {
  username: string;
  password: string;
};

export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  tenant: number;
  date_joined: string;
  is_active: boolean;
}