# 📚 Expanded Setup & Deployment Guide

## 1. Keystatic GitHub App Setup (Detailed)
This App authorizes Keystatic to write content to your repository.

1.  **Navigate**: Go to [GitHub Developer Settings > GitHub Apps](https://github.com/settings/apps).
2.  **Click**: `New GitHub App`.
3.  **Basic Information**:
    *   **GitHub App name**: `Olaf Klein CMS` (Must be globally unique. If taken, try `Olaf Klein CMS - Monkeytower`).
    *   **Homepage URL**: `https://olaf-klein.de` (Your production domain).
    *   **Callback URL**:
        *   This is CRITICAL. You must add **both** your Production and Localhost URLs separated by a comma (or add them one by one).
        *   Value: `https://olaf-klein.de/keystatic/oauth/callback`
        *   (Crucial for Dev) Add: `http://localhost:4321/keystatic/oauth/callback`
    *   **Webhook**: 
        *   **Active**: ❌ **Uncheck this** (Disable it). We do not need webhooks for this integration, and enabled webhooks without a listener will just cause errors.

4.  **Permissions (The "Endless" List)**:
    Ignor most of them. You only need to touch **Repository permissions**:
    *   **Contents**: Change to `Read and write`. (Allows creating/editing pages).
    *   **Pull requests**: Change to `Read and write`. (Allows creating branches/PRs if you choose that mode).
    *   **Metadata**: This is `Read-only` by default. Leave it.
    *   **Leave everything else as "No access".**

5.  **Create**: Click `Create GitHub App`.
6.  **Capture Secrets**:
    *   You will see **App ID** and **Client ID**. Copy the **Client ID** to your `.env` as `KEYSTATIC_GITHUB_CLIENT_ID`.
    *   Scroll down to "Client secrets". Click `Generate a new client secret`. Copy this **immediately** to your `.env` as `KEYSTATIC_GITHUB_CLIENT_SECRET`.

7.  **Install**:
    *   In the sidebar (left), click **Install App**.
    *   Click `Install` next to your account/organization (`Monkeytower Internet Agency`).
    *   **Repository Access**: Select "Only select repositories" and choose `olaf-klein-de`. (Security best practice).
    *   Click `Install`.

---

## 2. Netlify Deployment (Step-by-Step)
1.  **Log in** to your [Netlify Dashboard](https://app.netlify.com).
2.  **Add New Site**:
    *   Click `Add new site` > `Import an existing project`.
3.  **Connect to Git**:
    *   Select **GitHub**.
    *   A popup will appear asking to authorize Netlify. Click `Authorize monkeytower-internet-agency` (or your user).
4.  **Pick Repository**:
    *   Search for `olaf-klein-de`. Click it.
5.  **Build Settings** (Astro presets should auto-fill this, but verify):
    *   **Base directory**: (Leave empty).
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
6.  **Environment Variables** (The most important step):
    *   Click `Add environment variables`.
    *   You must paste **every single key-value pair** from your local `.env` file here.
    *   Click `Add variable` for each one (`GOOGLE_CLIENT_ID`, `KEYSTATIC_SECRET`, etc.).
    *   *Tip: Netlify has a "Bulk Edit" feature where you can paste the whole file content at once.*
7.  **Deploy**: Click `Deploy monkeytower-internet-agency/olaf-klein-de`.

---

## 3. Google OAuth2 (Quick Recap)
Refer to the simplified logic:
*   **Redirect URI**: `https://developers.google.com/oauthplayground`
*   **Scopes**: `https://mail.google.com/`
*   **Goal**: Get the `Refresh Token` so your server can always act as you.
