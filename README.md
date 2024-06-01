# Online Tuition Assignment Emailer

This Google Apps Script automates the process of sending email notifications to teachers about student assignment submissions from Google Sheets. 

## Features

- Fetches assignment submissions from two Google Sheets.
- Processes and categorizes submissions based on subjects.
- Sends email notifications to designated teachers with the assignment details.
- Tracks the last processed row to avoid duplicate emails.

## Setup

1. Clone this repository.
2. Open the Google Apps Script editor.
3. Create a new script file and copy the contents of `src/main.js` into it.
4. Set up the script properties in the Apps Script editor to store the last processed row.

## Usage

- Ensure your Google Sheets are populated with student assignment data.
- Run the `sendEmails` function to process new submissions and send emails.
- The script will automatically update the last processed row to prevent duplicate emails.

## Configuration

- **Google Sheets IDs:** Update the `sheetId1` and `sheetId2` variables in the script with your specific Google Sheets IDs.
- **Email Addresses:** Update the email addresses in the `sendEmails` function to match the intended recipients.

## Dependencies

- Google Apps Script
- Google Sheets API
- Gmail API

## Contributing

Feel free to submit pull requests or open issues if you find bugs or have feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
