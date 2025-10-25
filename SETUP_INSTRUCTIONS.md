# Streamify Setup Instructions

## Getting Your TMDB API Key (Free & Required)

Follow these steps to get your free API key from The Movie Database:

### Step 1: Create TMDB Account
1. Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Create a free account (takes 2 minutes)
3. Verify your email address

### Step 2: Get Your API Key
1. Login and go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Click on "Request an API Key"
3. Choose "Developer" option
4. Fill in the required information:
   - **Application Name**: Streamify (or any name)
   - **Application URL**: http://localhost:8080 (or your domain)
   - **Application Summary**: Movie browsing app for learning React
5. Accept the terms and submit
6. Copy your API Key (v3 auth)

### Step 3: Add API Key to Your Project

**Option A: Using Environment Variable (Recommended)**
1. Create a `.env` file in the project root
2. Add this line:
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   ```
3. Restart your dev server

**Option B: Direct Configuration**
1. Open `src/services/movieService.ts`
2. Find line 4: `const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_TMDB_API_KEY_HERE';`
3. Replace `'YOUR_TMDB_API_KEY_HERE'` with your actual API key:
   ```typescript
   const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'your_actual_key_here';
   ```

### Step 4: Run the App
```bash
npm run dev
```

The app should now work perfectly! 🎬

## Troubleshooting

**Still getting 401 errors?**
- Double-check your API key is correct
- Make sure you copied the "API Key (v3 auth)", not the v4 token
- Restart your development server after adding the key

**Need help?**
- TMDB API Docs: [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)
- The API key is completely free with no credit card required
