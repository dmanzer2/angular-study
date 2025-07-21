import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/study-guide',
    pathMatch: 'full'
  },
  {
    path: 'study-guide',
    loadComponent: () => import('./study-guide/study-guide.component').then(c => c.StudyGuideComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/users.component').then(c => c.UsersComponent)
  }
];
