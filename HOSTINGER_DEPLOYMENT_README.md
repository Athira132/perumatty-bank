# Perumatty Service Co-operative Bank Ltd.
## Traditional Web Hosting (Hostinger / Apache / LiteSpeed) Deployment Guide

This guide provides step-by-step instructions for deploying the **Perumatty Service Co-operative Bank Ltd.** website to standard Linux/Apache/LiteSpeed web hosting (such as **Hostinger**, cPanel, Bluehost, etc.) without depending on Vercel.

---

### 1. Ready-to-Upload Package Location

All production-ready files have been generated, optimized, and validated inside the project directory:

* **Upload Folder Path:**
  `c:\Users\91984\Desktop\perumatty-bank\public_html_upload`
* **Convenience ZIP Archive:**
  `c:\Users\91984\Desktop\perumatty-bank\public_html_upload.zip` (11.01 MB)

---

### 2. Complete File Structure in `public_html_upload/`

The folder contains 46 files specifically organized for the `public_html` root directory:

```text
public_html/
│
├── .htaccess                 # Apache/LiteSpeed rules (HTTPS redirect, clean URLs, Gzip, cache, security)
├── 404.html                  # Branded 404 Not Found error page
├── about.html                # About Us page (Bank history, vision, leadership, awards)
├── branches.html             # Branches page (Vandithavalam Main & Vilayodi Branch)
├── contact.html              # Contact page with interactive form, phone, and WhatsApp
├── contact-handler.php       # Optional PHP mail script for Hostinger (sends to pscb757@gmail.com)
├── gallery.html              # Photo gallery with lightbox and rectangular hero banner
├── index.html                # Homepage with compact 2-column mobile board of directors
├── robots.txt                # Search crawler instructions (pointing to perumattyscb.in)
├── sitemap.xml               # Complete XML sitemap (canonical perumattyscb.in URLs)
│
├── assets/                   # All 30 bank images, director photos, building, awards & logo
│   ├── award-2022.jpg
│   ├── award-2023.jpg
│   ├── award-2024.jpg
│   ├── award-new.jpg
│   ├── director-kattappan-n.jpg
│   ├── director-krishnan-a.jpg
│   ├── director-kuttan-m.jpg
│   ├── director-kuttappan-n.jpg
│   ├── director-meenakumari-m.jpg
│   ├── director-pathmaja-k.jpg
│   ├── director-praveen-r.jpg
│   ├── director-raveendran-k.jpg
│   ├── director-rudheesh-r.jpg
│   ├── director-shahid.jpg
│   ├── director-sruthi-p-s.jpg
│   ├── director-suresh-babu.jpg
│   ├── director-suresh-babu.png
│   ├── director-vinod-babu.jpg
│   ├── gallery-hero.jpg
│   ├── gallery-new.jpg
│   ├── hero-bank-ext.jpg
│   ├── hero-bank-new.jpg
│   ├── logo.png
│   ├── president.jpg
│   ├── secretary.jpg
│   ├── service-banking.jpg
│   ├── service-deposits.jpg
│   ├── service-loans.jpg
│   ├── service-social.jpg
│   └── welcome-bank.jpg
│
├── css/
│   └── style.css             # Unified responsive stylesheet and design system
│
├── js/
│   └── main.js               # Sticky navbar, mobile menu, stats counter, lightbox, slideshow
│
└── services/
    ├── banking-facilities.html
    ├── deposits.html
    ├── loans.html
    └── social-committed-presence.html
```

---

### 3. Step-by-Step Upload to Hostinger

#### Method A: Hostinger File Manager (Fastest & Recommended — 2 Minutes)

