export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function cleanText(value) {
  return String(value ?? "").trim();
}

export function cleanNumber(value, fallback = 9999) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function getRequestedTeam(defaultTeam) {
  const params = new URLSearchParams(window.location.search);
  return cleanText(params.get("team")) || defaultTeam;
}

export function normalizeForCompare(value) {
  return cleanText(value).toLocaleLowerCase();
}
