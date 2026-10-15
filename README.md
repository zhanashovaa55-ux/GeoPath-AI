# GeoPath AI — Adaptive Geometry Studio

A responsive, three-level Pythagorean-theorem learning app for the **Web-Based AI Math Differentiator** assignment.

## Features
- Foundation: direct Pythagorean calculation with a guided hint.
- Standard: real-world perpendicular-path model.
- Advanced: rectangular garden diagonal plus material-feasibility reasoning.
- Instant numerical feedback, hints, verified worked solutions, rotating problem parameters, responsive SVG diagram.
- Optional **live Gemini AI coach** via Netlify serverless function; the API key remains server-side.
- Clearly labeled deterministic local fallback if the AI endpoint is unavailable.

## Run locally
Open `index.html` in any browser. Core exercises, hints, solutions, and checks work offline. The AI coach will use the explicitly labeled local fallback.

## Deploy with live AI
1. Create a **public GitHub repository** and upload all files, keeping the `netlify/functions` directory structure.
2. In Netlify, choose **Add new project → Import an existing project → GitHub** and select the repository.
3. Set publish directory to `.`; deploy.
4. In Netlify site configuration, add environment variable `GEMINI_API_KEY` with your own Google AI Studio key. **Never commit the key to GitHub or put it in HTML.**
5. Trigger a new deploy, then test **Ask coach** and the three levels.
6. Submit the Netlify live URL, the public repository URL, and the one-page report.

**Note:** Gemini model names and free-tier availability can change. If the model returns an error, update the model name in `netlify/functions/coach.js` to one currently available for your key, redeploy, and retest.

## Test checklist
- All three difficulty tabs update objective, context, and diagram.
- Check a correct and incorrect answer on each level.
- Verify the hint does not reveal the entire answer and the solution is mathematically correct.
- Advanced tasks correctly compare required length to available material.
- Check mobile layout and live AI endpoint after deployment.

## Educational approach
One shared goal—apply the Pythagorean theorem to reason about right triangles—while scaffolding, cognitive demand, and contextual interpretation vary by readiness level. The teacher remains responsible for validating all model-generated explanations.
