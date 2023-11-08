---

## Facebook Ads Campaign Reporting using Google Apps Script

This Google Apps Script is designed to fetch campaign reports from Facebook Ads using the Facebook Marketing API.

### Prerequisites

Before utilizing this script, make sure you have the following:

- **Facebook Developer Account**: Access to the [Facebook for Developers](https://developers.facebook.com/) platform.
- **Client Credentials**: Obtain your `CLIENT_ID`, `CLIENT_SECRET`, and `ACCESS_TOKEN` from the [Facebook Marketing API](https://developers.facebook.com/docs/marketing-api/insights/#quickstart).
- **Ad Account ID**: Retrieve your specific Ad Account ID for accessing ad campaign data.

### Configuration

Before running the script, ensure the necessary variables at the beginning of the code are properly set:

- `CLIENT_ID`: Your unique Facebook App's client ID.
- `CLIENT_SECRET`: Your Facebook App's client secret.
- `ACCESS_TOKEN`: Your access token acquired from the Facebook Marketing API.
- `AD_ACCOUNT_ID`: Your specific Ad Account ID for accessing ad campaign data.
- `URL`: The endpoint for accessing Facebook's Graph API.

### Usage Guide

1. Configure the script by setting your `CLIENT_ID`, `CLIENT_SECRET`, `ACCESS_TOKEN`, and `AD_ACCOUNT_ID`.
2. Execute the `downloadReport()` function in the Google Apps Script Editor.

### Functionality

The script's primary function, `downloadReport()`, performs the following tasks:

1. Fetches the latest access token to authenticate API requests.
2. Retrieves campaign reports for specific metrics like spend and conversions.
3. Iterates through the fetched data to calculate total spend and conversions for the specified date range.

### Notes

- The script is configured to obtain campaign data for the "yesterday" date preset.
- Error handling is included to log errors in case of any issues during data retrieval.
- You can find me at [alpray.com](https://alpray.com/)

---
