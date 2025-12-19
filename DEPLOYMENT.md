# 🚀 Deployment Guide - BryanHanley.VC

## Prerequisites
- GitHub account
- Vercel account (free)
- Supabase account (free)
- Domain name (BryanHanley.VC)

## Step 1: Setup Supabase (10 minutes)

### Create Project
1. Go to https://supabase.com
2. Click "New Project"
3. Name: `bryanhanley-vc`
4. Set database password
5. Choose region (closest to you)

### Run Database Schema
1. Go to SQL Editor
2. Paste the CREATE TABLE statement from README.md
3. Click "Run"

### Get API Keys
1. Go to Settings > API
2. Copy:
   - Project URL
   - anon/public key

## Step 2: Setup GitHub (5 minutes)

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit - BryanHanley.VC"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/bryanhanley-vc.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel (5 minutes)

### Import Project
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Framework Preset: Vite
5. Root Directory: ./

### Add Environment Variables
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_key_here
VITE_SITE_PASSWORD=YourSecurePassword123
```

### Deploy
Click "Deploy" - Done in 2 minutes!

## Step 4: Custom Domain (10 minutes)

### Buy Domain
1. Go to Namecheap/Google Domains
2. Buy BryanHanley.VC ($12/year)

### Configure DNS
1. In Vercel project settings > Domains
2. Add `bryanhanley.vc` and `www.bryanhanley.vc`
3. Copy DNS records shown
4. Add to your domain registrar
5. Wait 5-60 minutes for propagation

## Step 5: Test Everything

1. Visit https://bryanhanley.vc
2. Click "Login"
3. Enter your password
4. Create a test evaluation
5. Check portfolio

## ✅ You're Live!

Your site is now live at https://bryanhanley.vc

### What You Got:
- ✅ Professional website
- ✅ Secure login
- ✅ Full evaluation system
- ✅ Portfolio tracking
- ✅ SSL certificate (automatic)
- ✅ Global CDN
- ✅ Auto-scaling

### Monthly Cost: $1/month
- Domain: $12/year ($1/month)
- Hosting: $0 (Vercel free tier)
- Database: $0 (Supabase free tier)

## 🔧 Making Changes

```bash
# Make changes to code
git add .
git commit -m "Update feature X"
git push

# Vercel automatically redeploys!
```

## 📞 Support

If something doesn't work:
1. Check Vercel deployment logs
2. Check Supabase table exists
3. Verify environment variables
4. Check browser console for errors

## 🎉 Next Steps

1. Evaluate your first company
2. Share with your network
3. Use in interviews
4. Start consulting?
