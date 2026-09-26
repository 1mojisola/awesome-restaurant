# Awesome Restaurant Website

React + Vite restaurant website with a browser-based owner dashboard.

## Features
- Public restaurant website
- WhatsApp and call buttons
- Menu, services and gallery management
- Theme/template switcher
- Celebration banner/section
- Custom sections
- SEO title/description fields
- Owner dashboard at `/admin`
- Vercel SPA rewrite included

## Important admin limitation
This version stores dashboard changes in the browser's `localStorage`. That means edits are saved on the device/browser where they were made. The password is also client-side and is NOT a secure production authentication system.

For a real client handoff where the owner can log in from any device and changes sync everywhere, connect the dashboard to Supabase/Firebase (auth + database + storage).

## Before deployment
Open `src/main.jsx` and change:

`const ADMIN_PASSWORD = 'CHANGE_ME_2026';`

to your own temporary owner password. This is only a preview/demo login until a real auth backend is added.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints, then `/admin` for the owner dashboard.

## Build

```bash
npm run build
npm run preview
```

## GitHub → Vercel

1. Create a new GitHub repository.
2. From this project folder:

```bash
git init
git add .
git commit -m "Build Awesome Restaurant website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/awesome-restaurant.git
git push -u origin main
```

3. In Vercel, Add New → Project → Import the GitHub repository.
4. Framework: Vite (auto-detected).
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

After deployment, test `/` and `/admin`.
