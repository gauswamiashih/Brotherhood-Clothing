# Brotherhood Clothing - Backend & Database Setup Guide

This project is built with **React (Vite)** and uses **Firebase** for Authentication and Database (Firestore).

Follow these steps to set up your backend.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"**.
3. Name it `brotherhood-clothing` (or similar).
4. Disable Google Analytics (optional, for simplicity) and click **"Create project"**.

## 2. Register Your App

1. In the Project Overview, click the **Web icon (</>)**.
2. App nickname: `Brotherhood Web`.
3. Click **Register app**.
4. **Copy the `firebaseConfig` object keys**. You will need them for your environment variables.

## 3. Configure Environment Variables

1. Open (or create) `.env.local` in your project root.
2. Fill in the details from the step above:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note:** Do NOT commit `.env.local` to GitHub. It is already in `.gitignore`.

## 4. Enable Authentication

1. Go to **Build > Authentication** in the Firebase sidebar.
2. Click **"Get started"**.
3. Select **Google** from the Sign-in method list.
4. Click **Enable**.
5. Set a support email and click **Save**.

## 5. Create Cloud Firestore Database

1. Go to **Build > Firestore Database**.
2. Click **"Create database"**.
3. Location: Select a region close to your users (e.g., `asia-south1` for India).
4. Rules: Start in **Test mode** (we will update rules later).
5. Click **Create**.


## 6. Set up Cloud Storage (For Images/Videos)

Since this is a fashion app, you need to store shop logos and clothing images.

1. Go to **Build > Storage** in the Firebase sidebar.
2. Click **"Get started"**.
3. **Start in Test mode** (similar to Firestore).
4. Click **Next** and choose the same location as your database.
5. Click **Done**.

### Storage Security Rules

Update your Storage Rules to allow authenticated users to upload, but anyone to view:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow read access to everyone (public marketplace)
      allow read: if true;
      // Allow write access only to authenticated users (shop owners)
      allow write: if request.auth != null;
    }
  }
}
```

## 7. Firestore Data Structure (Schema)

This app uses two main collections: `users` and `shops`.

### Collection: `users`
Documents are indexed by `uid` (from Auth).

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | User UID |
| `name` | String | Display Name |
| `email` | String | Email Address |
| `picture` | String | Profile Photo URL |
| `role` | String | 'Visitor', 'Owner', or 'Admin' |
| `followedShopIds` | Array | List of Shop IDs followed by the user |
| `createdAt` | Number | Timestamp |

### Collection: `shops`
Documents are indexed by auto-generated IDs.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique Shop ID |
| `ownerId` | String | User UID of the owner |
| `shopName` | String | Name of the shop |
| `status` | String | 'Pending', 'Approved', 'Blocked' |
| `followersCount` | Number | Total followers |
| `media` | Array | Array of image objects `{ url, isPinned }` |
| `...` | ... | Other profile fields (bio, city, etc.) |

## 7. Security Rules (Production)

When you are ready for production, update your Firestore Rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Admin';
    }

    // Users
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isOwner(userId) || isAdmin();
    }

    // Shops
    match /shops/{shopId} {
      allow read: if true; // Public read access
      allow create: if isSignedIn(); // Registered users can apply
      allow update: if (resource.data.ownerId == request.auth.uid) || isAdmin();
      allow delete: if isAdmin();
    }
  }
}
```

## 8. Run the Application

Now that everything is configured:


```

## 9. Architecture & Best Practices (Q&A)

### How will you structure your Firestore collections for scalability?
We are using a **Root-Level Collection** strategy:
- **`users` Collection**: Stores user profiles. Indexed by Auth UID for O(1) access.
- **`shops` Collection**: Stores shop data.
- **Scaling Strategy**:
    - **Read Heaviness**: We duplicate some data (like `ownerName` in `shops`) to avoid extra reads (Denormalization).
    - **Relationships**: For now, `followedShopIds` is an array in the `users` doc.
    - **Future Scaling**: If a user follows >1,000 shops, we will move this to a sub-collection `users/{uid}/following/{shopId}` to avoid the 1MB document limit.

### What security rules will you implement?
We use a **Role-Based Access Control (RBAC)** model:
- **Authentication Check**: `request.auth != null` ensures only logged-in users can write.
- **Ownership Check**: `resource.data.ownerId == request.auth.uid` ensures users can only edit their *own* data.
- **Admin Privilege**: We check a `role` field on the user's profile to allow Admins global access.
- **Public Read**: Shops are publicly readable so they can be indexed by search engines and viewed by visitors.

### How will you integrate the SDKs?
- **Singleton Pattern**: We initialize `app`, `auth`, `db`, and `storage` once in `src/firebase.ts` and export them.
- **React Integration**:
    - **Auth**: Handled via `onAuthStateChanged` listener in `App.tsx` (AuthProvider).
    - **Data**: We use direct SDK calls (e.g., `getDocs`, `setDoc`) in our service functions.
    - **Type Safety**: All data returned from Firestore is cast to our TypeScript interfaces (`User`, `Shop`) to ensure type safety across the app.

