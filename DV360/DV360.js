const CLIENT_ID = "";//https://developers.google.com/display-video/api/guides/getting-started/overview#generate_credentials
const CLIENT_SECRET = "";
const REFRESH_TOKEN = "";//with scope - https://www.googleapis.com/auth/display-video	
const URL = "https://www.googleapis.com/doubleclickbidmanager/v2/queries";
const SPREADSHEET_ID = "";
const SHEET_NAME = "";

function getAccessToken() {
  try {
    var option = {
      'method': 'POST',
      'Content-Type': 'application/json',
      'muteHttpExceptions': false,
    };

    var response = UrlFetchApp.fetch("https://accounts.google.com/o/oauth2/token?grant_type=refresh_token&client_id=" + CLIENT_ID + "&redirect_uri=http://localhost/&client_secret=" + CLIENT_SECRET + "&refresh_token=" + REFRESH_TOKEN, option);

    var responseText = response.getContentText();
    var responseJson = JSON.parse(responseText);
    var accessToken = responseJson.access_token;

    return accessToken;

  } catch (error) {
    throw new Error(`Access Token Error: ${error}`);
  }
}


function createQuery() {
  try {
    var reportConfiguration = {
      "metadata": {
        "dataRange": {
          "customEndDate": {
            "day": 1,
            "month": 1,
            "year": 2023
          },
          "customStartDate": {
            "day": 25,
            "month": 1,
            "year": 2023
          },
          "range": "CUSTOM_DATES"
        },
        "format": "CSV",
        "title": "DV360 Report by Alpray.com"
      },
      "params": {
        "metrics": [
          "METRIC_CLICKS",
          "METRIC_CTR",
          "METRIC_REVENUE_ADVERTISER"

        ],
        "groupBys": [
          "FILTER_ADVERTISER_NAME",
          "FILTER_ADVERTISER",
          "FILTER_ADVERTISER_CURRENCY",
          "FILTER_INSERTION_ORDER_NAME",
          "FILTER_INSERTION_ORDER",
          "FILTER_LINE_ITEM_NAME",
          "FILTER_LINE_ITEM",
          "FILTER_INSERTION_ORDER_STATUS",
          "FILTER_LINE_ITEM_STATUS",
          "FILTER_DATE",
          "FILTER_LINE_ITEM_BUDGET"

        ]
      }
    }

    var accessToken = getAccessToken();

    var params = {
      method: 'POST',
      contentType: 'application/json',
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
      payload: JSON.stringify(reportConfiguration),
      muteHttpExceptions: false,
    };

    var response = UrlFetchApp.fetch(URL, params).getContentText();
    var responseJson = JSON.parse(response)
    var queryId = responseJson["queryId"]

    runQuery(queryId)

  } catch (error) {
    Logger.log(`Create Query Error: ${error}`);
  }

}

function runQuery(queryId) {
  try {
    var accessToken = getAccessToken();

    var params = {
      method: 'POST',
      contentType: 'application/json',
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
    }

    var response = UrlFetchApp.fetch(URL + '/' + queryId + ':run',
      params).getContentText();

    var responseJson = JSON.parse(response)
    var reportId = responseJson["key"]["reportId"]

    createReport([queryId, reportId])

  } catch (error) {
    Logger.log(`Run Query Error: ${error}`);
  }
}

function createReport(arg) {
  try {
    var queryId = arg[0]
    var reportId = arg[1]

    var accessToken = getAccessToken();

    var params = {
      contentType: 'application/json',
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
    }
    var response = UrlFetchApp.fetch(URL + '/' + queryId + '/reports/' + reportId, params).getContentText();

    var responseJson = JSON.parse(response);
    var reportUrl = responseJson.metadata.googleCloudStoragePath;

    importCSVFromUrl(reportUrl)

  } catch (error) {
    Logger.log(`Create Report Error: ${error}`);
  }
}

function importCSVFromUrl(reportUrl) {
  try {
    var csv = Utilities.parseCsv(UrlFetchApp.fetch(reportUrl));

    writeDataToSheet(csv);

  } catch (error) {
    Logger.log(`Import CSV Error: ${error}`);
  }
}


function writeDataToSheet(data) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID)
    var sheet = ss.getSheetByName(SHEET_NAME)

    sheet.clear()

    for (var i = 0; i < data.length; i++) {
      if (data[i][0] == '') {
        data.splice(i, data.length - 1)
      }
    }

    if (data.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, data.length, data[0].length).setValues(data);
      SpreadsheetApp.flush()
    }
  } catch (error) {
    Logger.log(`Write Data Error: ${error}`);
  }

}
