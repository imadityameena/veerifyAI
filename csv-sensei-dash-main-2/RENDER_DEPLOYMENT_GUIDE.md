# 🚀 CSV Sensei Dashboard - Render Deployment Guide

## 📋 Overview

This guide will help you deploy both backend services (Main Backend and Chatbot Backend) to Render.com. Each service will be deployed separately for better scalability and maintenance.

## 🏗️ Architecture

```
Frontend (Vercel) → Main Backend (Render) → MongoDB Atlas
                → Chatbot Backend (Render) → OpenAI API
```

## 🔧 Prerequisites

Before deploying, ensure you have:

- ✅ Render.com account (free tier available)
- ✅ MongoDB Atlas cluster set up
- ✅ OpenAI API key
- ✅ GitHub repository with your code

## 📦 Service 1: Main Backend Deployment

### Step 1: Create New Web Service

1. **Go to [render.com](https://render.com)** and sign in
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**

### Step 2: Configure Main Backend Service

**Service Settings:**

- **Name**: `csv-sensei-main-backend`
- **Environment**: `Node`
- **Branch**: `main`
- **Root Directory**: `server`
- **Build Command**: `npm install && npm run compile`
- **Start Command**: `npm start`

### Step 3: Environment Variables (Main Backend)

Add these environment variables in Render dashboard:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/csv-sensei

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=10000
NODE_ENV=production

# Frontend URL (Update after frontend deployment)
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Step 4: Deploy Main Backend

1. **Click "Create Web Service"**
2. **Wait for deployment** to complete (2-5 minutes)
3. **Note the service URL** (e.g., `https://csv-sensei-main-backend.onrender.com`)

---

## 🤖 Service 2: Chatbot Backend Deployment

### Step 1: Create Second Web Service

1. **Click "New +"** → **"Web Service"**
2. **Connect the same GitHub repository**

### Step 2: Configure Chatbot Backend Service

**Service Settings:**

- **Name**: `csv-sensei-chatbot-backend`
- **Environment**: `Node`
- **Branch**: `main`
- **Root Directory**: `chatbot-backend`
- **Build Command**: `npm install && npm run compile`
- **Start Command**: `npm start`

### Step 3: Environment Variables (Chatbot Backend)

Add these environment variables in Render dashboard:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4

# Server Configuration
PORT=10000
NODE_ENV=production

# Frontend URL (Update after frontend deployment)
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 4: Deploy Chatbot Backend

1. **Click "Create Web Service"**
2. **Wait for deployment** to complete (2-5 minutes)
3. **Note the service URL** (e.g., `https://csv-sensei-chatbot-backend.onrender.com`)

---

## 🔗 Update Frontend Configuration

After both backends are deployed, update your frontend environment variables:

### In Vercel Dashboard:

```bash
VITE_API_URL=https://csv-sensei-main-backend.onrender.com/api
VITE_CHATBOT_API_URL=https://csv-sensei-chatbot-backend.onrender.com/api/chat
```

### Update Backend CORS Settings:

Add your frontend URL to both backend services:

**Main Backend Environment Variable:**

```bash
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Chatbot Backend Environment Variable:**

```bash
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

---

## 🧪 Testing Your Deployment

### 1. Test Main Backend

```bash
curl https://csv-sensei-main-backend.onrender.com/api/health
```

### 2. Test Chatbot Backend

```bash
curl https://csv-sensei-chatbot-backend.onrender.com/health
```

### 3. Test Full Application

1. Visit your frontend URL
2. Try uploading a CSV file
3. Test the chatbot functionality
4. Verify authentication works

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Build Failures

**Symptoms**: Service fails to start
**Solutions**:

- Check build logs in Render dashboard
- Verify all dependencies are in package.json
- Ensure TypeScript compilation succeeds

#### 2. MongoDB Connection Issues

**Symptoms**: "MongoDB connection error"
**Solutions**:

- Verify MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0)
- Ensure database user has proper permissions

#### 3. CORS Errors

**Symptoms**: Frontend can't connect to backend
**Solutions**:

- Update FRONTEND_URL in backend environment variables
- Check CORS configuration in source code
- Verify frontend URL is correct

#### 4. OpenAI API Errors

**Symptoms**: Chatbot not responding
**Solutions**:

- Verify OPENAI_API_KEY is set correctly
- Check API key has sufficient credits
- Ensure rate limits aren't exceeded

### Debugging Steps

1. **Check Render Logs**:

   - Go to your service dashboard
   - Click "Logs" tab
   - Look for error messages

2. **Test Endpoints**:

   ```bash
   # Test main backend
   curl -X GET https://your-main-backend.onrender.com/api/health

   # Test chatbot backend
   curl -X GET https://your-chatbot-backend.onrender.com/health
   ```

3. **Verify Environment Variables**:
   - Check all required variables are set
   - Ensure no typos in variable names
   - Verify values are correct

---

## 📊 Service URLs Structure

After deployment, you'll have:

```
Main Backend:
https://csv-sensei-main-backend.onrender.com
├── /api/auth/*          # Authentication endpoints
├── /api/admin/*         # Admin endpoints
├── /api/feature-toggles/* # Feature toggle endpoints
└── /api/*               # General API endpoints

Chatbot Backend:
https://csv-sensei-chatbot-backend.onrender.com
├── /health              # Health check
└── /api/chat/*          # Chat endpoints
```

---

## 💰 Cost Estimation

### Free Tier (Sufficient for MVP)

- **Main Backend**: Free (750 hours/month)
- **Chatbot Backend**: Free (750 hours/month)
- **Total**: $0/month

### Production Tier

- **Main Backend**: $7/month (always-on)
- **Chatbot Backend**: $7/month (always-on)
- **Total**: $14/month

---

## 🔄 Updating Services

To update your services:

1. **Push changes** to GitHub:

   ```bash
   git add .
   git commit -m "Update backend functionality"
   git push origin main
   ```

2. **Render will automatically redeploy** both services

3. **Monitor deployment** in Render dashboard

---

## 🛡️ Security Best Practices

### Environment Variables

- ✅ Never commit secrets to Git
- ✅ Use strong JWT secrets
- ✅ Rotate API keys regularly

### CORS Configuration

- ✅ Only allow necessary origins
- ✅ Use HTTPS in production
- ✅ Regularly review allowed domains

### Rate Limiting

- ✅ Implement rate limiting on all APIs
- ✅ Monitor for abuse
- ✅ Set appropriate limits

---

## 📞 Support

If you encounter issues:

1. **Check Render documentation**: [render.com/docs](https://render.com/docs)
2. **Review service logs** in Render dashboard
3. **Test endpoints** individually
4. **Verify environment variables**

---

## 🎉 Success!

Once deployed, your CSV Sensei Dashboard will have:

- ✅ **Scalable backend services** on Render
- ✅ **Automatic deployments** from GitHub
- ✅ **Production-ready configuration**
- ✅ **Proper error handling and logging**
- ✅ **Security best practices**

Your backends are now ready to serve your frontend application! 🚀📊

---

**Next Steps**: Deploy your frontend to Vercel and update the environment variables as described above.
