import { CONFIG } from "./config.js";
import { getCoaches, renderCoaches } from "./coaches.js";
import { getPlayers, renderRoster } from "./roster.js";
import { getCurrentSeason, loadRosterData } from "./sheets.js";
import { escapeHtml, getRequestedTeam } from "./utils.js";

const app = document.querySelector("#app");

async function startApp() {
  const team = getRequestedTeam(CONFIG.defaultTeam);
  const displayTeam = CONFIG.teamDisplayNames?.[team] || team;
  const loadingText = document.querySelector("#loadingText");

  if (loadingText) {
    loadingText.textContent = `Loading ${displayTeam} roster…`;
  }

  try {
    const data = await loadRosterData();
    const season = getCurrentSeason(data.configuration);
    const players = getPlayers(data.rosters, season, team);
    const coaches = getCoaches(data.coaches, season, team);

    document.title = `${displayTeam} Basketball Roster | El Modena`;

    app.innerHTML = `
      <header class="team-header">
        <p class="school-name">${escapeHtml(CONFIG.schoolName)}</p>
        <h1 class="team-name">${escapeHtml(displayTeam)} Basketball</h1>
        <p class="season">${escapeHtml(season)}</p>
      </header>

      <section class="section" aria-labelledby="coachesHeading">
        <h2 class="section-heading" id="coachesHeading">Coaching Staff</h2>
        ${renderCoaches(coaches)}
      </section>

      <section class="section" aria-labelledby="rosterHeading">
        <h2 class="section-heading" id="rosterHeading">Roster</h2>
        ${renderRoster(players)}
      </section>
    `;
  } catch (error) {
    console.error(error);

    app.innerHTML = `
      <section class="error-state" role="alert">
        <h2>Roster unavailable</h2>
        <p>${escapeHtml(error.message)}</p>
        <p>Please try refreshing the page.</p>
      </section>
    `;
  }
}

startApp();
