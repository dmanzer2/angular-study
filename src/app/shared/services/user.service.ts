import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  // GET /users - Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // GET /users/:id - Fetch a single user
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // POST /users - Create a new user
  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // PUT /users/:id - Update an existing user
  updateUser(user: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  // DELETE /users/:id - Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
