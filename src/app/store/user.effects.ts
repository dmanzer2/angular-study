import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { UserService } from '../shared/services/user.service';
import { UserActions } from './user.actions';

// Functional effects - more compatible with SSR
export const loadUsersEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(() =>
        userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadUserEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(({ id }) =>
        userService.getUserById(id).pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError((error) =>
            of(UserActions.loadUserFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const createUserEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(UserActions.createUser),
      exhaustMap(({ user }) =>
        userService.createUser(user).pipe(
          map((createdUser) => UserActions.createUserSuccess({ user: createdUser })),
          catchError((error) =>
            of(UserActions.createUserFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const updateUserEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ user }) =>
        userService.updateUser(user).pipe(
          map((updatedUser) => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError((error) =>
            of(UserActions.updateUserFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const deleteUserEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(UserActions.deleteUser),
      exhaustMap(({ id }) =>
        userService.deleteUser(id).pipe(
          map(() => UserActions.deleteUserSuccess({ id })),
          catchError((error) =>
            of(UserActions.deleteUserFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
