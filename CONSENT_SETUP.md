# Cookie Consent & Analytics Setup

This document describes the cookie consent management and PostHog analytics integration for the 1984 Ventures website.

## Overview

We use:
- **c15t** - A headless GDPR-compliant consent management system (offline mode, stores in localStorage)
- **PostHog** - Analytics platform configured to respect user consent
- **TypeScript** - Type-safe development with bundling to single JS file

## Architecture

### Components

1. **TypeScript Source** (`src/consent-analytics.ts`)
   - Initializes c15t consent manager in offline mode
   - Configures PostHog with opt-out by default
   - Manages consent state changes and syncs with PostHog
   - Handles banner UI interactions

2. **Cookie Banner UI** (`layouts/partials/cookie-banner.html`)
   - HTML structure for the consent modal
   - Inline CSS for styling (no external dependencies)
   - Accessible, keyboard-navigable, mobile-responsive
   - Two views: Simple (Accept/Reject/Customize) and Detailed (per-category selection)

3. **Scripts Loader** (`layouts/partials/scripts.html`)
   - Loads the bundled consent-analytics.js
   - Included in base template

4. **Footer Integration** (`layouts/partials/footer.html`)
   - "Manage Cookie Preferences" link to reopen banner
   - Link to Privacy Policy

## Build Process

The TypeScript source is bundled into a single JavaScript file:

```bash
pnpm run build:js
```

This runs:
```bash
esbuild src/consent-analytics.ts --bundle --minify --outfile=static/js/consent-analytics.js --format=iife --target=es2020
```

Output: `static/js/consent-analytics.js` (~184KB minified)

## Configuration

### PostHog API Key

The PostHog API key is currently hardcoded in `src/consent-analytics.ts`:

```typescript
const POSTHOG_API_KEY = 'phc_your_api_key_here';
```

**To set your actual PostHog key:**

1. Open `src/consent-analytics.ts`
2. Replace `'phc_your_api_key_here'` with your actual PostHog project API key
3. Run `pnpm run build:js` to rebuild

### c15t Configuration

Currently using **hosted backend mode** with consent.io:

**Instance URL:** `https://nineteen-eighty-four-us-east-production.c15t.dev`

This provides:
- ✅ Consent analytics dashboard
- ✅ Geolocation detection (show banner based on visitor location)
- ✅ Centralized consent management
- ✅ Audit logs and compliance reports

**Important:** You must configure **Trusted Origins** in your c15t console. See `C15T_HOSTED_SETUP.md` for complete setup instructions.

**To switch back to offline mode** (no backend):
1. Update `src/consent-analytics.ts` to use `OfflineClient` instead of `C15tClient`
2. Rebuild: `pnpm run build:js`

## Cookie Categories

Three categories are tracked:

1. **Functional** (always enabled) - Required for website operation
2. **Analytics** - PostHog usage analytics (opt-in)
3. **Marketing** - Marketing cookies (opt-in)

## PostHog Integration

PostHog is initialized with:
- `opt_out_capturing_by_default: true` - User must consent first
- `capture_pageview: false` - Manual pageview tracking after consent check
- `persistence: 'localStorage+cookie'` - Standard persistence mode

When user accepts analytics:
- PostHog calls `opt_in_capturing()`
- Pageview is captured
- Cookies and localStorage are used for tracking

When user rejects analytics:
- PostHog stays in opted-out mode
- No cookies or persistent identifiers are stored

## Development Workflow

### Making Changes

1. Edit TypeScript source: `src/consent-analytics.ts`
2. Rebuild JavaScript: `pnpm run build:js`
3. Test locally: `pnpm run dev` or `hugo server`
4. Check browser console for `[Consent]` logs

### Testing Consent Flow

1. Open site in browser
2. Clear localStorage: `localStorage.clear()` in console
3. Reload page - banner should appear
4. Test both "Accept All" and "Reject All"
5. Check PostHog dashboard for events
6. Click "Manage Cookie Preferences" in footer to reopen

### Debugging

The consent system exposes global variables for debugging:

```javascript
// In browser console:
__consentStore.getState()  // Check current consent state
__posthog.has_opted_in_capturing()  // Check PostHog opt-in status
```

## Files Modified/Created

### Created
- `src/consent-analytics.ts` - Main TypeScript source
- `static/js/consent-analytics.js` - Bundled output (generated)
- `layouts/partials/cookie-banner.html` - Banner UI
- `layouts/partials/scripts.html` - Script loader
- `tsconfig.json` - TypeScript configuration
- `CONSENT_SETUP.md` - This file

### Modified
- `package.json` - Added dependencies and build script
- `layouts/_default/baseof.html` - Include cookie banner and scripts
- `layouts/partials/footer.html` - Added "Manage Cookies" link

### Dependencies Added
- `c15t` - Consent management
- `posthog-js` - Analytics
- `typescript` - Type checking
- `esbuild` - Fast bundler

## Privacy & Compliance

### GDPR Compliance

✅ **Explicit Consent** - Users must actively accept cookies
✅ **Granular Control** - Per-category consent options
✅ **Easy to Revoke** - "Manage Cookie Preferences" always accessible
✅ **Opt-out by Default** - No tracking until consent given
✅ **Clear Information** - Cookie descriptions in banner

### Data Storage

- **Consent preferences**: Stored in localStorage only (offline mode)
- **Analytics data**: Only stored if user accepts analytics
- **No third-party tracking**: Without consent

## Accessibility

The cookie banner is fully accessible:
- ✅ Keyboard navigable (Tab, Enter, Escape)
- ✅ ARIA labels and roles
- ✅ Focus management and trapping
- ✅ Screen reader announcements
- ✅ High contrast support

## Mobile Responsive

The banner adapts to mobile screens:
- Responsive width (90% on mobile, max 600px on desktop)
- Stack buttons vertically on narrow screens
- Touch-friendly hit targets
- Readable font sizes

## Future Enhancements

Potential improvements:

1. **Environment Variables** - Move PostHog key to env var
2. **Cookie Policy Page** - Detailed cookie documentation
3. **Consent Analytics** - Track consent acceptance rates
4. **A/B Testing** - Test different banner copy
5. **Translations** - Multi-language support
6. **GTM Integration** - Google Tag Manager integration

## Support

For issues or questions:
- c15t documentation: https://docs.c15t.com
- PostHog documentation: https://posthog.com/docs
- This repo's issues: https://github.com/1984vc/website/issues
