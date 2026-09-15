# El Modena Basketball Rosters

Responsive roster application for the El Modena Vanguards Boys Basketball
website.

The application is hosted with GitHub Pages and embedded into the main
ELMO Hoops Wix website. Player rosters, coaching staffs, team
information, and the current season are maintained in Google Sheets.

## Live Sites

Main website:

https://www.elmohoops.org/

Roster application:

https://elmohoops.github.io/rosters/

The GitHub Pages application is intended primarily to be displayed
inside the Wix website rather than used as a standalone website.

Different team rosters are selected using the `team` query parameter.

Examples:

-   Varsity: `https://elmohoops.github.io/rosters/?team=Varsity`
-   Junior Varsity:
    `https://elmohoops.github.io/rosters/?team=Junior%20Varsity`
-   Frosh/Soph: `https://elmohoops.github.io/rosters/?team=Frosh%2FSoph`
-   Freshman: `https://elmohoops.github.io/rosters/?team=Freshman`

## Architecture

The ELMO Hoops website uses three primary services.

### Wix

Wix hosts the main public website:

https://www.elmohoops.org/

Wix controls the site navigation, page layout, registration links,
sponsor information, contact information, and other normal website
content.

Dynamic portions of the website are embedded as GitHub Pages
applications using Wix HTML/iframe elements.

### GitHub

GitHub hosts the custom web applications used by the website.

Organization:

https://github.com/elmohoops

Repositories:

-   `schedule` - Game and event schedule
-   `rosters` - Team rosters and coaching staffs
-   `board` - Booster Board directory

Each application is hosted using GitHub Pages.

### Google

Google provides the data used by the GitHub applications.

The Rosters application reads from Google Sheets.

The Schedule application reads from Google Calendar.

The Booster Board application also reads from Google Sheets.

This separation allows routine roster and coaching updates to be made in
Google Sheets without modifying application code.

## Roster Data

Roster and coaching information is maintained in one Google Sheet.

The spreadsheet contains three important tabs:

-   `Rosters`
-   `Coaches`
-   `Configuration`

### Rosters Tab

The `Rosters` tab contains player information.

Columns:

``` text
Season | Team | Order | Jersey | Player Name | Class
```

#### Season

Identifies the basketball season for the roster entry.

Example:

`2026-2027`

Historical seasons can remain in the spreadsheet. The website displays
only entries matching the season specified by `CurrentSeason` in the
Configuration tab.

#### Team

Identifies the team.

Team names must match the values expected by the website.

Current team names include:

-   Varsity
-   Junior Varsity
-   Frosh/Soph
-   Freshman

#### Order

Controls the display order of players within a team.

Use numeric values.

#### Jersey

Optional jersey number.

If a jersey number is present, the website displays it in the player's
roster card. If the field is blank, no jersey-number badge is displayed.

#### Player Name

Player's displayed name.

#### Class

Player's class/year.

Examples include:

-   Senior
-   Junior
-   Sophomore
-   Freshman

The application visually differentiates class levels with badges.

### Coaches Tab

The `Coaches` tab contains coaching staff information.

Columns:

``` text
Season | Team | Order | Name | Title
```

#### Season

Must match the appropriate season.

#### Team

Must use the same team naming convention used in the Rosters tab.

#### Order

Controls the order in which coaches are displayed.

The Head Coach should normally have the lowest order number so that the
Head Coach appears first.

#### Name

Coach's displayed name.

#### Title

Free-text coaching title.

Examples:

-   Head Coach
-   Assistant Coach
-   Shooting Coach
-   Defensive Coach

Do not restrict this field to a fixed list because coaching roles may
vary from year to year.

### Configuration Tab

The `Configuration` tab stores application-level settings.

Columns:

``` text
Key | Value
```

The most important setting is:

``` text
CurrentSeason | 2026-2027
```

The website uses `CurrentSeason` to determine which roster and coaching
records to display.

## Starting a New Season

The spreadsheet is designed to retain historical roster information.

To prepare for a new basketball season:

1.  Add the new season's players to the `Rosters` tab.
2.  Add the new season's coaches to the `Coaches` tab.
3.  Verify team names and Order values.
4.  Update `CurrentSeason` in the `Configuration` tab.
5.  Verify each team page on the website.

There is normally no need to delete the previous season's information.

There is normally no need to modify GitHub code when starting a new
season.

## Google Sheets Integration

The application reads Google Sheets data through Google's Visualization
CSV endpoint.

The Google Sheet ID and tab names are configured in:

`js/config.js`

The spreadsheet must remain accessible in a way that allows the
application to retrieve its published data.

If roster information stops loading, check:

1.  The Google Sheet still exists.
2.  The expected sheet tabs have not been renamed.
3.  The sheet is still published/accessible as required.
4.  Column headings have not been changed.
5.  `CurrentSeason` matches the Season values in the roster and coaching
    rows.
6.  Team names match between the spreadsheet and the website query
    parameters.

