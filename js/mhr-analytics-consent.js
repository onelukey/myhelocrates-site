/* MHR-001: Analytics opt-in only. Not an advertising CMP. */
(function () {
  'use strict';
  var key = 'mhr_analytics_consent_v1';
  var measurementId = 'G-9RLKEB7GMX';
  var panel = document.getElementById('mhr-consent');
  var settings = document.getElementById('mhr-consent-settings');
  var accept = document.getElementById('mhr-accept');
  var reject = document.getElementById('mhr-reject');
  if (!panel || !settings || !accept || !reject) return;
  var loaded = false;
  function read() { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function write(value) { try { localStorage.setItem(key, value); } catch (e) {} }
  function startAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }
  function apply(choice) {
    panel.hidden = true;
    settings.hidden = false;
    if (choice === 'accept') startAnalytics();
    if (choice === 'reject' && loaded) window.location.reload();
  }
  accept.addEventListener('click', function () { write('accept'); apply('accept'); });
  reject.addEventListener('click', function () { write('reject'); apply('reject'); });
  settings.addEventListener('click', function () {
    panel.hidden = false;
    settings.hidden = true;
    reject.focus();
  });
  var saved = read();
  if (saved === 'accept' || saved === 'reject') apply(saved);
  else { panel.hidden = false; settings.hidden = true; }
})();
