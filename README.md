# Refreshed Vue Project

This project was created as part of my Vue.js learning and practice.

## Topics Covered

- Vue Components
- Props and Custom Events
- Vue Router
- Dynamic Routes and Route Parameters
- Nested Routes
- Programmatic Navigation
- Navigation Guards
- Vuex State Management
- Vuex Modules
- State, Getters, Mutations, and Actions
- Authentication
- Protected Routes
- Coach Registration
- Contact Requests
- Form Handling and Validation
- Reusable UI Components

## Project Structure

- `components/` - reusable Vue components
- `components/ui/` - reusable UI components
- `pages/` - route-level components
- `store/` - Vuex store and modules
- `router.js` - Vue Router configuration

The Vuex store contains separate modules for coaches, requests, and authentication.

## Purpose

The purpose of this project is to practice how different Vue concepts work together in a larger application, especially routing, state management, authentication, forms, and component communication.

## Running the Project

Install dependencies:

`npm install`

Start the development server:

`npm run serve`

## Firebase Realtime Database Rules

The project sends the Firebase ID token with protected requests. Apply the
rules from `firebase.database.rules.json` in the Firebase Realtime Database
Rules tab so the database also enforces the protection server-side:

- Coaches can be viewed publicly, but only authenticated users can register a coach.
- Contact requests can be submitted publicly, but only authenticated users can read them.
