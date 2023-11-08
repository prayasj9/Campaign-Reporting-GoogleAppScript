const Amazon_Advertising_API_ClientId = "";
const CLIENT_SECRET = "";
const REFRESH_TOKEN = "";
const Amazon_Advertising_API_Scope = "";//https://advertising.amazon.com/API/docs/en-us/guides/get-started/create-authorization-grant

const HEADERS = {
  "Amazon-Advertising-API-ClientId": Amazon_Advertising_API_ClientId,
  "Authorization": "Bearer " + getAccessToken(),
  "Amazon-Advertising-API-Scope": Amazon_Advertising_API_Scope,
  'Content-Type': 'application/json'
};


function getAccessToken() {

  var payload = {
    'grant_type': "refresh_token",
    'client_id': Amazon_Advertising_API_ClientId,
    'refresh_token': REFRESH_TOKEN,
    'client_secret': CLIENT_SECRET
  };

  var option = {
    method: "POST",
    'Content-Type': 'application/json',
    payload: payload
  };

  var response = UrlFetchApp.fetch("https://api.amazon.com/auth/o2/token", option);
  var responeJson = JSON.parse(response);
  var accessToken = responeJson.access_token;

  return accessToken;
}

function downloadReport() {

  var totalSpends = 0;
  var totalOrders = 0;
  var totalSales = 0;
  var reportDate = "20231231";//31-Dec-2023

  var payload = JSON.stringify({
    "reportDate": reportDate,
    "metrics": "cost,attributedConversions7d,attributedSales14d"
  });

  var option = {
    method: "POST",
    headers: HEADERS,
    payload: payload
  };

  var response = UrlFetchApp.fetch("https://advertising-api-eu.amazon.com/v2/sp/adGroups/report", option)
  var responeJson = JSON.parse(response);
  var reportId = responeJson.reportId;


  var option = {
    method: "GET",
    headers: HEADERS,
    followRedirects: true
  }

  var reportReady = false;
  while (reportReady == false) {
    var response = UrlFetchApp.fetch("https://advertising-api-eu.amazon.com/v2/reports/" + reportId, option)
    var responseCode = response.getResponseCode();
    var responeJson = JSON.parse(response);
    var status = responeJson.status;

    if ((responseCode == 200 || responseCode == 202) && status == "SUCCESS") {
      reportReady = true;
    }
    else {
      Utilities.sleep(5000)
    }
  }

  var headers = {
    "Amazon-Advertising-API-ClientId": Amazon_Advertising_API_ClientId,
    "Authorization": "Bearer " + getAccessToken(),
    "Amazon-Advertising-API-Scope": Amazon_Advertising_API_Scope
  };

  var option = {
    method: "GET",
    "Authorization": "Bearer " + getAccessToken(),
    headers: headers,
    followRedirects: false
  };

  var response = UrlFetchApp.fetch("https://advertising-api-eu.amazon.com/v2/reports/" + reportId + "/download", option)
  var redirectUrl = response.getHeaders()['Location'];

  var finalResponse = UrlFetchApp.fetch(redirectUrl)
  var blob = finalResponse.getBlob()    //get the response as blob

  var reportFile = DriveApp.createFile(blob).setName("Alpray.com amz.json.gz")
  var zipFile = DriveApp.getFileById(reportFile.getId())
  var unzipFile = Utilities.ungzip(zipFile)
  var unzipFileId = DriveApp.createFile(unzipFile).getId();
  var tempFile = DriveApp.getFileById(unzipFileId);
  var content = tempFile.getBlob().getDataAsString();
  zipFile.setTrashed(true)
  tempFile.setTrashed(true)

  var reportData = JSON.parse(content);

  for (var i = 0; i < reportData.length; i++) {
    totalSpends += reportData[i].cost
    totalOrders += reportData[i].attributedConversions7d
    totalSales += reportData[i].attributedSales14d
  }
}
