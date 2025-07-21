import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CapitalizeWordsPipe } from './pipes/capitalize-words.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { LifecycleDemoComponent } from './components/lifecycle-demo.component';
import { NgRxDemoComponent } from './components/ngrx-demo.component';

@Component({
  selector: 'app-study-guide',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    TruncatePipe,
    CapitalizeWordsPipe,
    TimeAgoPipe,
    HighlightDirective,
    LifecycleDemoComponent,
    NgRxDemoComponent
  ],
  templateUrl: './study-guide.component.html',
  styleUrl: './study-guide.component.sass'
})
export class StudyGuideComponent implements OnInit, OnDestroy {
  activeSection = 'components';

  // Reactive Forms properties
  userForm!: FormGroup;
  submittedUser: any = null;

  // Routing properties
  currentRoute = '/study-guide';
  queryParams = {};
  private routeSubscription?: Subscription;

  // Route Guards properties
  isAuthenticated = false;
  guardMessage = '';

  // Lifecycle properties
  showLifecycleDemo = false;
  lifecycleInputData = 'Initial data';
  lifecycleEvents: Array<{timestamp: string, name: string, data: string}> = [];

  // Directives & Pipes properties
  selectedColor = 'yellow';
  longText = 'This is a very long text that needs to be truncated to show how custom pipes work in Angular applications.';
  sampleText = 'hello world from angular';
  createdDate = new Date(Date.now() - 86400000); // 1 day ago
  modifiedDate = new Date(Date.now() - 3600000); // 1 hour ago

  // Testing properties
  counter = 0;
  testResults: Array<{name: string, passed: boolean, message: string}> = [];

  private sections = {
    components: { 
      title: 'Component Architecture', 
      description: '@Component, @Input/@Output, Template Binding' 
    },
    services: { 
      title: 'Services & DI', 
      description: '@Injectable, Dependency Injection, Service Communication' 
    },
    forms: { 
      title: 'Reactive Forms', 
      description: 'FormBuilder, Validators, Form Handling' 
    },
    routing: { 
      title: 'Routing & Guards', 
      description: 'RouterModule, Navigation, Route Guards' 
    },
    lifecycle: { 
      title: 'Lifecycle Hooks', 
      description: 'ngOnInit, ngOnDestroy, Component Lifecycle' 
    },
    directives: { 
      title: 'Directives & Pipes', 
      description: 'Structural Directives, Custom Pipes' 
    },
    ngrx: { 
      title: 'NgRx State Management', 
      description: 'Store, Actions, Reducers, Effects, Selectors' 
    },
    testing: { 
      title: 'Testing (Bonus)', 
      description: 'Jasmine, TestBed, Unit Testing' 
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.subscribeToRoute();
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Form methods
  initializeForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.submittedUser = this.userForm.value;
      this.userForm.reset();
    }
  }

  // Routing methods
  subscribeToRoute() {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });
  }

  navigateToSection(section: string) {
    this.setActiveSection(section);
    this.currentRoute = `/study-guide?section=${section}`;
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }

  // Route Guards methods
  tryProtectedRoute() {
    if (this.isAuthenticated) {
      this.guardMessage = '✅ Access granted! You can navigate to protected routes.';
    } else {
      this.guardMessage = '❌ Access denied! Please authenticate first.';
    }
    
    setTimeout(() => {
      this.guardMessage = '';
    }, 3000);
  }

  // Lifecycle methods
  toggleLifecycleDemo() {
    this.showLifecycleDemo = !this.showLifecycleDemo;
    if (this.showLifecycleDemo) {
      this.addLifecycleEvent('ngOnInit', 'Component created');
    } else {
      this.addLifecycleEvent('ngOnDestroy', 'Component destroyed');
    }
  }

  onLifecycleEvent(event: any) {
    this.addLifecycleEvent(event.name, event.data);
  }

  addLifecycleEvent(name: string, data: string) {
    this.lifecycleEvents.unshift({
      timestamp: new Date().toLocaleTimeString(),
      name,
      data
    });
  }

  clearLifecycleLog() {
    this.lifecycleEvents = [];
  }

  // Testing methods
  incrementCounter() {
    this.counter++;
  }

  decrementCounter() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  getCounterStatus(): string {
    if (this.counter === 0) return 'Zero';
    if (this.counter < 5) return 'Low';
    if (this.counter < 10) return 'Medium';
    return 'High';
  }

  runTest(testType: string) {
    switch (testType) {
      case 'increment':
        const initialCount = this.counter;
        this.incrementCounter();
        this.addTestResult('Increment Test', this.counter === initialCount + 1, `Expected ${initialCount + 1}, got ${this.counter}`);
        break;
      
      case 'decrement':
        const beforeDecrement = this.counter;
        this.decrementCounter();
        const expectedAfterDecrement = beforeDecrement > 0 ? beforeDecrement - 1 : 0;
        this.addTestResult('Decrement Test', this.counter === expectedAfterDecrement, `Expected ${expectedAfterDecrement}, got ${this.counter}`);
        break;
      
      case 'boundary':
        const originalCounter = this.counter;
        this.counter = 0;
        this.decrementCounter();
        const boundaryPassed = this.counter === 0;
        this.counter = originalCounter;
        this.addTestResult('Boundary Test', boundaryPassed, 'Counter should not go below 0');
        break;
      
      case 'status':
        const status = this.getCounterStatus();
        const expectedStatus = this.counter === 0 ? 'Zero' : this.counter < 5 ? 'Low' : this.counter < 10 ? 'Medium' : 'High';
        this.addTestResult('Status Test', status === expectedStatus, `Expected ${expectedStatus}, got ${status}`);
        break;
    }
  }

  addTestResult(name: string, passed: boolean, message: string) {
    this.testResults.unshift({ name, passed, message });
    if (this.testResults.length > 10) {
      this.testResults = this.testResults.slice(0, 10);
    }
  }

  getSectionEntries() {
    return Object.entries(this.sections).map(([key, value]) => ({ key, value }));
  }

  getSectionInfo(key: string) {
    return this.sections[key as keyof typeof this.sections] || { title: 'Unknown', description: '' };
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
