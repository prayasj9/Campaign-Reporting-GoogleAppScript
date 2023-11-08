
---

## Amazon Ads Reporting using Google Apps Script

This Google Apps Script is designed to interact with the Amazon Advertising API to download reports and seamlessly store them in Google Drive. It fetches specific campaign metrics and compiles the data for analysis and record-keeping purposes.

### Prerequisites

To make effective use of this script, ensure you have the following prerequisites:

- **Amazon Advertising API Credentials**: Acquire your `Amazon_Advertising_API_ClientId`, `CLIENT_SECRET`, `REFRESH_TOKEN`, and the designated `Amazon_Advertising_API_Scope` from the [Amazon Advertising API documentation](https://advertising.amazon.com/API/docs/en-us/guides/get-started/create-authorization-grant).

### Configuration

Before executing the script, ensure to properly set the required constants in the code:

- `Amazon_Advertising_API_ClientId`: Your unique Amazon Advertising API Client ID.
- `CLIENT_SECRET`: Your Amazon Advertising API Client Secret.
- `REFRESH_TOKEN`: Your access token obtained for the Amazon Advertising API.
- `Amazon_Advertising_API_Scope`: Amazon Ads API require passing a specific profile identifier.

### Usage Guide

1. Configure the necessary constants with your Amazon Advertising API credentials.
2. Execute the `downloadReport()` function in the Google Apps Script Editor.

### Functionality

The script's `downloadReport()` function performs the following key tasks:

1. Fetches an access token from Amazon Advertising API to authorize API requests.
2. Requests a campaign report from the API for specific metrics such as costs, attributed conversions, and attributed sales for a specified date range.
3. Polls the API to check if the report is ready for download and waits until it is available.
4. Downloads the report as a GZIP file and stores it in Google Drive.
5. Extracts, processes, and calculates the total spends, orders, and sales from the downloaded report data.

### Report Storage in Google Drive

The script saves the downloaded report in Google Drive as a GZIP file. Upon extraction, the script reads and calculates the total spends, orders, and sales from the retrieved data.

### Notes
You can find me at [alpray.com](https://alpray.com/)

---
