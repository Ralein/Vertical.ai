# Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications, and it's free for personal projects.

### Steps:

1. **Push your code to GitHub** (Already done!)
   ```bash
   git push origin main
   ```

2. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

3. **Import your repository**
   - Click "Add New Project"
   - Select your GitHub repository: `Ralein/Vertical.ai`
   - Click "Import"

4. **Configure the project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `sales-dashboard` (if it's in a subdirectory)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for the build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Environment Variables
No environment variables are needed for this project since it uses local JSON files.

### Automatic Deployments
Every push to the `main` branch will automatically trigger a new deployment.

## Alternative: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

## Local Production Build

To test the production build locally:

```bash
npm run build
npm start
```

The app will be available at `http://localhost:3000`

## Screenshots

To capture screenshots for your README:

1. Open the dashboard at `http://localhost:3000`
2. Take screenshots of:
   - Full dashboard view (desktop)
   - KPI cards section
   - Charts section
   - Lead table
   - Mobile responsive view (use browser dev tools)
3. Save screenshots in a `screenshots/` folder
4. Update README.md with image links

Example:
```markdown
## Screenshots

![Dashboard Overview](screenshots/dashboard.png)
![Mobile View](screenshots/mobile.png)
```

## Performance Tips

- Images are optimized automatically by Next.js
- API routes are serverless functions (fast cold starts)
- Static assets are cached by CDN
- Tailwind CSS is purged in production (small bundle size)

## Monitoring

After deployment, you can monitor your app in the Vercel dashboard:
- View deployment logs
- Check analytics
- Monitor performance
- Set up custom domains
