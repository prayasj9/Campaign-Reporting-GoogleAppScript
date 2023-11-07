## Google Display & Video 360 Report Automation using Google Apps Script

This script automates the generation and retrieval of reports from Google Display & Video 360 (DV360) using Google Apps Script.

### Prerequisites

Before using this script, ensure the following prerequisites are met:

- **Google Display & Video 360 Account**: You'll need access to a DV360 account.
- **Google Developers Console Credentials**: Obtain your `CLIENT_ID`, `CLIENT_SECRET`, and `REFRESH_TOKEN` from the [Google Developers Console](https://developers.google.com/display-video/api/guides/getting-started/overview#generate_credentials).
- **Google Sheets**: Have a Google Sheets spreadsheet ready. Set the `SPREADSHEET_ID` and `SHEET_NAME` constants to specify the location where the report data will be written.

### Configuration

Before running the script, make sure to set the following variables at the beginning of the code:

- `CLIENT_ID`: Your Google Developers Console client ID.
- `CLIENT_SECRET`: Your Google Developers Console client secret.
- `REFRESH_TOKEN`: Your refresh token with the required scope.
- `URL`: The API endpoint for DV360 queries.
- `SPREADSHEET_ID`: The ID of your Google Sheets spreadsheet.
- `SHEET_NAME`: The name of the sheet in the spreadsheet to write the data.

### Code Overview

The script comprises several functions:

- `getAccessToken()`: Fetches the access token required for making API requests to DV360.
- `createQuery()`: Creates a query based on specified configurations and submits it to DV360.
- `runQuery()`: Executes the submitted query in DV360.
- `createReport()`: Generates the report and retrieves the report URL.
- `importCSVFromUrl()`: Imports the CSV data from the report URL.
- `writeDataToSheet()`: Writes the imported data to the specified Google Sheets location.

### Usage

1. Update the configuration variables at the beginning of the code with your credentials and desired report settings.
2. Run the `createQuery()` function to initiate the report generation process.

### Error Handling

The script includes error handling for various stages of the process to log detailed error messages in case of issues.

### Notes

- Ensure the variables are properly configured before executing the script.
- Check the Logs in Google Apps Script Editor for any error messages during execution.
- You can reach me at [alpray.com](https://alpray.com/)
---
