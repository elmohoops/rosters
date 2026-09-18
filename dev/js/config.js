export const CONFIG = {
  // Google Sheet used by the live roster application.
  spreadsheetId: "1sI8pR5-40Wqur6oGM3lsqFjGCmmPHhJKJBknfCA9amc",

  sheets: {
    configuration: "Configuration",
    rosters: "Rosters",
    coaches: "Coaches"
  },

  schoolName: "El Modena Vanguards",
  defaultTeam: "Varsity",

  // Data values stay simple and consistent in Google Sheets.
  // These labels are only for nicer on-screen presentation.
  teamDisplayNames: {
    "Varsity": "Varsity",
    "Junior Varsity": "Junior Varsity",
    "Frosh/Soph": "Frosh / Soph",
    "Freshman": "Freshman"
  }
};
