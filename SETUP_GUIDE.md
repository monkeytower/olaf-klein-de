# 🚀 Launch & Deployment Guide

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
   - Copy `Client ID` and `Client Secret`.
   - Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
   - Settings (Gear icon): Check "Use your own OAuth credentials" and paste ID/Secret.
   - Select Scopes: `https://mail.google.com/`.
   - Click "Authorize APIs".
   - Exchange authorization code for tokens.
   - **Result**: Copy the `Refresh Token`.

---

## 2. Keystatic GitHub App Setup (CMS)
To enable the `/keystatic` Admin UI in production:

1. Go to [GitHub App Settings](https://github.com/settings/apps/new) (under your Organization 'Monkeytower Internet Agency' if preferred, or personal).
2. **Name**: `Olaf Klein CMS` (must be unique).
3. **Homepage URL**: `https://olaf-klein.de` (or your Netlify URL).
4. **Callback URL**: `https://olaf-klein.de/keystatic/oauth/callback` (AND `http://localhost:4321/keystatic/oauth/callback` for local testing).
5. **Permissions**:
   - Contents: **Read & Write**.
   - Metadata: **Read-only**.
   - Pull Requests: **Read & Write**.
6. **Save**.
7. Copy `Client ID` and `Client Secret`.
8. **Install App**: Click "Install App" and select the `monkeytower-internet-agency/olaf-klein-de` repository.

---

## 3. Repository & Environment Setup

My automated tools were unable to access the shell, so please execute these commands manually to push the code:

### Configure Secrets (`.env`)
Edit your `.env` file with the secrets generated above:

```bash
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
EMAIL_USER=your_email@gmail.com
EMAIL_TO=recipient@example.com

KEYSTATIC_GITHUB_CLIENT_ID=github_client_id
KEYSTATIC_GITHUB_CLIENT_SECRET=github_client_secret
KEYSTATIC_SECRET=generate_random_string_here
```

### Push to GitHub
```bash
# Initialize Git
git init
git add .
git commit -m "feat: initial migration to Astro/Keystatic"

# Create Repo (Organization: monkeytower-internet-agency)
# Ensure you are logged in: gh auth login
gh repo create monkeytower-internet-agency/olaf-klein-de --private --source=. --remote=origin --push
```

### Deploy to Netlify
1. Connect via Netlify Dashboard to the new GitHub repo.
2. **Build Command**: `dist` directory, `npm run build` command.
3. **Environment**: Copy all contents of `.env` into Netlify Environment Variables.
