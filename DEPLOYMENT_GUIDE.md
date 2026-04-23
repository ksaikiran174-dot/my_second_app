# Deployment Guide

This guide covers deploying the Task Management Application to production.

## Pre-Deployment Checklist

- [ ] Environment variables configured securely
- [ ] Database migrations tested
- [ ] Error handling tested
- [ ] CORS origins updated
- [ ] Secret key generated and stored securely
- [ ] Frontend API URL updated to production
- [ ] All tests passing
- [ ] Code reviewed and cleaned up
- [ ] Dependencies updated and locked
- [ ] Database backup strategy planned

## Backend Deployment (Render, Heroku, Railway, etc.)

### 1. Prepare Backend

```bash
cd backend

# Create requirements.txt (should already exist)
pip freeze > requirements.txt

# Create Procfile for Heroku/Render
echo "web: uvicorn main:app --host 0.0.0.0 --port $PORT" > Procfile

# Create runtime.txt for Python version
echo "python-3.10.12" > runtime.txt
```

### 2. Set Environment Variables

On your deployment platform:

```
DATABASE_URL=postgresql://user:password@host:port/dbname
SECRET_KEY=your-production-secret-key-minimum-32-chars
ENVIRONMENT=production
ALLOWED_ORIGINS=https://yourdomain.com
```

### 3. Configure Database

For PostgreSQL on production:

```bash
# Run database migrations if using Alembic
alembic upgrade head

# Or create tables manually
# The app will auto-create tables on first run if using SQLite
```

### 4. Deploy

```bash
# Using Git (recommended for most platforms)
git push heroku main
# or
git push render main
```

## Frontend Deployment (Vercel, Netlify, AWS S3, etc.)

### 1. Build Production Bundle

```bash
cd frontend

# Install dependencies
npm install

# Build optimized production bundle
npm run build
```

### 2. Set Environment Variables

On your deployment platform:

```
REACT_APP_API_URL=https://your-backend-api.com/api
REACT_APP_ENVIRONMENT=production
```

### 3. Deploy

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

#### AWS S3
```bash
aws s3 sync build/ s3://your-bucket-name/
```

## Production Security

### Backend Security

1. **Update CORS Origins**
```python
# config.py
ALLOWED_ORIGINS = ["https://yourdomain.com"]  # Production domain only
```

2. **Enable HTTPS**
```python
# Production should always use HTTPS
# Configure SSL/TLS on your hosting platform
```

3. **Database Security**
- Use strong passwords
- Enable SSL connections to database
- Use VPC/private networks
- Regular backups

4. **Secret Management**
- Never commit `.env` files
- Use platform secrets/vault
- Rotate secrets regularly
- Use strong random strings for SECRET_KEY

### Frontend Security

1. **Remove Debug Info**
- Check console.log statements
- Remove development comments

2. **Environment Variables**
- Never expose sensitive keys
- API URL should be non-sensitive (only backend can have secrets)

3. **Build Optimization**
- Minified bundle
- Tree-shaken dependencies
- Lazy loading of routes

## Monitoring & Logging

### Backend Monitoring

1. **Set up Logging**
```python
import logging
logging.basicConfig(level=logging.INFO)
```

2. **Monitor Error Rates**
- Set up error alerts
- Use services like Sentry

3. **Performance Monitoring**
- Monitor response times
- Use APM tools

### Frontend Monitoring

1. **Error Tracking**
- Set up Sentry or similar
- Monitor JavaScript errors

2. **Performance**
- Monitor Core Web Vitals
- Check load times

## Database Maintenance

### Regular Backups

```bash
# PostgreSQL backup
pg_dump -U username dbname > backup.sql

# Restore from backup
psql -U username dbname < backup.sql
```

### Database Cleanup

```sql
-- Delete old user records (if applicable)
-- Delete completed tasks older than 30 days
DELETE FROM tasks 
WHERE status = 'done' AND updated_at < NOW() - INTERVAL 30 DAY;
```

## Scaling Considerations

### Backend Scaling

1. **Database Optimization**
   - Add indexes on frequently queried columns
   - Use connection pooling

2. **API Performance**
   - Add caching with Redis
   - Implement pagination for large datasets
   - Use CDN for static assets

3. **Load Balancing**
   - Use load balancer for multiple instances
   - Horizontal scaling

### Frontend Scaling

1. **CDN Distribution**
   - Serve static files from CDN
   - Enable browser caching

2. **Code Splitting**
   - Lazy load routes
   - Optimize bundle size

## Troubleshooting Production Issues

### API Connection Issues

```javascript
// Check if API URL is correct
console.log(process.env.REACT_APP_API_URL)
```

### CORS Errors

1. Check ALLOWED_ORIGINS in backend
2. Ensure frontend domain matches
3. Check browser console for exact error

### Database Connection Issues

1. Verify DATABASE_URL format
2. Check network connectivity
3. Verify credentials

### Performance Issues

1. Monitor database queries
2. Check API response times
3. Profile frontend bundle

## Rollback Procedure

### If Deployment Fails

```bash
# Revert to previous version
git revert <commit-hash>
git push production main

# Or manually restart previous version
# Consult your platform's rollback documentation
```

## Health Checks

### Monitor API Health

```bash
curl https://your-api.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "environment": "production"
}
```

### Monitor Frontend

- Check homepage loads
- Verify login page works
- Test task creation flow

## Update & Maintenance Schedule

1. **Weekly**: Check error logs, monitor performance
2. **Monthly**: Update dependencies, security patches
3. **Quarterly**: Full system review, capacity planning

## Support & Escalation

1. Check error logs first
2. Review recent deployments
3. Check service status pages
4. Contact platform support if needed

---

**Remember: Always test in staging before deploying to production!**
