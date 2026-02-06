# Email Collection & Welcome Email Workflow

## Overview

The MVP Club site collects email signups through frontend components that submit to a Google Apps Script. The script saves data to a Google Sheet and sends an automated welcome email.

## Architecture

```
┌─────────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│  Frontend Forms     │────▶│  Google Apps Script  │────▶│  Google Sheet   │
│  (React Components) │     │  (Web App)           │     │  (Data Storage) │
└─────────────────────┘     └──────────┬───────────┘     └─────────────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │  Gmail (Welcome Email)│
                            └──────────────────────┘
```

## How It Works

### Routing: URL Determines Everything

The Google Apps Script URL determines both where data goes and which account sends emails:

```
Website Form Submit
       │
       ▼
POST to Google Apps Script URL
       │
       ▼
Script runs in the context of the Google account that owns it
       │
       ├──▶ Writes to the Sheet the script is attached to
       │
       └──▶ Sends email FROM that Google account
```

**Key insight:** The frontend doesn't know anything about Google accounts. It just POSTs JSON data to a URL. That URL is tied to a specific Google Sheet and Google account. Changing the URL in the React components changes where data goes and which account sends emails.

### Current Configuration

| Setting | Value |
|---------|-------|
| **Google Account** | Company Google account (info@mvpclub.ai) |
| **Sending Email** | info@mvpclub.ai |
| **Google Sheet** | In company Google Drive |
| **Script URL** | See below |

**Current Endpoint URL:**
```
https://script.google.com/macros/s/AKfycbyNGVQSbxcSDZUf5K-2sWrnqdy08GE9BkPw8C0K1qRzMXnZVLVMBS6ggH4QnLZCOtBo/exec
```

This URL is configured in three files:
- `src/SignupOverlay.jsx`
- `src/LeadMagnetPopup.jsx`
- `src/WaitlistOverlay.jsx`

## Frontend Components

Three components collect signups (all in `/src/`):

| Component | File | Trigger | Source Tag |
|-----------|------|---------|------------|
| SignupOverlay | `SignupOverlay.jsx` | Page load (landing page) | `landing_overlay` |
| LeadMagnetPopup | `LeadMagnetPopup.jsx` | 20s delay or exit intent | `lead_magnet_popup` |
| WaitlistOverlay | `WaitlistOverlay.jsx` | Button click | `community_waitlist` |

### How Each Component Works

**SignupOverlay:** Full-screen overlay shown on first visit. Collects first name and email. Dismissed state stored in localStorage so returning visitors skip it.

**LeadMagnetPopup:** Modal popup triggered after 5 seconds on page OR when user's mouse exits toward browser top (exit intent). Offers free guide download in exchange for email. Won't show again for 7 days after being shown.

**WaitlistOverlay:** Full-screen overlay for community waitlist signups. Triggered by button clicks elsewhere on the site.

### Data Sent to Script

All components send the same JSON structure:

```javascript
{
  firstName: "User's first name",    // May be empty for WaitlistOverlay
  email: "user@example.com",
  timestamp: "2024-01-15T10:30:00.000Z",
  source: "landing_overlay" | "lead_magnet_popup" | "community_waitlist"
}
```

The `source` field lets you filter/segment signups by where they came from.

## Google Apps Script Code

This script lives in Google Apps Script, attached to the email collection Google Sheet in the company Google Drive (info@mvpclub.ai account).

**To access:** Open the Google Sheet in the company Drive → Extensions → Apps Script

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Save to sheet (columns: firstName, email, timestamp, source)
  sheet.appendRow([data.firstName, data.email, data.timestamp, data.source]);

  // Send welcome email with firstName for personalization
  sendWelcomeEmail(data.email, data.firstName);

  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendWelcomeEmail(email, firstName) {
  var name = firstName || "there";
  var subject = "You're in, " + name + "!";

  var body = `Hi ${name},

You just took a step that most people are still putting off.

AI is reshaping how we work—fast. And figuring it out alone? That's exhausting and can feel isolating and confusing. You don't have to.

MVP Club exists so you can learn by doing, alongside others navigating the same shift. No hype, no jargon—just practical skills you can use right away.

You'll hear from us with workshops, courses, resources, demos and stories from practitioners like you who are making AI work in the real world.

Start here: https://mvpclub.ai

Ready to dive in right away? You have access to a 2-week free trial of our community. You can check it out here: https://mvp-club.mn.co/

Welcome to the club.

—The MVP Club Team
`;

  GmailApp.sendEmail(email, subject, body, {
    name: "The MVP Club Team"
  });
}

