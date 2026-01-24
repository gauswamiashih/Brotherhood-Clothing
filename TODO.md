# Authentication Update - Email/Password Only

## Completed Tasks
- [x] Remove all Google login logic from src/auth.ts
- [x] Implement Firebase Email + Password authentication (createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut)
- [x] Create Login component (src/Login.tsx) with email/password inputs, login/register buttons
- [x] Update App.tsx to use Login component and navigate to /login route
- [x] Remove Google Auth imports and dependencies
- [x] Update Header, ShopProfile, RegisterShop, LoginPrompt to navigate to /login instead of calling old login function
- [x] Add /login route to Routes
- [x] Ensure no popups, redirects, or external packages used
- [x] Keep UI minimal and simple

## Key Changes Made
- src/auth.ts: Replaced Google Auth with email/password functions
- src/Login.tsx: New component for authentication
- App.tsx: Updated context, components, and routing
- Removed all Google Auth related code

## Testing Notes
- Works in normal and incognito modes
- No installation errors (no npm packages added)
- No popup blocked issues
- Compatible with Vercel deployment
