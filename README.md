# OTA-updatesfiles

Meant for all device OTA updates and functions

Deployment & hosted URLs
------------------------

- Frontend (hosted on Vercel): <https://myprojectsota.vercel.app/>
- Backend / API (hosted on Render): <https://ota-bakfiles.onrender.com/>

Configuration notes
-------------------

- Frontend: set VITE_API_URL in `frontend/.env` e.g.
 VITE_API_URL=<https://ota-bakfiles.onrender.com/api>
- Backend: use environment variables to configure production settings, e.g.:
- SECRET_KEY
- DEBUG
- ALLOWED_HOSTS (comma separated)
- CORS_ALLOWED_ORIGINS (comma separated)

I updated `frontend/src/api/auth.js` to read the API URL from `import.meta.env.VITE_API_URL` (with a localhost fallback), and `backend/onair/settings.py` to support your hosted domains in the default CORS and allowed hosts configuration.
