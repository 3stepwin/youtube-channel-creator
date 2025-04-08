# YouTube Channel Creator - Deployment Instructions

This document provides detailed step-by-step instructions for deploying the YouTube Channel Creator application. These instructions are designed for beginners with no prior deployment experience.

## Prerequisites

Before you begin, make sure you have the following:

1. **API Keys**:
   - OpenAI API key (for GPT-4 and DALL-E)
   - YouTube Data API credentials
   - VidIQ API key (optional, for enhanced SEO)

2. **Accounts**:
   - GitHub account (for source code management)
   - Vercel account (for deployment)
   - Firebase account (for backend database)

## 1. Setting Up GitHub Repository

### 1.1 Create a GitHub Account (if you don't have one)

1. Go to [GitHub](https://github.com) and click "Sign up"
2. Follow the instructions to create your account

### 1.2 Create a New Repository

1. After logging in to GitHub, click the "+" icon in the top-right corner
2. Select "New repository"
3. Name your repository (e.g., "youtube-channel-creator")
4. Add a description (optional)
5. Choose "Public" or "Private" (your preference)
6. Check "Add a README file"
7. Click "Create repository"

### 1.3 Clone the Repository Locally

1. Open your terminal/command prompt
2. Navigate to the directory where you want to store the project
3. Run the following command:
   ```
   git clone https://github.com/YOUR_USERNAME/youtube-channel-creator.git
   cd youtube-channel-creator
   ```

### 1.4 Add Project Files

1. Copy all project files to the cloned repository folder (excluding node_modules)
2. Create a .gitignore file with the following content:
   ```
   # Dependencies
   node_modules/
   
   # Environment variables
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   
   # Build files
   dist/
   build/
   
   # Logs
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   
   # Editor directories and files
   .idea
   .vscode
   *.suo
   *.ntvs*
   *.njsproj
   *.sln
   *.sw?
   ```

### 1.5 Push to GitHub

1. Run the following commands:
   ```
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

## 2. Setting Up Firebase

### 2.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "youtube-channel-creator")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create project"

### 2.2 Set Up Firestore Database

1. In the Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location closest to your users
5. Click "Enable"

### 2.3 Generate Firebase Service Account Key

1. In the Firebase console, go to "Project settings" (gear icon)
2. Go to the "Service accounts" tab
3. Click "Generate new private key"
4. Save the JSON file securely (you'll need it for deployment)

## 3. Deploying the Backend to Vercel

### 3.1 Set Up Vercel Account

1. Go to [Vercel](https://vercel.com) and sign up (you can use your GitHub account)
2. After signing up, install the Vercel CLI:
   ```
   npm install -g vercel
   ```

### 3.2 Prepare Backend for Deployment

1. Create a `vercel.json` file in the backend directory with the following content:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

2. Create a `.env` file in the backend directory with your API keys and Firebase configuration:
   ```
   FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project-id","private_key_id":"your-private-key-id","private_key":"your-private-key","client_email":"your-client-email","client_id":"your-client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"your-cert-url"}
   FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
   FIREBASE_PROJECT_ID=your-project-id
   ```
   
   Note: Replace the placeholder values with your actual Firebase service account details.

### 3.3 Deploy Backend to Vercel

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy the backend:
   ```
   vercel --prod
   ```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - What's your project's name? youtube-channel-creator-backend
   - In which directory is your code located? ./
   - Want to override settings? No

5. After deployment, Vercel will provide a URL for your backend (e.g., https://youtube-channel-creator-backend.vercel.app)

## 4. Deploying the Frontend to Vercel

### 4.1 Prepare Frontend for Deployment

1. Create a `.env` file in the frontend directory:
   ```
   VUE_APP_API_URL=https://youtube-channel-creator-backend.vercel.app/api
   ```
   
   Note: Replace the URL with your actual backend URL from step 3.3.

### 4.2 Deploy Frontend to Vercel

1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Create a `vercel.json` file with the following content:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

3. Deploy the frontend:
   ```
   vercel --prod
   ```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - What's your project's name? youtube-channel-creator-frontend
   - In which directory is your code located? ./
   - Want to override settings? No

5. After deployment, Vercel will provide a URL for your frontend (e.g., https://youtube-channel-creator-frontend.vercel.app)

## 5. Setting Up a Custom Domain (Optional)

### 5.1 Purchase a Domain

1. Purchase a domain from a domain registrar (e.g., Namecheap, GoDaddy, Google Domains)

### 5.2 Add Domain to Vercel

1. Go to your Vercel dashboard
2. Select your frontend project
3. Go to "Settings" > "Domains"
4. Add your domain
5. Follow Vercel's instructions to configure DNS settings

## 6. Testing Your Deployment

1. Visit your frontend URL (from step 4.2)
2. Test the application by:
   - Entering your API keys
   - Creating a channel with a test niche
   - Generating channel names, logos, and banners
   - Testing the YouTube upload functionality

## 7. Troubleshooting

### 7.1 Backend Issues

- Check Vercel logs in the Vercel dashboard
- Verify your environment variables are set correctly
- Ensure your Firebase service account has the correct permissions

### 7.2 Frontend Issues

- Check browser console for errors
- Verify the API URL is correct in your environment variables
- Ensure your API keys are valid

## 8. Maintenance and Updates

### 8.1 Updating Your Application

1. Make changes to your local repository
2. Test locally
3. Commit and push to GitHub
4. Redeploy using Vercel:
   ```
   vercel --prod
   ```

### 8.2 Monitoring

- Use Vercel's built-in analytics to monitor usage
- Check Firebase console for database usage and errors

## 9. Launch Checklist

Before sharing your application with users, ensure:

- [ ] All API keys are working
- [ ] Frontend connects to backend successfully
- [ ] Channel name generation works
- [ ] Logo and banner generation works
- [ ] SEO content generation works
- [ ] YouTube upload functionality works
- [ ] Application is responsive on all devices
- [ ] Error handling is implemented for all features

Congratulations! Your YouTube Channel Creator application is now deployed and ready to use.
