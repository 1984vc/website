/**
 * Consent & Analytics Manager
 *
 * Simple c15t integration with PostHog analytics.
 */

import posthog from 'posthog-js';
import { configureConsentManager, createConsentManagerStore } from 'c15t';

// Configuration
const POSTHOG_API_KEY = 'phc_pHJHPnbMYIDtPIhCHqWSeUD5ho4GwjDBdRHtl8OiXBe';
const POSTHOG_HOST = 'https://us.i.posthog.com';
const C15T_BACKEND_URL = 'https://nineteen-eighty-four-us-east-production.c15t.dev';

// Configure c15t consent manager
export const consentManager = configureConsentManager({
  mode: "c15t",
  backendURL: C15T_BACKEND_URL
});

// Create consent store
export const store = createConsentManagerStore(consentManager, {
  initialGdprTypes: ["necessary", "measurement", "marketing"],
  ignoreGeoLocation: true // Always show banner (useful for dev/testing)
});

/**
 * Initialize PostHog
 */
function initializePostHog() {
  console.log('[Consent] Initializing PostHog');

  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    persistence: 'localStorage+cookie',
    autocapture: true,
    capture_pageview: false,
    opt_out_capturing_by_default: true,
    person_profiles: 'identified_only',
    loaded: () => {
      console.log('[Consent] PostHog loaded');
      applyConsent();
    }
  });
}

/**
 * Apply consent to PostHog based on c15t state
 */
function applyConsent() {
  const state = store.getState();
  const hasMeasurementConsent = state.consents?.measurement === true;

  console.log('[Consent] Applying consent. Measurement:', hasMeasurementConsent);

  if (hasMeasurementConsent) {
    console.log('[Consent] ✅ Analytics enabled');
    posthog.opt_in_capturing();
    posthog.capture('$pageview');
  } else {
    console.log('[Consent] ❌ Analytics disabled');
    posthog.opt_out_capturing();
  }
}

/**
 * Setup event handlers for our custom banner
 */
function setupBannerHandlers() {
  const acceptAllBtn = document.getElementById('consent-accept-all');
  const rejectAllBtn = document.getElementById('consent-reject-all');
  const savePreferencesBtn = document.getElementById('consent-save-preferences');
  const showDetailsBtn = document.getElementById('consent-show-details');
  const simpleView = document.getElementById('consent-simple-view');
  const detailsView = document.getElementById('consent-details-view');

  acceptAllBtn?.addEventListener('click', () => {
    console.log('[Consent] Accept all');
    store.getState().setConsent('necessary', true);
    store.getState().setConsent('measurement', true);
    store.getState().setConsent('marketing', true);
    hideBanner();
    applyConsent();
  });

  rejectAllBtn?.addEventListener('click', () => {
    console.log('[Consent] Reject all');
    store.getState().setConsent('necessary', true);
    store.getState().setConsent('measurement', false);
    store.getState().setConsent('marketing', false);
    hideBanner();
    applyConsent();
  });

  savePreferencesBtn?.addEventListener('click', () => {
    console.log('[Consent] Save preferences');
    const analyticsCheckbox = document.getElementById('consent-analytics') as HTMLInputElement;
    const marketingCheckbox = document.getElementById('consent-marketing') as HTMLInputElement;

    store.getState().setConsent('necessary', true);
    store.getState().setConsent('measurement', analyticsCheckbox?.checked || false);
    store.getState().setConsent('marketing', marketingCheckbox?.checked || false);
    hideBanner();
    applyConsent();
  });

  showDetailsBtn?.addEventListener('click', () => {
    if (simpleView && detailsView) {
      simpleView.style.display = 'none';
      detailsView.style.display = 'block';
    }
  });

  // "Manage Cookies" links in footer
  const manageCookiesLinks = document.querySelectorAll('[data-consent-manage]');
  manageCookiesLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showBanner();
      if (simpleView && detailsView) {
        simpleView.style.display = 'none';
        detailsView.style.display = 'block';
      }
    });
  });
}

/**
 * Show banner
 */
function showBanner() {
  const container = document.getElementById('consent-banner');
  if (container) {
    container.style.display = 'flex';
    container.setAttribute('aria-hidden', 'false');
  }
}

/**
 * Hide banner
 */
function hideBanner() {
  const container = document.getElementById('consent-banner');
  if (container) {
    if (document.activeElement && container.contains(document.activeElement)) {
      (document.activeElement as HTMLElement).blur();
    }
    container.style.display = 'none';
    container.setAttribute('aria-hidden', 'true');
  }
}

/**
 * Check if we should show the banner
 */
function checkBannerStatus() {
  const urlParams = new URLSearchParams(window.location.search);
  const forceShow = urlParams.has('test-consent');
  const reset = urlParams.has('reset-consent');

  if (reset) {
    console.log('[Consent] Resetting consent');
    localStorage.clear();
    urlParams.delete('reset-consent');
    const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
    window.history.replaceState({}, '', newUrl);
  }

  const state = store.getState();
  const hasConsent = state.consents && Object.keys(state.consents).length > 0;

  if (forceShow) {
    console.log('[Consent] Force showing banner');
    showBanner();
  } else if (state.showPopup || !hasConsent) {
    console.log('[Consent] Showing banner (no consent yet)');
    showBanner();
  } else {
    console.log('[Consent] Has consent, hiding banner');
    hideBanner();
  }
}

/**
 * Subscribe to consent changes
 */
function subscribeToConsentChanges() {
  store.subscribe((state) => {
    console.log('[Consent] State changed:', state.consents);
    applyConsent();
  });
}

/**
 * Initialize everything
 */
function initialize() {
  console.log('[Consent] Initializing');

  try {
    initializePostHog();
    subscribeToConsentChanges();
    setupBannerHandlers();
    checkBannerStatus();

    // Expose for debugging
    (window as any).__store = store;
    (window as any).__posthog = posthog;

    console.log('[Consent] ✅ Initialization complete');
  } catch (error) {
    console.error('[Consent] ❌ Initialization error:', error);
  }
}

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
