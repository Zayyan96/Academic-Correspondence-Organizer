# Email Automation for Assignment Submission

This project is a Google Apps Script to automate the process of sending email confirmations to students and parents upon successful assignment submissions. It pulls data from two Google Sheets: one with student details and the other with email addresses, and sends customized email notifications.

## Features

- Reads data from two Google Sheets.
- Sends confirmation emails to students upon assignment submission.
- Sends emails to parents.
- Handles different subjects and assignment names dynamically.
- Logs errors and sends notifications to the admin if email sending fails.
- Tracks the last processed row to ensure no data is missed in case of interruptions.

## Prerequisites

- Google Account
- Google Sheets with student and email data.
- Google Apps Script access.

## Setup

1. **Create Google Sheets:**
   - Sheet 1: Contains student details.
   - Sheet 2: Contains email addresses.

2. **Google Apps Script:**
   - Open your Google Sheets.
   - Go to `Extensions > Apps Script`.
   - Delete any code in the script editor and paste the `Code.gs` content from this repository.

3. **Set Script Properties:**
   - Go to `Project Settings` in the Apps Script editor.
   - Add a new property `lastProcessedRow` and set it to `0`.

4. **Update Sheet IDs:**
   - Replace `sheetId1` and `sheetId2` with your Google Sheets IDs in the script.

5. **Deploy:**
   - Save and deploy the script as per your requirement.

## Usage

- Once setup, the script can be run manually or can be set to run on a trigger (e.g., time-based trigger).