1. Log in to your **Hostinger Control Panel (hPanel)**: [https://hpanel.hostinger.com/](https://hpanel.hostinger.com/).
2. Under **Websites**, click **Manage** next to your domain (`perumattyscb.in`).
3. In the left sidebar, click **Files** -> **File Manager** (or click **Access all files of perumattyscb.in**).
4. Double-click the **`public_html`** folder.
5. If there is a default placeholder file (such as `default.php`), select it and delete it.
6. Click the **Upload** icon (arrow pointing up in the top right menu).
7. Select **File**, then choose:
   `c:\Users\91984\Desktop\perumatty-bank\public_html_upload.zip`
8. Once uploaded, right-click `public_html_upload.zip` in the File Manager and click **Extract**.
9. Choose to extract into the current directory (`.` or `public_html`).
10. Ensure the extracted files (like `index.html`, `assets/`, `.htaccess`, etc.) reside directly inside `public_html/`, not in an extra nested folder.
11. You can now delete `public_html_upload.zip` from File Manager to keep storage tidy.

#### Method B: FTP / SFTP (FileZilla)

1. In Hostinger hPanel, go to **Files** -> **FTP Accounts**.
2. Note your **FTP Host/IP**, **Username**, and set/confirm your **Password** (Port: `21`).
3. Open **FileZilla** (or Cyberduck / WinSCP).
4. Enter Host, Username, Password, and click **Quickconnect**.
5. In the right pane (Remote site), navigate to `/public_html/`.
6. In the left pane (Local site), navigate to:
   `c:\Users\91984\Desktop\perumatty-bank\public_html_upload`
7. Select all files and folders inside `public_html_upload` and drag them into `/public_html/`.

---

### 4. How to Connect the Domain (`perumattyscb.in`)

#### If your domain is registered with Hostinger:
* It is already connected automatically. Just ensure the website in hPanel is pointing to the domain.

#### If your domain is registered elsewhere (GoDaddy, Namecheap, Google Domains):
You have two options:

* **Option 1: Point via Nameservers (Recommended by Hostinger)**
  In your domain registrar's DNS management, update the nameservers to:
  ```text
  ns1.dns-parking.com
  ns2.dns-parking.com
  ```
  *(DNS propagation usually takes between 15 minutes and 24 hours).*

* **Option 2: Point via A Record**
  In your domain registrar's DNS records:
  * Set **A Record** `@` (Host) to your **Hostinger Server IP** (visible on the hPanel Dashboard sidebar).
  * Set **CNAME Record** `www` to `@` (or `perumattyscb.in`).

#### Enable Free SSL / HTTPS:
1. In hPanel, navigate to **Security** -> **SSL**.
2. Click **Install SSL** (Select Free Let's Encrypt).
3. The `.htaccess` file included in the upload folder automatically redirects all HTTP traffic to HTTPS.

---

### 5. How to Test the Website After Uploading

Once uploaded and DNS has resolved, test the following:

1. **Homepage:** Visit `https://perumattyscb.in/` — verify that:
   - Header, logo, and navigation display cleanly.
   - President, Secretary, and Board of Directors cards load with updated names (`Kuttappan N.`, `Vinod Babu S.`, `Shahid S.`, etc.) and Suresh Babu's new photo.
   - Mobile View (inspect at width 375px–430px): Directors display in 2 compact columns per row.
2. **Page Navigation & Clean URLs:**
   - Click **About Us** -> Loads `https://perumattyscb.in/about.html` (or `https://perumattyscb.in/about`).
   - Click **Our Branches** -> Loads `https://perumattyscb.in/branches.html`.
   - Click **Services** dropdown -> Banking Facilities, Deposits, Loans, Social Committed Presence all load properly.
   - Click **Gallery** -> Loads `https://perumattyscb.in/gallery.html` with the rectangular hero banner and 5 photos.
   - Click any gallery photo to confirm the full-screen lightbox opens and closes.
3. **Custom 404 Error Page:**
   - Visit `https://perumattyscb.in/non-existent-test-page`.
   - Confirm it renders the custom branded 404 page with quick navigation links back to the homepage.
4. **Direct Contact Links:**
   - Click telephone numbers (`04923 232792`, `9446032792`) to verify the `tel:` protocol dialer opens.
   - Click the WhatsApp link (`https://wa.me/919446032792`) to verify WhatsApp chat opens.

---

### 6. Backend, Database & Form Handling Details

#### Database:
* **None required.** The website is a high-performance static multi-page application (HTML5/CSS3/ES6). It does not require MySQL, PostgreSQL, or any database setup on Hostinger.

#### Form Handling (Contact & Enquiry):
* **Default Client-Side Handling (Zero setup):**
  The site comes pre-configured with graceful interactive client-side form validation and feedback modals via `js/main.js`. Visitors receive instant confirmation upon submission.
* **Optional Server-Side Email Delivery via Hostinger (`contact-handler.php`):**
  We have included a secure PHP script `contact-handler.php` in `public_html/`. It uses Hostinger's built-in PHP `mail()` engine and sends submissions directly to `pscb757@gmail.com`.
  - To enable direct POST to this PHP handler, simply set `action="contact-handler.php" method="POST"` on the form in `contact.html`, or uncomment the `fetch('contact-handler.php', ...)` hook in `js/main.js`.
  - Hostinger supports PHP 7.4, 8.0, 8.1, 8.2, and 8.3 out of the box with `mail()` enabled.

---

### 7. Existing Vercel & GitHub Status

* **Vercel Deployment:** The existing Vercel deployment remains active and completely untouched.
* **GitHub Repository:** The GitHub repository is intact on branch `main`.
* **Zero Disruption:** You can keep the Vercel site running while testing Hostinger, or switch DNS whenever you are ready.

