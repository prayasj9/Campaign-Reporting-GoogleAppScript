const DEVELOPER_TOKEN = "";
const LOGIN_CUSTOMER_ID = "";

function getReport() {
  try {
    var totalSpends = 0

    var headers = {
      'Authorization': "Bearer " + initializeOAuthClient(),
      'developer-token': DEVELOPER_TOKEN,
      'login-customer-id': LOGIN_CUSTOMER_ID
    };

    var query = "SELECT campaign.name,metrics.cost_micros FROM campaign WHERE segments.date DURING TODAY"

    var option = {
      'method': 'POST',
      'headers': headers,
      'Content-Type': 'application/json',
      'muteHttpExceptions': false,
      "payload": { "query": query }
    }
    var nextPageToken = true;
    while (nextPageToken) {
      var url = "https://googleads.googleapis.com/v10/customers/" + LOGIN_CUSTOMER_ID + "/googleAds:search?page_size=1000";
      var response = UrlFetchApp.fetch(url, option);
      var responeJson = JSON.parse(response);
      var reportData = responeJson.results;

      if (reportData.length) {
        reportData.forEach(function (row) {
          totalSpends += Math.round(Number(row.metrics.costMicros) / 1000000)
        })
      }
      if (responeJson.nextPageToken) {
        nextPageToken = true
        url = url.concat(`&page_token=${result.nextPageToken}`)
      } else {
        nextPageToken = false
      }
    }
  }
  catch (e) {
    Logger.log(e)
  }
}

