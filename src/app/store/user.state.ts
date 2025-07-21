import { EntityState } from '@ngrx/entity';
import { User } from '../shared/models/user.model';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  users: UserState;
}
