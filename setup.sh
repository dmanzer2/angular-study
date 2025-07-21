#!/bin/bash

# Angular Interview Practice Setup Script
echo "🚀 Angular Interview Practice - NgRx & RESTful APIs"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "angular.json" ]; then
    echo "❌ Error: Please run this script from the Angular project root directory"
    exit 1
fi

echo "✅ Angular project detected"

# Check Node version
echo "📋 Checking Node.js version..."
node --version

# Check Angular CLI
echo "📋 Checking Angular CLI..."
ng version | head -10

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Install NgRx if not present
if ! npm list @ngrx/store &> /dev/null; then
    echo "📦 Installing NgRx packages..."
    npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools --legacy-peer-deps
fi

echo ""
echo "🎯 What's been implemented:"
echo "- NgRx store with actions, reducers, effects, selectors"
echo "- RESTful API service using JSONPlaceholder"
echo "- User management CRUD operations" 
echo "- Modern Angular standalone components"
echo "- Reactive forms with validation"
echo "- Error handling and loading states"
echo ""
echo "📁 Key files to review:"
echo "- src/app/store/ (NgRx implementation)"
echo "- src/app/shared/services/user.service.ts (API calls)"
echo "- src/app/features/users/ (Components)"
echo "- INTERVIEW_GUIDE.md (Detailed explanation)"
echo ""
echo "🚀 To start the development server:"
echo "   ng serve"
echo ""
echo "🎤 This project covers key interview topics:"
echo "- NgRx state management patterns"
echo "- RESTful API integration"
echo "- RxJS operators and observables"
echo "- Angular best practices"
echo "- TypeScript and type safety"
echo ""
echo "✨ Ready for interview practice!"
