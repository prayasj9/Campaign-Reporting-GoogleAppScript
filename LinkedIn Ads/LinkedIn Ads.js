const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REFRESH_TOKEN = "";

//https://learn.microsoft.com/en-us/linkedin/marketing/quick-start?view=li-lms-2023-10#step-2-get-started-with-the-advertising-api

function getAccessToken() {

  var payload = {
    'grant_type': "refresh_token",
    "refresh_token": REFRESH_TOKEN,
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET
  }

  var option = {
    method: "POST",
    'Content-Type': 'application/x-www-form-urlencoded',
    payload: payload
  }

  var response = UrlFetchApp.fetch("https://www.linkedin.com/oauth/v2/accessToken", option)
  var responeJson = JSON.parse(response);
  var accessToken = responeJson.access_token;

  return accessToken;
}

function getReport() {

  var reportStartDate = "day:7,month:11,year:2023";
  var reportEndDate = "day:10,month:11,year:2023";

  var url = "https://api.linkedin.com/v2/adAnalyticsV2?q=statistics&dateRange=(start:(" + reportStartDate + "),end:(" + reportEndDate + "))&timeGranularity=DAILY&accounts=List(urn%3Ali%3AsponsoredAccount%3A511082027)&pivots=List(CREATIVE,CAMPAIGN)&fields=impressions,clicks,landingPageClicks,totalEngagements,likes,comments,follows,shares,externalWebsiteConversions,externalWebsitePostClickConversions,externalWebsitePostViewConversions,conversionValueInLocalCurrency,pivot,pivotValues,pivotValue,costInLocalCurrency&projection=(*,elements*(*,pivotValues(*~sponsoredCampaign(id,name,type,status,campaignGroup~(id,name,status))~sponsoredCreative(status,type))))"

  var header = {
    "X-Restli-Protocol-Version": "2.0.0",
    "Authorization": "Bearer " + getAccessToken()
  }

  var option = {
    method: "GET",
    headers: header
  }

  var response = UrlFetchApp.fetch(url, option)
  var responeJson = JSON.parse(response)
  var reportData = responeJson.elements;
  var totalSpends = 0;
  var totalImpression = 0;
  var totalClicks = 0;
  var totalConversions = 0;

  if (reportData.length > 0) {
    reportData.forEach(function (row, idx) {
      totalSpends += row["costInLocalCurrency"]
      totalImpression += row["impressions"]
      totalClicks += row["clicks"]
      totalConversions += row["externalWebsiteConversions"]
    })
  }
}
