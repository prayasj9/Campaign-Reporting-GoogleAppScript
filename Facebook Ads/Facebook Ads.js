  const CLIENT_ID = "";
  const CLIENT_SECRET = "";
  const ACCESS_TOKEN = ""; //https://developers.facebook.com/docs/marketing-api/insights/#quickstart
  const AD_ACCOUNT_ID = "";
  const URL = "https://graph.facebook.com/v13.0/";

function downloadReport() {

  var options = {
    'method': 'GET',
    'content-type': 'application/json',
    'muteHttpExceptions': true
  };

  var response = UrlFetchApp.fetch(URL + "oauth/access_token?grant_type=fb_exchange_token&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&fb_exchange_token=" + ACCESS_TOKEN, options);
  var responseJson = JSON.parse(response.getContentText());
  var latestAccessToken = responseJson.access_token

  try {
    var totalSpend = "";
    var totalConversions = "";
    var datePreset = "yesterday";

    var options = {
      'method': 'GET',
      'content-type': 'application/json',
      'muteHttpExceptions': true
    };

    var responseJson = undefined;

    while (results == undefined) {
      Utilities.sleep(2000)
      var response = UrlFetchApp.fetch(URL + "act_" + AD_ACCOUNT_ID + "/insights?level=campaign&fields=spend,inline_post_engagement,actions,action_values&date_preset=" + datePreset + "&access_token=" + latestAccessToken + "&limit=5000&use_unified_attribution_setting=true", options);
      responseJson = JSON.parse(response.getContentText());
    }

    var reportData = responseJson.data;

    reportData.forEach(function (row) {
      totalSpend += Math.round(Number(row.spend))
      var action = row.actions
      action.forEach(function (actionRow) {
        if (actionRow.action_type == "omni_purchase") {
          totalConversions += Number(actionRow.value)
        }
      })
    })
  }
  catch (e) {
    Logger.log(e)
  }

}
