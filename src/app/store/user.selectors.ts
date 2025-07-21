import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';
import { userAdapter } from './user.reducer';

// Feature selector
export const selectUserState = createFeatureSelector<UserState>('users');

// Entity selectors
const { selectAll, selectEntities, selectIds, selectTotal } = userAdapter.getSelectors();

// Users selectors
export const selectAllUsers = createSelector(selectUserState, selectAll);
export const selectUserEntities = createSelector(selectUserState, selectEntities);
export const selectUserIds = createSelector(selectUserState, selectIds);
export const selectUsersTotal = createSelector(selectUserState, selectTotal);

// UI state selectors
export const selectUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectSelectedUserId = createSelector(
  selectUserState,
  (state) => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

// Derived selectors
export const selectUsersCount = createSelector(
  selectAllUsers,
  (users) => users.length
);

export const selectUserById = (id: number) => createSelector(
  selectUserEntities,
  (entities) => entities[id]
);
