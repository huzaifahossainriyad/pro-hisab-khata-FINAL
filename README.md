<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Ej4_cLUsVkhS1f1hxLlrYdDmFE4D8ONZ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Supabase Setup
1. Open Supabase > SQL Editor and paste `supabase_setup.sql` contents. Run.
2. In `.env.local`, confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Run `npm install` then `npm run dev`.


## Final Supabase Setup
1) SQL Editor → open `supabase_setup.sql` → Run (accept DROP POLICY warning).
2) Auth → Providers → Enable **Anonymous**.
3) `.env.local` already has VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY.
4) Dev: `npm install` → `npm run dev` (http://localhost:3000).
