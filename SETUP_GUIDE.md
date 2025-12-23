# 📚 Complete Deployment Guide

**Repository:** [github.com/monkeytower/olaf-klein-de](https://github.com/monkeytower/olaf-klein-de)

## 1. Google OAuth2 Setup (Gmail Sending)

To enable the contact form to send emails via your Gmail account:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new Project (e.g., `olaf-klein-mailer`).
3. **Enable API**: Search for "Gmail API" and enable it.
4. **OAuth Consent Screen**:
   - User Type: **External**.
   - App Name: "Olaf Klein Website".
   - Support Email: Your email.
   - Initial Test Users: Add the email address you plan to send from.
5. **Credentials**:
   - Click "Create Credentials" -> "OAuth client ID".
   - Application Type: **Web application**.
   - **Authorized Redirect URIs**: `https://developers.google.com/oauthplayground` (Temporary, for generating the token).
6. **Get Tokens**:
   - Copy `Client ID` and `Client Secret` to your `.env` file.
   - Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
   - Settings (Gear icon): Check "Use your own OAuth credentials" and paste ID/Secret.
   - Select Scopes: `https://mail.google.com/`.
   - Click "Authorize APIs".
   - Exchange authorization code for tokens.
   - **Result**: Copy the `Refresh Token` to your `.env` file.

---

## 2. Keystatic GitHub App Setup (CMS)

This App authorizes Keystatic to write content to your repository.

1. **Navigate**: Go to [GitHub Developer Settings > GitHub Apps](https://github.com/settings/apps).
   - *Troubleshooting*: If you created the App on your **personal** account but the repo is in the **Organization**, that is fine! You just need to install it on the Organization.
   - *If you want ownership in the Org*: Switch context to the Organization before creating the App (Click your profile photo > "Your organizations" > Select Org > Settings > Developer settings).

2. **Basic Information**:
   - **GitHub App name**: `Olaf Klein CMS` (Must be globally unique. If taken, try `Olaf Klein CMS - monkeytower internet agency`).
   - **Homepage URL**: `https://olaf-klein.de` (Your production domain).
   - **Callback URL**: `https://olaf-klein.de/api/keystatic/github/oauth/callback`
     - (Crucial for Dev) Add: `http://localhost:4321/api/keystatic/github/oauth/callback` (Use "Add Callback URL" button or separated by comma).
   - **Webhook**:
     - **Active**: ❌ **Uncheck this** (Disable it).

3. **Permissions**:
   - **Repository permissions**:
     - **Contents**: Change to `Read and write`.
     - **Pull requests**: Change to `Read and write`.
     - **Metadata**: `Read-only` (default).
     - *All others*: `No access`.

4. **Create & Secrets**:
   - Click `Create GitHub App`.
   - Copy **Client ID** -> `.env` (`KEYSTATIC_GITHUB_CLIENT_ID`).
   - Generate & Copy **Client Secret** -> `.env` (`KEYSTATIC_GITHUB_CLIENT_SECRET`).

5. **Generating KEYSTATIC_SECRET (Session Key)**:
   - This is a random password used to secure your login cookies. It is not provided by GitHub; you create it yourself.
   - **Terminal Command**: Run `openssl rand -hex 32` in your terminal.
   - **Result**: Copy the output (a long random string like `a1b2c3...`) to `.env` (`KEYSTATIC_SECRET`).

6. **Install**:
   - In the sidebar (left), click **Install App**.
   - Select your account and install on the `olaf-klein-de` repository.

---

## 3. Cloudflare Turnstile Setup (Captcha)

To protect the contact form from spam using Cloudflare Turnstile:

1. **Account**: Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Turnstile**.
2. **Add Site**:
   - Click **Add Site**.
   - **Site Name**: `Olaf Klein Website`.
   - **Domain**: `olaf-klein.de` (add `localhost` for testing).
   - **Widget Mode**: **Managed** (Recommended) or **Invisible**.
3. **Get Keys**:
   - **Site Key**: Copy to `.env` as `PUBLIC_TURNSTILE_SITE_KEY`.
   - **Secret Key**: Copy to `.env` as `TURNSTILE_SECRET_KEY`.

---

## 4. Coolify Deployment

1. **Set up Coolify**: Access your self-hosted Coolify instance.
2. **Create New Project**: Name it `olaf-klein-de`.
3. **Connect to GitHub**:
   - Add your GitHub account if not done.
   - Select the source repository: `olaf-klein-de`.
4. **Configuration**:
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
   - **Output Directory**: `dist`
5. **Environment Variables**:
   - Add all required variables from your `.env` file (Google credentials, Keystatic secrets, and Turnstile keys).
6. **Domain**: Configure your production domain (`olaf-klein.de`) in the project settings.
7. **Deploy**: Click "Deploy" to build and start your application container. MacOS/Linux specific: Ensure your Docker configuration is correct on the server.
