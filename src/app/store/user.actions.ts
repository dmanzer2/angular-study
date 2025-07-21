import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, CreateUserRequest, UpdateUserRequest } from '../shared/models/user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    // Load Users
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    // Load Single User
    'Load User': props<{ id: number }>(),
    'Load User Success': props<{ user: User }>(),
    'Load User Failure': props<{ error: string }>(),

    // Create User
    'Create User': props<{ user: CreateUserRequest }>(),
    'Create User Success': props<{ user: User }>(),
    'Create User Failure': props<{ error: string }>(),

    // Update User
    'Update User': props<{ user: UpdateUserRequest }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: string }>(),

    // Delete User
    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ id: number }>(),
    'Delete User Failure': props<{ error: string }>(),

    // UI Actions
    'Select User': props<{ id: number }>(),
    'Clear Selected User': emptyProps(),
    'Set Loading': props<{ loading: boolean }>(),
  }
});
