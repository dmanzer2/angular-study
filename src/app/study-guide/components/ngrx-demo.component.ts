import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SimpleState {
  count: number;
  items: string[];
  loading: boolean;
}

// Simple action types (for demonstration)
type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' } 
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

@Component({
  selector: 'app-ngrx-demo',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./ngrx-demo.component.css'],
  template: `
    <div class="ngrx-demo">
      <h3>NgRx State Management Demo (Simplified)</h3>
      
      <div class="state-display">
        <h4>Current State:</h4>
        <pre>{{ state | json }}</pre>
      </div>

      <div class="actions">
        <h4>Dispatch Actions:</h4>
        <button (click)="dispatch({type: 'INCREMENT'})" class="btn">
          Increment Count
        </button>
        <button (click)="dispatch({type: 'DECREMENT'})" class="btn">
          Decrement Count
        </button>
        <button (click)="addRandomItem()" class="btn">
          Add Random Item
        </button>
        <button (click)="toggleLoading()" class="btn">
          Toggle Loading: {{ state.loading ? 'Stop' : 'Start' }}
        </button>
      </div>

      <div class="actions-log">
        <h4>Action History:</h4>
        <div class="log-container">
          <div 
            *ngFor="let action of actionHistory; let i = index" 
            class="action-entry"
            [class.recent]="i < 3"
          >
            <span class="timestamp">{{ action.timestamp }}</span>
            <span class="action-type">{{ action.type }}</span>
            <span class="payload" *ngIf="action.payload">
              Payload: {{ action.payload }}
            </span>
          </div>
        </div>
        <button (click)="clearHistory()" class="btn btn-secondary">
          Clear History
        </button>
      </div>

      <div class="concepts">
        <h4>NgRx Concepts Demonstrated:</h4>
        <ul>
          <li><strong>State:</strong> Single source of truth (the state object above)</li>
          <li><strong>Actions:</strong> Plain objects with type and optional payload</li>
          <li><strong>Reducer:</strong> Pure function that takes state + action → new state</li>
          <li><strong>Store:</strong> Holds state and dispatches actions (simulated here)</li>
          <li><strong>Immutability:</strong> State is never mutated, always replaced</li>
        </ul>
      </div>

      <div class="real-ngrx-code">
        <h4>Real NgRx Code Examples:</h4>
        
        <h5>1. Actions (user.actions.ts):</h5>
        <pre><code>import &#123; createActionGroup, props &#125; from '&#64;ngrx/store';

export const UserActions = createActionGroup(&#123;
  source: 'User',
  events: &#123;
    'Load Users': props&lt;&#123; loading: boolean &#125;&gt;(),
    'Load Users Success': props&lt;&#123; users: User[] &#125;&gt;(),
    'Load Users Failure': props&lt;&#123; error: string &#125;&gt;()
  &#125;
&#125;);</code></pre>

        <h5>2. Reducer (user.reducer.ts):</h5>
        <pre><code>import &#123; createReducer, on &#125; from '&#64;ngrx/store';
import &#123; UserActions &#125; from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => (&#123;
    ...state,
    loading: true
  &#125;)),
  on(UserActions.loadUsersSuccess, (state, &#123; users &#125;) => (&#123;
    ...state,
    users,
    loading: false
  &#125;))
);</code></pre>

        <h5>3. Effects (user.effects.ts):</h5>
        <pre><code>import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; Actions, createEffect, ofType &#125; from '&#64;ngrx/effects';
import &#123; map, catchError, switchMap &#125; from 'rxjs/operators';

&#64;Injectable()
export class UserEffects &#123;
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess(&#123; users &#125;)),
          catchError(error => [UserActions.loadUsersFailure(&#123; error &#125;)])
        )
      )
    )
  );
&#125;</code></pre>

        <h5>4. Selectors (user.selectors.ts):</h5>
        <pre><code>import &#123; createFeatureSelector, createSelector &#125; from '&#64;ngrx/store';

export const selectUserState = createFeatureSelector&lt;UserState&gt;('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);</code></pre>

        <h5>5. Using in Component:</h5>
        <pre><code>export class UserComponent &#123;
  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectUsersLoading);

  constructor(private store: Store) &#123;&#125;

  ngOnInit() &#123;
    this.store.dispatch(UserActions.loadUsers());
  &#125;
&#125;</code></pre>
      </div>
    </div>
  `
})
export class NgRxDemoComponent {
  // Simulated NgRx state
  state: SimpleState = {
    count: 0,
    items: ['Initial Item'],
    loading: false
  };

  actionHistory: Array<{
    timestamp: string;
    type: string;
    payload?: any;
  }> = [];

  // Simple reducer function (for demonstration)
  private reducer(state: SimpleState, action: Action): SimpleState {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      
      case 'DECREMENT':
        return { ...state, count: Math.max(0, state.count - 1) };
      
      case 'ADD_ITEM':
        return { 
          ...state, 
          items: [...state.items, action.payload] 
        };
      
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      
      default:
        return state;
    }
  }

  // Simulate store dispatch
  dispatch(action: Action) {
    // Log the action
    this.actionHistory.unshift({
      timestamp: new Date().toLocaleTimeString(),
      type: action.type,
      payload: (action as any).payload
    });

    // Keep only last 20 actions
    if (this.actionHistory.length > 20) {
      this.actionHistory = this.actionHistory.slice(0, 20);
    }

    // Update state using reducer
    this.state = this.reducer(this.state, action);
  }

  addRandomItem() {
    const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    this.dispatch({ type: 'ADD_ITEM', payload: `${randomItem} ${Date.now()}` });
  }

  toggleLoading() {
    this.dispatch({ type: 'SET_LOADING', payload: !this.state.loading });
  }

  clearHistory() {
    this.actionHistory = [];
  }
}
