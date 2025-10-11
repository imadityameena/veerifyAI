# ✅ CSV Sensei Dashboard - Deployment Checklist

## 🚀 Pre-Deployment Setup

### External Services

- [ ] **MongoDB Atlas**

  - [ ] Create account and cluster
  - [ ] Create database user
  - [ ] Set IP whitelist to `0.0.0.0/0`
  - [ ] Get connection string

- [ ] **OpenAI API**

  - [ ] Create account
  - [ ] Generate API key
  - [ ] Add billing information
  - [ ] Set usage limits

- [ ] **Gmail SMTP** (Optional)
  - [ ] Enable 2FA
  - [ ] Generate app password

### Code Preparation

- [ ] **Backend fixes applied**
  - [x] Main backend TypeScript config updated
  - [x] Chatbot backend TypeScript config updated
  - [x] Environment variable handling improved
  - [x] CORS configuration updated
  - [x] Production-ready error handling
  - [x] Graceful shutdown implemented

---

## 🔧 Backend Deployment (Render)

### Main Backend Service

- [ ] **Create Render service**

  - [ ] Name: `csv-sensei-main-backend`
  - [ ] Root directory: `server`
  - [ ] Build command: `npm install && npm run compile`
  - [ ] Start command: `npm start`

- [ ] **Set environment variables**

  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `JWT_EXPIRES_IN=7d`
  - [ ] `PORT=10000`
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL` (update after frontend deployment)

- [ ] **Deploy and test**
  - [ ] Check deployment logs
  - [ ] Test health endpoint
  - [ ] Verify MongoDB connection

### Chatbot Backend Service

- [ ] **Create Render service**

  - [ ] Name: `csv-sensei-chatbot-backend`
  - [ ] Root directory: `chatbot-backend`
  - [ ] Build command: `npm install && npm run compile`
  - [ ] Start command: `npm start`

- [ ] **Set environment variables**

  - [ ] `OPENAI_API_KEY`
  - [ ] `OPENAI_MODEL=gpt-4`
  - [ ] `PORT=10000`
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL` (update after frontend deployment)
  - [ ] `RATE_LIMIT_WINDOW_MS=900000`
  - [ ] `RATE_LIMIT_MAX_REQUESTS=100`

- [ ] **Deploy and test**
  - [ ] Check deployment logs
  - [ ] Test health endpoint
  - [ ] Verify OpenAI API connection

---

## 🖥️ Frontend Deployment (Vercel)

### Vercel Setup

- [ ] **Create Vercel project**

  - [ ] Connect GitHub repository
  - [ ] Framework: Vite
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `dist`

- [ ] **Set environment variables**

  - [ ] `VITE_API_URL` (main backend URL)
  - [ ] `VITE_CHATBOT_API_URL` (chatbot backend URL)

- [ ] **Deploy and test**
  - [ ] Check deployment logs
  - [ ] Test frontend loads correctly

---

## 🔗 Integration Testing

### Backend-to-Frontend

- [ ] **Update CORS settings**

  - [ ] Add frontend URL to main backend
  - [ ] Add frontend URL to chatbot backend

- [ ] **Test API connections**
  - [ ] Frontend → Main Backend
  - [ ] Frontend → Chatbot Backend

### Full Application Testing

- [ ] **Authentication flow**

  - [ ] User registration
  - [ ] User login
  - [ ] Admin login

- [ ] **Core functionality**

  - [ ] File upload
  - [ ] Data validation
  - [ ] Dashboard rendering
  - [ ] Chatbot interaction

- [ ] **All dashboard types**
  - [ ] Compliance Dashboard
  - [ ] Billing Dashboard
  - [ ] Doctor Roster Dashboard
  - [ ] General BI Dashboard

---

## 🛡️ Security & Performance

### Security Checklist

- [ ] **Environment variables secured**

  - [ ] No secrets in code
  - [ ] Strong JWT secrets
  - [ ] API keys protected

- [ ] **CORS properly configured**

  - [ ] Only allowed origins
  - [ ] HTTPS in production

- [ ] **Rate limiting active**
  - [ ] Chatbot API protected
  - [ ] Appropriate limits set

### Performance Checklist

- [ ] **Build optimizations**

  - [ ] TypeScript compilation successful
  - [ ] No build errors
  - [ ] Production builds only

- [ ] **Database performance**
  - [ ] MongoDB connection stable
  - [ ] Proper indexing (if needed)

---

## 📊 Monitoring & Maintenance

### Health Checks

- [ ] **Main backend health endpoint**

  - [ ] URL: `https://your-main-backend.onrender.com/api/health`
  - [ ] Returns 200 status

- [ ] **Chatbot backend health endpoint**
  - [ ] URL: `https://your-chatbot-backend.onrender.com/health`
  - [ ] Returns 200 status

### Monitoring Setup

- [ ] **Render dashboard monitoring**

  - [ ] Check service uptime
  - [ ] Monitor resource usage
  - [ ] Review logs regularly

- [ ] **Error tracking**
  - [ ] Check logs for errors
  - [ ] Monitor API response times
  - [ ] Watch for failed requests

---

## 🎯 Final Verification

### End-to-End Testing

- [ ] **Complete user journey**

  1. [ ] Visit frontend URL
  2. [ ] Register/login as user
  3. [ ] Upload CSV file
  4. [ ] View validation results
  5. [ ] Access dashboard
  6. [ ] Use chatbot feature
  7. [ ] Test all dashboard types

- [ ] **Admin functionality**
  1. [ ] Admin login
  2. [ ] Access admin dashboard
  3. [ ] Feature toggle management

### Performance Verification

- [ ] **Load times acceptable**

  - [ ] Frontend loads < 3 seconds
  - [ ] API responses < 2 seconds
  - [ ] File upload works smoothly

- [ ] **Mobile responsiveness**
  - [ ] Test on mobile devices
  - [ ] Responsive design works

---

## 🎉 Deployment Complete!

Once all items are checked:

- ✅ **Backend services** running on Render
- ✅ **Frontend** deployed on Vercel
- ✅ **Database** connected and working
- ✅ **All features** tested and functional
- ✅ **Security** properly configured
- ✅ **Monitoring** in place

### Next Steps

- [ ] Share deployment URLs with team
- [ ] Set up monitoring alerts
- [ ] Plan for scaling if needed
- [ ] Document any custom configurations

---

## 🆘 Troubleshooting Quick Reference

### Common Issues

1. **Build failures** → Check TypeScript compilation
2. **CORS errors** → Verify frontend URL in backend env vars
3. **Database connection** → Check MongoDB URI and IP whitelist
4. **OpenAI errors** → Verify API key and credits
5. **Service not starting** → Check environment variables

### Useful Commands

```bash
# Test main backend
curl https://your-main-backend.onrender.com/api/health

# Test chatbot backend
curl https://your-chatbot-backend.onrender.com/health

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

**Happy Deploying!** 🚀📊
