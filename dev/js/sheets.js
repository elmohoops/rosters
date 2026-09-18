import { CONFIG } from "./config.js";
import { cleanText } from "./utils.js";

function buildSheetUrl(sheetName) {
  const params = new URLSearchParams({
    tqx: "out:csv",
    sheet: sheetName
  });

  return `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/gviz/tq?${params}`;
}

// Small CSV parser that handles Google Sheets quoted CSV output.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  return rows.filter((currentRow) =>
    currentRow.some((value) => cleanText(value) !== "")
  );
}

function rowsToObjects(rows) {
  if (!rows.length) return [];

  const headers = rows[0].map(cleanText);

  return rows.slice(1).map((row) => {
    const record = {};

    headers.forEach((header, index) => {
      if (header) {
        record[header] = cleanText(row[index]);
      }
    });

    return record;
  });
}

export async function loadSheet(sheetName) {
  const response = await fetch(buildSheetUrl(sheetName), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Unable to load the ${sheetName} sheet (${response.status}).`);
  }

  const text = await response.text();

  // Google occasionally returns an HTML permission page rather than CSV.
  if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
    throw new Error(
      `Google returned a web page instead of ${sheetName} data. Make sure the spreadsheet remains publicly published.`
    );
  }

  return rowsToObjects(parseCsv(text));
}

export async function loadRosterData() {
  const [configuration, rosters, coaches] = await Promise.all([
    loadSheet(CONFIG.sheets.configuration),
    loadSheet(CONFIG.sheets.rosters),
    loadSheet(CONFIG.sheets.coaches)
  ]);

  return { configuration, rosters, coaches };
}

export function getCurrentSeason(configurationRows) {
  // Configuration is intentionally a simple Key / Value table.
  const setting = configurationRows.find(
    (row) => cleanText(row.Key).toLocaleLowerCase() === "currentseason"
  );

  if (!setting?.Value) {
    throw new Error("CurrentSeason was not found on the Configuration sheet.");
  }

  return cleanText(setting.Value);
}
