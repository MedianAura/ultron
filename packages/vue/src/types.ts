import { User } from '@/models/user.model'

export interface RootState {
  version: string;
  login: any;
}

export interface LoginState {
  user: User;
  isLogged: boolean;
  error: boolean;
}
