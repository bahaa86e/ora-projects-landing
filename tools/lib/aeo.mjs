import { esc } from "./helpers.mjs";

function listItems(arr) {
  return (arr || []).map((t) => `<li>${esc(t)}</li>`).join("");
}

/** Units / money pages: urgency + trust in one compact block */
export function urgencyStripHtml(L) {
  const urgent = listItems(L.unitsUrgencyList);
  const trust = listItems(L.unitsTrustList);
  if (!urgent && !trust) return "";
  const title = L.unitsSignalTitle || L.unitsUrgencyTitle || "";
  const uLabel = L.unitsUrgencyLabel || "";
  const tLabel = L.unitsTrustLabel || "";
  const grid = `<div class="urgency-strip__grid">${urgent ? `<div class="urgency-strip__cluster"><p class="urgency-strip__label">${esc(uLabel)}</p><ul class="urgency-strip__list">${urgent}</ul></div>` : ""}${trust ? `<div class="urgency-strip__cluster"><p class="urgency-strip__label">${esc(tLabel)}</p><ul class="urgency-strip__list">${trust}</ul></div>` : ""}</div>`;
  return `<aside class="urgency-strip urgency-strip--dual urgency-strip--premium" aria-label="${esc(title)}">${title ? `<p class="urgency-strip__title">${esc(title)}</p>` : ""}${grid}</aside>`;
}

/** Hero: compact trust pills (optional heroTrustList; else unitsTrustList) */
export function trustStripHtml(L) {
  const pillSource = L.heroTrustList || L.unitsTrustList || [];
  const items = pillSource.map((t) => `<span>${esc(t)}</span>`).join("");
  if (!items) return "";
  return `<div class="trust-strip trust-strip--hero" role="list">${items}</div>`;
}

/** Featured-snippet style triad: price, location, payment plan */
export function aeoTriadHtml(L, triad) {
  if (!triad?.price) return "";
  return `<div class="aeo-triad">
  <div class="aeo-triad__item">
    <h3 class="aeo-triad__h">${esc(L.aeoPriceLabel)}</h3>
    <p class="aeo-triad__p">${esc(triad.price)}</p>
  </div>
  <div class="aeo-triad__item">
    <h3 class="aeo-triad__h">${esc(L.aeoLocationLabel)}</h3>
    <p class="aeo-triad__p">${esc(triad.location)}</p>
  </div>
  <div class="aeo-triad__item">
    <h3 class="aeo-triad__h">${esc(L.aeoPaymentLabel)}</h3>
    <p class="aeo-triad__p">${esc(triad.payment)}</p>
  </div>
</div>`;
}
