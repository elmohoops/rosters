import {
  cleanNumber,
  cleanText,
  escapeHtml,
  normalizeForCompare
} from "./utils.js";

export function getCoaches(coachRows, season, team) {
  return coachRows
    .filter(
      (row) =>
        normalizeForCompare(row.Season) === normalizeForCompare(season) &&
        normalizeForCompare(row.Team) === normalizeForCompare(team)
    )
    .sort((a, b) => cleanNumber(a.Order) - cleanNumber(b.Order));
}

export function renderCoaches(coaches) {
  if (!coaches.length) {
    return `<p class="empty-message">Coaching staff has not been listed yet.</p>`;
  }

  return `
    <div class="coaches">
      ${coaches.map((coach) => `
        <div class="coach">
          <p class="coach-name">${escapeHtml(cleanText(coach.Name))}</p>
          <p class="coach-title">${escapeHtml(cleanText(coach.Title))}</p>
        </div>
      `).join("")}
    </div>
  `;
}
