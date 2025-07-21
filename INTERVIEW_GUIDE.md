# Angular Interview Practice - NgRx & RESTful APIs

This Angular application demonstrates key concepts you'll need for interviews:

## 🎯 **What's Implemented**

### **1. NgRx State Management**
- **Actions** (`src/app/store/user.actions.ts`) - Define all user operations
- **Reducer** (`src/app/store/user.reducer.ts`) - Handle state changes with EntityAdapter
- **Effects** (`src/app/store/user.effects.ts`) - Handle side effects (API calls) using modern functional effects
- **Selectors** (`src/app/store/user.selectors.ts`) - Query the state efficiently
- **State** (`src/app/store/user.state.ts`) - Type-safe state interfaces

### **2. RESTful API Operations**
- **GET** `/users` - Fetch all users
- **GET** `/users/:id` - Fetch single user
- **POST** `/users` - Create new user  
- **PUT** `/users/:id` - Update existing user
- **DELETE** `/users/:id` - Delete user

### **3. Modern Angular Architecture**
- **Standalone Components** - No need for NgModule
- **Functional Effects** - Modern NgRx effects pattern for better SSR compatibility
- **Reactive Forms** - Type-safe form handling
- **Observables & RxJS** - Reactive programming patterns
- **TypeScript Models** - Strong typing throughout
- **Component Communication** - Input/Output patterns

### **4. Components Structure**
```
src/app/
├── features/users/
│   ├── user-list/          # Display users in a grid
│   ├── user-form/          # Create/edit user form
│   └── users.component.ts  # Main container component
├── shared/
│   ├── models/user.model.ts # TypeScript interfaces
│   └── services/user.service.ts # HTTP API service
└── store/                  # NgRx store files
    ├── user.actions.ts
    ├── user.effects.ts
    ├── user.reducer.ts
    ├── user.selectors.ts
    └── user.state.ts
```

## 🚀 **Getting Started**

### **Prerequisites**
```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools --legacy-peer-deps
```

### **Run the Application**
```bash
ng serve
```

### **Key Files to Review**

1. **App Configuration** (`src/app/app.config.ts`)
   - NgRx store setup
   - HTTP client configuration
   - Store DevTools integration

2. **User Service** (`src/app/shared/services/user.service.ts`)
   - All HTTP operations
   - Uses JSONPlaceholder API for testing

3. **NgRx Store** (`src/app/store/`)
   - Complete CRUD operations
   - Error handling
   - Loading states

## 🎤 **Interview Topics Covered**

### **NgRx Concepts**
- **Actions** - What happened?
- **Reducers** - How state changes
- **Effects** - Side effects management
- **Selectors** - Derived state
- **EntityAdapter** - Normalized state for collections

### **RxJS Operators**
- `map` - Transform data
- `exhaustMap` - Ignore new emissions until current completes
- `mergeMap` - Handle multiple concurrent operations  
- `catchError` - Error handling
- `of` - Create observables

### **HTTP Best Practices**
- **RESTful conventions**
- **Error handling**
- **Type safety**
- **Observables vs Promises**

### **Angular Patterns**
- **Smart vs Dumb components**
- **OnPush change detection**
- **Reactive forms**
- **Standalone components**

## 🔧 **Key Interview Questions & Answers**

### **"How does NgRx work?"**
NgRx implements the Redux pattern:
1. **Actions** trigger state changes
2. **Reducers** compute new state 
3. **Effects** handle side effects
4. **Selectors** query state efficiently
5. **Store** holds the single source of truth

### **"When would you use NgRx?"**
- Complex state management
- Multiple components need same data
- Time-travel debugging needed
- Undo/redo functionality
- Caching strategies

### **"What are Functional Effects?"**
- Modern NgRx pattern introduced in v15+
- Better compatibility with SSR and standalone apps
- Uses `inject()` function for dependency injection
- More declarative and easier to test
- Eliminates class-based boilerplate

### **"What's EntityAdapter?"**
- Normalizes collections by ID
- Provides CRUD operations
- Optimizes performance
- Reduces boilerplate

### **"Explain the data flow"**
1. Component dispatches action
2. Effect catches action → makes HTTP call
3. Success/failure action dispatched
4. Reducer updates state
5. Selector notifies components
6. UI updates reactively

## 🎯 **Demo Features**

1. **Load Users** - Fetch from API
2. **Create User** - Add new user
3. **Update User** - Edit existing user
4. **Delete User** - Remove user
5. **Select User** - Show details
6. **Error Handling** - Display errors
7. **Loading States** - Show progress

## 🛠 **Technologies Used**

- **Angular 20** - Latest framework features
- **NgRx 19** - State management
- **RxJS** - Reactive programming  
- **TypeScript** - Type safety
- **JSONPlaceholder** - Mock API
- **Standalone Components** - Modern architecture

This implementation showcases production-ready patterns and best practices that demonstrate deep Angular and NgRx knowledge for technical interviews.
