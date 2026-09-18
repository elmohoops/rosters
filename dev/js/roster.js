import {
  cleanNumber,
  cleanText,
  escapeHtml,
  normalizeForCompare
} from "./utils.js";

function classSlug(value) {
  return cleanText(value)
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPlayers(rosterRows, season, team) {
  return rosterRows
    .filter(
      (row) =>
        normalizeForCompare(row.Season) === normalizeForCompare(season) &&
        normalizeForCompare(row.Team) === normalizeForCompare(team)
    )
    .sort((a, b) => cleanNumber(a.Order) - cleanNumber(b.Order));
}

export function renderRoster(players) {
  if (!players.length) {
    return `<p class="empty-message">No players are listed for this team and season.</p>`;
  }

  const cards = players.map((player) => {
    const name = escapeHtml(cleanText(player["Player Name"]));
    const rawClass = cleanText(player.Class);
    const playerClass = escapeHtml(rawClass);
    const playerClassSlug = classSlug(rawClass);
    const jersey = cleanText(player.Jersey);

    const jerseyMarkup = jersey
      ? `<span class="jersey-number" aria-label="Jersey number ${escapeHtml(jersey)}">#${escapeHtml(jersey)}</span>`
      : "";

    const classMarkup = playerClass
      ? `<span class="class-badge ${playerClassSlug}">${playerClass}</span>`
      : "";

    return `
      <article class="player-card${jersey ? " has-number" : ""}">
        ${jerseyMarkup}
        <h3 class="player-name">${name}</h3>
        ${classMarkup}
      </article>
    `;
  }).join("");

  return `<div class="roster-grid">${cards}</div>`;
}
