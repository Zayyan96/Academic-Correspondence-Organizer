// Main function to process and send emails
function sendEmails() {
  var sheetId1 = "12Cma0qxmsz89EsaK2U6wALvPud2QLwZHGx0UzmS2fIM"; // ID of the first Google Sheet
  var sheet1 = SpreadsheetApp.openById(sheetId1);
  if (!sheet1) {
    Logger.log("Sheet not found with ID: " + sheetId1);
    return;
  }
  var values = sheet1.getDataRange().getValues();
  var lastProcessedRow = getLastProcessedRow(); // Retrieve the last processed row
  var sheetId2 = "1Xc_mEKagDH5b9QZEgZY-3U-K2eeqa9Zj_2YSObqDokQ"; // ID of the second Google Sheet
  var sheet2 = SpreadsheetApp.openById(sheetId2);
  if (!sheet2) {
    Logger.log("Sheet not found with ID: " + sheetId2);
    return;
  }
  var data = sheet2.getDataRange().getValues();
  Logger.log("lastProcessedRow: " + lastProcessedRow);

  // Initialize arrays to store submissions for each subject
  var chemistrySubmissions = [];
  var physicsMathsSubmissions = [];

  // Iterate through each row starting from the second row (assuming the first row contains headers)
  for (var i = lastProcessedRow; i < values.length; i++) {
    var studentId = values[i][2];
    var emailAddress = null;
    var emailAddress1 = null;
    var emailAddress2 = null;
    // Iterate through the second sheet to find the matching student ID
    for (var j = 1; j < data.length; j++) {
      if (studentId == data[j][1]) {
        emailAddress = data[j][2];
        emailAddress1 = data[j][4];
        emailAddress2 = data[j][5];
        break; // Exit the loop once a match is found
      }
    }

    // Check if email address is found
    if (emailAddress) {
      // Customize the submission information based on the subject
      var timeSubmitted = Utilities.formatDate(new Date(values[i][0]), 'GMT+5', 'EEE, MMM d, yyyy HH:mm:ss');

      var submissionInfo =
        timeSubmitted + "\n" +  // Time Submitted
        values[i][1] + "\n" +   // Student Name
        values[i][2] + "\n" +   // Student ID
        (values[i][3] || "Not specified") + "\n" +
        (values[i][4] || values[i][13] || values[i][22] || values[i][31]) + "\n" +
        (values[i][5] || values[i][7] || values[i][9] || values[i][11] || values[i][14] || values[i][16] || values[i][18] || values[i][20] || values[i][23] || values[i][25] || values[i][27] || values[i][29] || values[i][32] || values[i][34] || values[i][36] || values[i][38]);

      // Add the submission information to the appropriate array based on subject
      var subject = values[i][4] || values[i][13] || values[i][22] || values[i][31];
      if (subject === "Chemistry") {
        chemistrySubmissions.push(submissionInfo);
      } else if (subject === "Physics" || subject === "Mathematics") {
        physicsMathsSubmissions.push(submissionInfo);
      }
    }
  }

  // Send email to Chemistry teacher
  if (chemistrySubmissions.length > 0) {
    sendEmail("@gmail.com", "Chemistry Submissions for Review", chemistrySubmissions);
    sendEmail("@gmail.com", "Chemistry Submissions for Review", chemistrySubmissions);
  }

  // Send email to Physics/Maths teacher
  if (physicsMathsSubmissions.length > 0) {
  sendEmail("@gmail.com", "Physics/Maths Submissions received in last 24 hours", physicsMathsSubmissions);
  sendEmail("@gmail.com", "Physics/Maths Submissions received in last 24 hours", physicsMathsSubmissions);
  }

  // Update the last processed row
  updateLastProcessedRow(values.length);
}

// Helper function to send email
function sendEmail(recipient, subject, submissions) {
  var emailBody =
    "<p>Dear Teacher,</p>" +
    "<p>Following assignments have been received in the last 24 hours:</p>" +
    "<table border='1'>" +
    "<tr><th>Time Submitted</th><th>Student Name</th><th>Student ID</th><th>Grade</th><th>Subject</th><th>Assignment</th></tr>";

  // Concatenate each submission information to the email body
  for (var i = 0; i < submissions.length; i++) {
    var submissionInfo = submissions[i].split("\n");
    var timeSubmitted = submissionInfo[0]; // Get the time submitted from the first element
    emailBody += "<tr>";
    emailBody += "<td>" + timeSubmitted + "</td>"; // Time Submitted column
    for (var j = 1; j < submissionInfo.length; j++) {
      emailBody += "<td>" + submissionInfo[j] + "</td>";
    }
    emailBody += "</tr>";
  }
  emailBody += "</table>" +
    "<p>Please review the submissions at your earliest convenience.</p>" +
    "<p>Best regards,<br>Management Online Tuitions</p>";

  GmailApp.sendEmail(recipient, subject, "", { htmlBody: emailBody, from: "teachers@online-tuitions.com" });
}

// Helper function to get the last processed row
function getLastProcessedRow() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var lastProcessedRow = scriptProperties.getProperty('lastProcessedRow');
  if (lastProcessedRow) {
    return parseInt(lastProcessedRow);
  } else {
    return 0; // Start from the first row if no last processed row is found
  }
}

// Helper function to update the last processed row
function updateLastProcessedRow(row) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('lastProcessedRow', row.toString());
}
