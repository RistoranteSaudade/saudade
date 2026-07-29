// Avoid inline event handlers (CSP script-src 'self') while still switching fonts from media="print" to "all"
// once the Google Fonts stylesheet finishes loading.
(function () {
  window.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('google-fonts');
    if (!link) return;

    var enable = function () {
      try {
        link.media = 'all';
      } catch {}
    };

    link.addEventListener('load', enable, { once: true });
    link.addEventListener('error', enable, { once: true });

    // ponytail: conservative fallback if 'load' doesn't fire for any reason.
    window.setTimeout(enable, 3000);
  });
})();

