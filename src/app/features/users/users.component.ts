import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserListComponent, UserFormComponent],
  template: `
    <div class="users-container">
      <h1>User Management</h1>
      
      <div class="user-form-section">
        <h2>Add New User</h2>
        <app-user-form (save)="onSaveUser($event)" (cancel)="onCancelForm()"></app-user-form>
      </div>
      
      <div class="user-list-section">
        <app-user-list></app-user-list>
      </div>
    </div>
  `,
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  onSaveUser(userData: any) {
    console.log('User data received:', userData);
    // The user form component handles dispatching the action
  }

  onCancelForm() {
    console.log('Form cancelled');
    // Handle form cancellation if needed
  }
}
