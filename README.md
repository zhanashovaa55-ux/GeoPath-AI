# GeoPath AI — Live Gemini edition

This website has three difficulty levels, verified geometry exercises, hints, worked solutions and an actual Gemini-powered AI coach.

## Installation
1. Upload the **contents** of this folder to the ROOT of your GitHub repository. Preserve `netlify/functions/coach.js`.
2. Netlify must be linked to that GitHub repository. Check the latest deployment says **Published**.
3. In Netlify → Environment variables, add `GEMINI_API_KEY` with the secret Google AI Studio API key. Set for all contexts.
4. Trigger a fresh deploy in Netlify after changing the key.
5. Open the site and ask a question. A successful reply is labeled `LIVE GEMINI AI`.

If Gemini is unavailable, the site displays the actual error instead of calling a fixed template an AI response. A valid key, accessible model and remaining quota are essential; these cannot be guaranteed by website code. Do not put your API key in GitHub or in HTML.
