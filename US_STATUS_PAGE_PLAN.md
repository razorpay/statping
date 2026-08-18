# Plan: Enable Status Page for Razorpay US

## Current State

The production status page at `status.razorpay.com` runs on the `external_status_page` branch of `razorpay/statping`. It consists of:

- **Go backend** (Statping fork) — serves a REST API (`/api/*`, `/services/*`) for services, downtimes, groups, incidents
- **React frontend** (`react-frontend/`) — the public-facing status page (replaces the original Vue frontend)
- **Vue admin dashboard** (`frontend/`) — internal management UI for services, downtimes, settings

**India was hardcoded in 7 locations across the codebase. There was zero multi-region support** — no region field in the data model, no config dimension, no API filtering. The backend logic (downtimes, service checking, block_series) is region-agnostic except for timezone.

## Approach: Separate Deployment with Parameterized Build

Spin up a **second statping instance** for US with its own database, config, and a React build parameterized via `REACT_APP_REGION=US`. This avoids touching the India deployment and requires minimal code changes.

## Changes Implemented

### Phase 1: React Frontend Region-Aware

| File | Change |
|---|---|
| `react-frontend/src/utils/constants.js` | Added `REGIONS` config object with per-region branding (flag, tooltip, titles, URLs) and `REGION` export driven by `process.env.REACT_APP_REGION` (defaults to `IN`) |
| `react-frontend/src/components/Navbar/images/us-flag.svg` | New US flag SVG asset (same 28x20 dimensions as india-flag.svg) |
| `react-frontend/src/components/Navbar/index.js` | Replaced hardcoded India flag, tooltip, and dashboard URLs with `REGION.flag`, `REGION.flagTooltip`, `REGION.logoUrl`, `REGION.loginUrl`, `REGION.signupUrl` |
| `react-frontend/src/components/ContentHeader.jsx` | Replaced hardcoded "Razorpay Status Page" title, description, and support URL with `REGION.headerTitle`, `REGION.headerDescription`, `REGION.supportUrl` |
| `react-frontend/src/components/ServicesPage.jsx` | Replaced hardcoded "Razorpay Payments" with `REGION.sectionTitle` |
| `react-frontend/src/components/App.jsx` | Added `useEffect` to set `document.title` and meta description from `REGION.pageTitle` at runtime |

### Phase 2: Backend Timezone Configurable

| File | Change |
|---|---|
| `cmd/main.go` (line 31-37) | Replaced hardcoded `Asia/Kolkata` with `TIMEZONE` env var (defaults to `Asia/Kolkata` if unset) |
| `Dockerfile` (line 25-26) | Added `ENV TIMEZONE="Asia/Kolkata"` as default, overridable at container runtime |

### Phase 3: US Deployment Config

| File | Change |
|---|---|
| `configs/prod-us.yml` | New config file — US domain (`status-us.razorpay.com`), US name/description, same DB env var pattern. Loaded automatically when `APP_ENV=prod-us` |

### Phase 4: CI & Build Pipeline

| File | Change |
|---|---|
| `Dockerfile.base` (line 14-15) | Added `ARG REACT_APP_REGION` and `ENV REACT_APP_REGION=$REACT_APP_REGION` before the React `yarn build` step |
| `.github/workflows/ci.yml` | Added `build-statping-us-docker-image` job that builds with `REACT_APP_REGION=US`, pushes `razorpay/statping:base_us_${sha}` and `razorpay/statping:service_us_${sha}` |

## Deployment Steps (for the US team)

1. **DNS** — Register `status-us.razorpay.com` (or chosen domain) and point to the US statping instance
2. **Database** — Provision a separate Postgres instance for US
3. **Container** — Deploy with env vars:
   ```
   APP_ENV=prod-us
   TIMEZONE=America/Los_Angeles
   DATABASE_URL=<us-postgres-host>
   DATABASE_NAME=<us-db-name>
   DATABASE_USERNAME=<us-db-user>
   DATABASE_PASSWORD=<us-db-pass>
   ```
4. **Image** — Use `razorpay/statping:service_us_<sha>` (built with `REACT_APP_REGION=US`)
5. **Services** — Add US-specific services to monitor via the admin dashboard or `services.yml`
6. **Notifications** — Configure Slack/email notifiers for the US team
7. **Admin users** — Create admin accounts for US team members

## Open Questions

1. **Domain** — Confirm the US status page domain (`status-us.razorpay.com`?)
2. **Timezone** — Confirm display timezone (America/Los_Angeles? America/New_York? UTC?)
3. **Services** — Which US-specific endpoints/services to monitor?
4. **URLs** — Confirm US-specific support, login, and signup URLs
5. **Flag** — Should the US page show a US flag, or no flag at all?
