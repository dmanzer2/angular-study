import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { User } from '../shared/models/user.model';
import { UserState } from './user.state';
import { UserActions } from './user.actions';

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null,
});

export const userReducer = createReducer(
  initialState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Single User
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(UserActions.loadUserSuccess, (state, { user }) =>
    userAdapter.upsertOne(user, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create User
  on(UserActions.createUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(UserActions.createUserSuccess, (state, { user }) =>
    userAdapter.addOne(user, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update User
  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(UserActions.updateUserSuccess, (state, { user }) =>
    userAdapter.updateOne({ id: user.id, changes: user }, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete User
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(UserActions.deleteUserSuccess, (state, { id }) =>
    userAdapter.removeOne(id, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // UI Actions
  on(UserActions.selectUser, (state, { id }) => ({
    ...state,
    selectedUserId: id,
  })),
  
  on(UserActions.clearSelectedUser, (state) => ({
    ...state,
    selectedUserId: null,
  })),
  
  on(UserActions.setLoading, (state, { loading }) => ({
    ...state,
    loading,
  }))
);
