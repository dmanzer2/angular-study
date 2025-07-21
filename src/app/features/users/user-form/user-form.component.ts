import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User, CreateUserRequest } from '../../../shared/models/user.model';
import { UserActions } from '../../../store/user.actions';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="user-form-container">
      <h3>{{ editMode ? 'Edit User' : 'Add New User' }}</h3>
      
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name *</label>
          <input
            type="text"
            id="name"
            formControlName="name"
            class="form-control"
            [class.error]="userForm.get('name')?.invalid && userForm.get('name')?.touched"
          />
          <div class="error-text" *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="username">Username *</label>
          <input
            type="text"
            id="username"
            formControlName="username"
            class="form-control"
            [class.error]="userForm.get('username')?.invalid && userForm.get('username')?.touched"
          />
          <div class="error-text" *ngIf="userForm.get('username')?.invalid && userForm.get('username')?.touched">
            Username is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input
            type="email"
            id="email"
            formControlName="email"
            class="form-control"
            [class.error]="userForm.get('email')?.invalid && userForm.get('email')?.touched"
          />
          <div class="error-text" *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
            <div *ngIf="userForm.get('email')?.errors?.['required']">Email is required</div>
            <div *ngIf="userForm.get('email')?.errors?.['email']">Please enter a valid email</div>
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            formControlName="phone"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="website">Website</label>
          <input
            type="url"
            id="website"
            formControlName="website"
            class="form-control"
          />
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" (click)="onCancel()">
            Cancel
          </button>
          <button 
            type="submit" 
            class="btn btn-primary" 
            [disabled]="userForm.invalid"
          >
            {{ editMode ? 'Update' : 'Create' }} User
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<CreateUserRequest>();
  @Output() cancel = new EventEmitter<void>();

  userForm: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit() {
    if (this.user) {
      this.editMode = true;
      this.userForm.patchValue(this.user);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      website: ['']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData: CreateUserRequest = this.userForm.value;
      
      if (this.editMode && this.user) {
        // Update existing user
        this.store.dispatch(UserActions.updateUser({ 
          user: { ...userData, id: this.user.id }
        }));
      } else {
        // Create new user
        this.store.dispatch(UserActions.createUser({ user: userData }));
      }
      
      this.save.emit(userData);
      this.resetForm();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.resetForm();
  }

  private resetForm() {
    this.userForm.reset();
    this.editMode = false;
    this.user = null;
  }
}
