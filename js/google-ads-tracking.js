/**
 * Google Ads — WhatsApp click conversions.
 * Replace WHATSAPP_CONVERSION_SEND_TO with your Ads conversion action "send_to"
 * (Google Ads → Tools → Conversions → select action → Tag setup).
 */
(function () {
  "use strict";

  var WHATSAPP_CONVERSION_SEND_TO = "AW-XXXXXXX/WHATSAPP_CONVERSION_LABEL";

  document.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      var a = t && t.closest ? t.closest('a[href*="wa.me"]') : null;
      if (!a || !a.getAttribute("href")) return;
      if (typeof gtag !== "function") return;
      gtag("event", "conversion", {
        send_to: WHATSAPP_CONVERSION_SEND_TO,
        transport_type: "beacon",
      });
    },
    true
  );
})();