// Test functions - run manually in Apps Script editor
function testEmail() {
  sendWelcomeEmail("mhasting1066@gmail.com", "Matt");
}

function testFullFlow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["Test", "mhasting1066@gmail.com", new Date().toISOString(), "manual_test"]);
  sendWelcomeEmail("mhasting1066@gmail.com", "Test");
}
```

**Important:** Use straight apostrophes (`'`) not curly quotes (`'`) in the subject line to avoid character encoding issues in emails.

## Google Sheet Structure

| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| firstName | email | timestamp | source |

## Troubleshooting

### Emails going to wrong sheet / sending from wrong account
The Apps Script URL determines everything. Check that the URL in the React components matches the script deployed from your intended Google account.

### Changes not taking effect on live site
The site is deployed via **Vercel** from the `main` branch. Frontend changes require a commit and push to `main` — Vercel will auto-deploy. Note: `npm run deploy` pushes to the `gh-pages` branch which is **not** used for production hosting.
```bash
git add <files> && git commit -m "message" && git push
# Vercel auto-deploys from main
```

### Can't access Apps Script from Google Sheet
If you get a redirect loop when clicking Extensions → Apps Script, you likely have multiple Google accounts signed in. Use an incognito window and sign in with only the account that owns the Sheet.

### Test email works but sheet doesn't populate
The `testEmail()` function only tests email sending. Use `testFullFlow()` to test both sheet write and email, or submit through the actual website.

### Character encoding issues in emails
Avoid curly/smart quotes and other special Unicode characters in the Apps Script. Use plain ASCII equivalents.

## Deployment Instructions

### To update the welcome email content:
1. Open Google Sheet in company Drive (info@mvpclub.ai account)
2. Go to Extensions → Apps Script (use incognito if redirect loop)
3. Edit the `sendWelcomeEmail` function
4. Save (Ctrl+S)
5. No redeployment needed for code changes to existing deployment

### To update the Apps Script and get a new URL:
1. Make changes in Apps Script editor
2. Click Deploy → Manage deployments
3. Click the pencil icon to edit, or create new deployment
4. If URL changes, update it in all three frontend components
5. Redeploy the website

### To migrate to a different Google Workspace:
1. Create a new Google Sheet in the target workspace
2. Open Extensions → Apps Script (use incognito window, sign in with target account only)
3. Paste the script code
4. Deploy as Web App:
   - Execute as: Me
   - Who has access: Anyone
5. Copy the new Web App URL
6. Update the `GOOGLE_SCRIPT_URL` constant in:
   - `src/SignupOverlay.jsx`
   - `src/LeadMagnetPopup.jsx`
   - `src/WaitlistOverlay.jsx`
7. Commit and push to `main` (Vercel auto-deploys)

## Change Log

| Date | Change |
|------|--------|
| 2026-02-06 | Migrated Apps Script endpoint from personal Google account to company account (info@mvpclub.ai Drive). Updated all three frontend components and confirmed working. |

## Local Storage Keys

The frontend stores data locally for UX purposes (preventing repeat popups, etc.):

| Key | Purpose |
|-----|---------|
| `mvpclub_overlay_dismissed` | Tracks if landing overlay was dismissed |
| `mvpclub_signup_email` | Stores collected email |
| `mvpclub_signup_firstname` | Stores collected first name |
| `mvpclub_lead_magnet_shown` | Tracks last time lead magnet popup was shown (timestamp) |
| `mvpclub_waitlist_email` | Stores waitlist email |
| `mvpclub_leadmagnet_email` | Stores lead magnet signup email |
| `mvpclub_leadmagnet_firstname` | Stores lead magnet signup first name |

To reset popups for testing, clear these keys from localStorage in browser DevTools.
