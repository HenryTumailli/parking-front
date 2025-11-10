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
  first_name: string;
  last_name: string;
  email: string;
  groups: string;
  tenant: number;
  date_joined: string;
  is_active: boolean;
}