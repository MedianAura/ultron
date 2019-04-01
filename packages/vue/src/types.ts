import { User } from '@/models/user.model';

export interface IRootState {
  version: string;
  login: any;
}

export interface ILoginState {
  user: User;
  isLogged: boolean;
  error: boolean;
}
