# Angular Study Guide

An interactive Angular study guide with working examples for interview preparation.

## 🚀 Live Demo

Visit the deployed study guide: [https://dmanzer2.github.io/angular-study/](https://dmanzer2.github.io/angular-study/)

## 📚 What's Included

This study guide covers all major Angular interview topics with interactive examples:

- **Components & Architecture** - Component communication, lifecycle hooks
- **Services & Dependency Injection** - Injectable services, singleton pattern
- **Reactive Forms** - FormBuilder, validation, form controls
- **Routing & Navigation** - Router service, route guards
- **Lifecycle Hooks** - ngOnInit, ngOnChanges, ngOnDestroy
- **Directives & Pipes** - Custom directives and pipes
- **NgRx State Management** - Interactive demo of Store, Actions, Reducers, Effects
- **Testing** - Component testing strategies

## 🛠️ Development

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation
```bash
npm install
```

### Development server
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` to view the application.

### Building for production
```bash
npm run build:prod
```

## 📦 Deployment

This project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will:
1. Build the project with the correct base href for GitHub Pages
2. Deploy to the `gh-pages` branch
3. Update the live site automatically

### Manual GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "gh-pages" branch as source
4. Your site will be available at `https://username.github.io/angular-study/`

## 🔧 Troubleshooting

### NgRx Errors
If you encounter NgRx-related errors, the required packages are included:
```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
```

### Build Issues
For build issues, try:
```bash
# Clear Angular cache
rm -rf .angular
npm run build:prod
```