## Repository Structure

``` text
rosters/
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── config.js
│   ├── sheets.js
│   └── roster.js
├── index.html
└── README.md
```

## Application Flow

`index.html` loads the roster application.

The JavaScript modules separate responsibilities:

-   `config.js` - Google Sheet ID and application configuration
-   `sheets.js` - Retrieves and parses Google Sheets data
-   `roster.js` - Roster/team data handling and presentation logic
-   `app.js` - Application startup and coordination

The application:

1.  Reads the requested team from the URL `team` parameter.
2.  Retrieves the Configuration, Rosters, and Coaches data.
3.  Determines the current season from `CurrentSeason`.
4.  Filters players and coaches by season and team.
5.  Sorts entries using the `Order` field.
6.  Renders the coaching staff and roster.

## Team URLs and Wix Integration

Wix uses the same GitHub Pages application for all team pages.

The `team` query parameter determines which roster is displayed.

Examples:

``` text
https://elmohoops.github.io/rosters/?team=Varsity
https://elmohoops.github.io/rosters/?team=Junior%20Varsity
https://elmohoops.github.io/rosters/?team=Frosh%2FSoph
https://elmohoops.github.io/rosters/?team=Freshman
```

Each Wix team page embeds the appropriate URL using an HTML/iframe
element.

If the GitHub organization or repository is ever renamed, all Wix roster
iframe URLs may need to be updated.

## Roster Features

The application currently supports:

-   Multiple teams from one application
-   Multiple seasons in one Google Sheet
-   Current-season filtering
-   Separate player and coaching data
-   Custom player ordering
-   Custom coach ordering
-   Optional jersey numbers
-   Player class badges
-   Responsive desktop/mobile layout
-   Transparent application background for integration with the Wix
    basketball-court background
-   GitHub Pages hosting
-   Wix iframe embedding

## Making Routine Roster Changes

Most roster changes DO NOT require changes to GitHub.

Use the Google Sheet to:

-   Add or remove players
-   Correct player names
-   Add jersey numbers
-   Change player classes
-   Reorder players
-   Add or remove coaches
-   Change coaching titles
-   Reorder coaches
-   Prepare the next season
-   Change the current season

GitHub should normally only be changed when modifying the appearance,
behavior, configuration, or functionality of the roster application.

## Deploying Code Changes

Recommended workflow:

1.  Make the required code change.
2.  Test the application directly through GitHub Pages when appropriate.
3.  Test all affected team query parameters.
4.  Verify desktop behavior.
5.  Verify mobile behavior.
6.  Commit the tested changes to `main`.
7.  Allow GitHub Pages to redeploy.
8.  Verify the production GitHub Pages application.
9.  Verify the affected roster pages on ELMOHoops.org.

For significant stable releases, create a Git tag/release.

## Troubleshooting

### No roster appears

Check that:

-   `CurrentSeason` is set correctly.
-   The requested team name matches the spreadsheet exactly.
-   Players exist for that Season and Team combination.
-   The Google Sheet is accessible.

### Coaches do not appear

Check that:

-   Coach Season matches `CurrentSeason`.
-   Coach Team matches the requested team.
-   The `Coaches` tab name and column headings have not changed.

### Wrong team appears

Check the Wix iframe URL and its `?team=` parameter.

Pay special attention to URL encoding for team names containing spaces
or `/`.

### New season does not appear

Verify that `CurrentSeason` in the Configuration tab exactly matches the
Season value used in the new roster and coaching rows.

### Application formatting is missing

Verify that GitHub Pages is publishing from the expected branch/root and
that the CSS and JavaScript files still exist at the expected relative
paths.

## Ownership and Future Website Managers

The application is owned by the `elmohoops` GitHub Organization rather
than an individual volunteer's GitHub account.

Future website managers should use their own GitHub accounts and be
granted appropriate access to the `elmohoops` organization.

Do not share a common GitHub username/password between website managers.

The outgoing Website Manager should ensure that the incoming Website
Manager has access to:

-   ELMO Hoops Wix website
-   ELMO Hoops GitHub organization
-   ELMO Hoops Google account and roster spreadsheet
-   Any other program accounts required to maintain the website

## Related Applications

### Schedule

Repository:

https://github.com/elmohoops/schedule

GitHub Pages:

https://elmohoops.github.io/schedule/

Schedule information is maintained in Google Calendar.

### Booster Board

Repository:

https://github.com/elmohoops/board

GitHub Pages:

https://elmohoops.github.io/board/

Booster Board information is maintained in Google Sheets.

## Maintenance Philosophy

The system is intentionally designed so that normal basketball-season
maintenance does not require programming knowledge.

Routine content belongs in:

-   Google Calendar for schedules
-   Google Sheets for rosters, coaches, and Booster Board information
-   Wix for normal website content

GitHub contains the code that presents the dynamic Google data on the
Wix website.

When possible, keep this separation intact.
