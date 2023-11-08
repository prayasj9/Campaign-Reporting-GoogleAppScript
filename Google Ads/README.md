
---

## Google Ads Reporting using Google Apps Script

This Google Apps Script code is designed to fetch campaign reports from the Google Ads API. It retrieves essential campaign metrics and calculates the total spends for monitoring and analysis purposes.

### Prerequisites

To utilize this script, you will need:

- **Google Ads Developer Token**: Your unique [Google Ads Developer Token](https://developers.google.com/google-ads/api/docs/get-started/dev-token).
- **Google Ads Customer ID**: The Customer ID for the Google Ads account you wish to retrieve reports from.

### Configuration

Before running the script, ensure the following constants in the code are properly set:

- `DEVELOPER_TOKEN`: Your Google Ads Developer Token.
- `LOGIN_CUSTOMER_ID`: The Customer ID for the Google Ads account.

### Usage Guide

1. Set the necessary constants with your Google Ads credentials.
2. Execute the `getReport()` function in the Google Apps Script Editor.

### Functionality

The script's primary function, `getReport()`, executes the following steps:

1. Fetches an access token from the Google Ads API to authorize requests.
2. Retrieves campaign data and total spends for today's date using a specified query.
3. Processes the retrieved data and calculates the total spends.

### Notes

- The script retrieves campaign data from the Google Ads API to assist in monitoring campaign spending and performance.

You can find me at [alpray.com](https://alpray.com/)
---
