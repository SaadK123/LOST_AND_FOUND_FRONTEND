# Lost & Found Frontend

AI-powered lost and found platform frontend built with Next.js 16.

## Features

- ✅ Beautiful landing page
- ✅ Interactive map picker (click to select location)
- ✅ AI-powered search with real-time results
- ✅ Match scoring and reasoning display
- ✅ Responsive design (works on mobile)
- ✅ Toast notifications
- 🔜 Auth0 integration
- 🔜 Stripe donations
- 🔜 Real-time messaging

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- React Leaflet (OpenStreetMap)
- Axios
- React Hot Toast

## Getting Started

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Features

### 1. Interactive Map Picker

Component: `components/map/InteractiveMapPicker.tsx`

- Click anywhere on the map to select location
- Automatic reverse geocoding (gets address from coordinates)
- Uses free OpenStreetMap data

### 2. AI Search

Component: `components/items/SearchForm.tsx`

- Rich form with validation
- Regional filtering (country/city/radius)
- Sends to backend AI service
- Displays results with match scores

### 3. Search Results

Page: `app/search/results/page.tsx`

- Shows AI-scored matches
- Displays match reasoning
- Contact finder buttons
- Responsive grid layout

## API Integration

All API calls in `lib/api/`:
- `client.ts` - Axios instance with interceptors
- `items.ts` - CRUD and search methods

## Deployment to Vercel

### Option 1: GitHub + Vercel Dashboard

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Complete frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lost-and-found-frontend.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your Railway backend URL
6. Deploy!

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## Environment Variables (Production)

```env
NEXT_PUBLIC_API_URL=https://your-backend-name.railway.app/api
```

## Status

🚀 Core Features: **COMPLETE**
- ✅ Landing page
- ✅ Interactive map
- ✅ AI search form
- ✅ Results display
- ✅ API integration

## Next Steps

1. Deploy backend to Railway → Get API URL
2. Update `.env.local` with production API URL
3. Deploy frontend to Vercel
4. Test end-to-end flow
5. Add Auth0 authentication
6. Add Stripe donations
7. Add real-time messaging
