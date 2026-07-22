# Orthodox Experiential Therapy — Website

A static one-page site for the Orthodox Experiential Therapy program (Michael & Katya Spreng), built from the program's information brochure. Pure HTML/CSS/JS — no build step, ready for GitHub Pages.

## File structure

```
index.html          the whole page
css/style.css        styles
js/script.js          small scroll-reveal script
images/
  logo.png            organization mark
  hero-mountain.jpg    hero background photo
  michael.jpg          Michael Spreng
  katya.jpg            Katya Spreng
```

## Publish it on GitHub Pages

1. Create a new repository on GitHub (e.g. `oet-website`). Public repos get free Pages hosting.
2. Upload all the files in this folder to the repository, **keeping the same folder structure** (the `css`, `js`, and `images` folders must sit next to `index.html`).
   - Easiest way: on the repo's main page, click **Add file → Upload files**, drag in everything from this folder (including the subfolders), and commit.
   - Or, if you use git locally:
     ```
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/oet-website.git
     git push -u origin main
     ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. GitHub will publish the site at:
   `https://YOUR-USERNAME.github.io/oet-website/`
   (it can take a minute or two the first time).

## Passcode gate

The site is behind a simple passcode screen (`#gate` in `index.html`, logic in `js/gate.js`). This is **not real security** — anyone determined enough can read the page source — it's meant to keep the site off search engines and away from casual visitors who land on the link, not to protect sensitive data.

The passcode is already set (chosen by you) and stored as a SHA-256 hash in `js/gate.js` — it isn't written in plain text there.

**To change it later:**
1. Open the live site (or `index.html` locally) in a browser.
2. Open the developer console (F12 or right-click → Inspect → Console).
3. Paste this, replacing `yourNewPasscode` with the one you want, and press enter:
   ```js
   crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourNewPasscode'))
     .then(buf => console.log(Array.from(new Uint8Array(buf))
       .map(b => b.toString(16).padStart(2,'0')).join('')));
   ```
4. Copy the long string it prints out.
5. Open `js/gate.js` and paste it in place of the existing value of `GATE_HASH` (near the top of the file).
6. Commit and push — the new passcode is live.

Once someone enters the correct passcode, their browser remembers it (`localStorage`) so they won't be asked again on that device. To force everyone to re-enter it, just change the passcode again.

## Editing content later

All text lives directly in `index.html` — search for the section you want to change (each is wrapped in a `<section id="...">` with a comment above it) and edit the text between the tags. Colors and fonts are controlled from the top of `css/style.css` in the `:root` block.
