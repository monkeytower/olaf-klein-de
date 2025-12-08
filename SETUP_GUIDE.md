# 📚 Complete Deployment Guide

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

1.  **Navigate**: Go to [GitHub Developer Settings > GitHub Apps](https://github.com/settings/apps).
    *   *Troubleshooting*: If you created the App on your **personal** account but the repo is in the **Organization**, that is fine! You just need to install it on the Organization.
    *   *If you want ownership in the Org*: Switch context to the Organization before creating the App (Click your profile photo > "Your organizations" > Select Org > Settings > Developer settings).

2.  **Basic Information**:
    *   **GitHub App name**: `Olaf Klein CMS` (Must be globally unique. If taken, try `Olaf Klein CMS - Monkeytower`).
    *   **Homepage URL**: `https://olaf-klein.de` (Your production domain).
    *   **Callback URL**: `https://olaf-klein.de/keystatic/oauth/callback`
        *   (Crucial for Dev) Add: `http://localhost:4321/keystatic/oauth/callback` (Use "Add Callback URL" button or separated by comma).
    *   **Webhook**: 
        *   **Active**: ❌ **Uncheck this** (Disable it).

3.  **Permissions**:
    *   **Repository permissions**:
        *   **Contents**: Change to `Read and write`.
        *   **Pull requests**: Change to `Read and write`.
        *   **Metadata**: `Read-only` (default).
        *   *All others*: `No access`.

4.  **Create & Secrets**:
    *   Click `Create GitHub App`.
    *   Copy **Client ID** -> `.env` (`KEYSTATIC_GITHUB_CLIENT_ID`).
    *   Generate & Copy **Client Secret** -> `.env` (`KEYSTATIC_GITHUB_CLIENT_SECRET`).

5.  **Generating KEYSTATIC_SECRET (Session Key)**:
    *   This is a random password used to secure your login cookies. It is not provided by GitHub; you create it yourself.
    *   **Terminal Command**: Run `openssl rand -hex 32` in your terminal.
    *   **Result**: Copy the output (a long random string like `a1b2c3...`) to `.env` (`KEYSTATIC_SECRET`).
    *   *Alternative*: Just type a very long random string of letters and numbers (at least 32 chars).

6.  **Install (The Tricky Part)**:
    *   In the sidebar (left), click **Install App**.
    *   **Scenario A**: You see the Organization (`Monkeytower Internet Agency`) in the list.
        *   Click `Install` next to it.
    *   **Scenario B**: You ONLY see your personal account.
        *   This means you are not an "Owner" of the Org, OR the Org has restricted third-party app installations.
        *   *Fix*: Install it on your **Personal Account** invalidly? No, check if the repo is successfully in `monkeytower-internet-agency`.
        *   *Alternative*: Go to the Organization's Settings > GitHub Apps to create it directly there if you have permissions.
        *   *Most Likely*: You just need to grant access. If you install on your personal account, it might not see the Org repo. **Make sure the Repo exists first!**

---

## 3. Netlify Deployment
1.  **Log in** to [Netlify Dashboard](https://app.netlify.com).
2.  **Add New Site** > **Import an existing project**.
3.  **Connect to Git** > **GitHub**.
    *   Authorize access. If you don't see the Org, check "Grant access" in the GitHub pop-up.
4.  **Pick Repository**: `olaf-klein-de`.
5.  **Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
6.  **Environment Variables**:
    *   Click `Add environment variables`.
    *   Paste all `.env` values (`GOOGLE_...`, `KEYSTATIC_...`).
7.  **Deploy**.
