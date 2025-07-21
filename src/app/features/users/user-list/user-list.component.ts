import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { UserActions } from '../../../store/user.actions';
import {
  selectAllUsers,
  selectUsersLoading,
  selectUsersError,
  selectSelectedUserId
} from '../../../store/user.selectors';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-list-container">
      <div class="header">
        <h2>Users</h2>
        <button class="btn btn-primary" (click)="onRefresh()" [disabled]="loading$ | async">
          {{ (loading$ | async) ? 'Loading...' : 'Refresh' }}
        </button>
      </div>

      <div class="error-message" *ngIf="error$ | async as error">
        Error: {{ error }}
      </div>

      <div class="user-grid" *ngIf="users$ | async as users">
        <div
          class="user-card"
          *ngFor="let user of users; trackBy: trackByUserId"
          [class.selected]="(selectedUserId$ | async) === user.id"
          (click)="onSelectUser(user.id)"
        >
          <h3>{{ user.name }}</h3>
          <div class="email">{{ user.email }}</div>
          <div class="username">{{ '@' + user.username }}</div>
          <div class="phone">{{ user.phone }}</div>
          <div class="website">{{ user.website }}</div>
          <div class="user-actions">
            <button class="btn btn-sm btn-edit" (click)="onEditUser(user.id); $event.stopPropagation()">
              Edit
            </button>
            <button class="btn btn-sm btn-delete" (click)="onDeleteUser(user.id); $event.stopPropagation()">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="!(users$ | async)?.length && !(loading$ | async)">
        No users found. Click refresh to load users.
      </div>
    </div>
  `,
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedUserId$: Observable<number | null>;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    this.error$ = this.store.select(selectUsersError);
    this.selectedUserId$ = this.store.select(selectSelectedUserId);
  }

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
  }

  onRefresh() {
    this.store.dispatch(UserActions.loadUsers());
  }

  onSelectUser(id: number) {
    this.store.dispatch(UserActions.selectUser({ id }));
  }

  onEditUser(id: number) {
    // This would typically navigate to an edit form
    console.log('Edit user:', id);
    // For demo, just select the user
    this.onSelectUser(id);
  }

  onDeleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(UserActions.deleteUser({ id }));
    }
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
