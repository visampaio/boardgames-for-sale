const CLIENT_ID = '37348095959-i0nd20ns5vklh6q2drb7mf2am83vqou4.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDaGUPSr4asMfHt_Qlie01vzbpl8B35nBo';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;
let retries = 3;

let sheetId = (localStorage.getItem("sheetID") !== null) ? JSON.parse(localStorage.getItem("sheetID")) : prompt("Enter the Google Spreadsheet ID");
localStorage.setItem("sheetID", JSON.stringify(sheetId));

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
   await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  parseSheet();
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
}

async function parseSheet() {
  try {
    // Reads values on the spreadsheet, starting from row 2.
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "A2:G100",
    });

  let completeList = response.result.values;
    bgList = completeList.map(row => new Game(row));
    displayGames(bgList);
  } catch (error) {
    if (retries > 0) {
      console.log(`Encountered ${error.status}. Retrying in 2s...`);
      setTimeout(() => parseSheet(), 2000);
      retries--;
    }
    else {
      console.log("Failed to get sheet data.")
    }
  }
}

function Game(game) {
  this.title = game[0];
  this.thumbnail = game[1];
  this.link = game[2];
  this.price = game[3];
  this.msrp = game[4];
  this.condition = game[5];
  this.info = game[6];
}