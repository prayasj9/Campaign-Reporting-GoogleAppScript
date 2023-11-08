
---

## LinkedIn Ads Reporting using Google Apps Script

This Google Apps Script is designed to fetch campaign reports from the LinkedIn Advertising API. It retrieves essential campaign metrics and processes the data for analysis and record-keeping purposes.

### Prerequisites

Before utilizing this script, make sure you have the following prerequisites:

- **LinkedIn Advertising API Credentials**: Acquire your `CLIENT_ID`, `CLIENT_SECRET`, and the `REFRESH_TOKEN` from the [LinkedIn Marketing Developer Platform](https://learn.microsoft.com/en-us/linkedin/marketing/quick-start?view=li-lms-2023-10#step-2-get-started-with-the-advertising-api).

### Configuration

Before executing the script, ensure that the constants at the beginning of the code are properly set:

- `CLIENT_ID`: Your unique LinkedIn App's client ID.
- `CLIENT_SECRET`: Your LinkedIn App's client secret.
- `REFRESH_TOKEN`: Your refresh token obtained for LinkedIn Advertising API access.

### Usage Guide

1. Configure the necessary constants with your LinkedIn Advertising API credentials.
2. Execute the `getReport()` function in the Google Apps Script Editor.

### Functionality

The script's primary function, `getReport()`, performs the following key tasks:

1. Fetches an access token from the LinkedIn Advertising API to authorize API requests.
2. Requests a campaign report for specific metrics such as spend, impressions, clicks, and conversions for a specified date range.
3. Processes the retrieved data and calculates the total spends, impressions, clicks, and conversions.

### Notes

- The script allows access to essential campaign metrics through the LinkedIn Advertising API, facilitating data retrieval for analysis and monitoring.

You can find me at [alpray.com](https://alpray.com/)
---

