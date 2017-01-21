function emailOnFormSubmit(e) {

  //Form data represented as an array, starting from the time tag imposed by default
  var timestamp = e.values [ 0 ];
  var value1Form = e.values [ 1 ];
  var value2Form = e.values [ 2 ];

  //Fill template of google docs and export in pdf.
  var TEMPLATE_ID = '13eFeunIWkRRKz8TpXLM5xzwkFNbjibShAV6o7m6Nd7c';
  var PDF_FILE_NAME = "doc.pdf";

  var copyFile = DriveApp.getFileById(TEMPLATE_ID).makeCopy(),
		copyId = copyFile.getId(),
		copyDoc = DocumentApp.openById (copyId),
		copyBody = copyDoc.getActiveSection();

  copyBody.replaceText ('Tag_1', timestamp);
  copyBody.replaceText ('Tag_2', value1Form);
  copyBody.replaceText ('Tag_3', value2Form);

  copyDoc.saveAndClose();

	var newFile = DriveApp.createFile(copyFile.getAs('application/pdf'));

	if (PDF_FILE_NAME !== '') {

		newFile.setName(PDF_FILE_NAME);
	}

	copyFile.setTrashed(true);

  // Structure of email, enclosing pdf
  var subject = "Lorem Email";
  var emailBody = "Lorem, " + value1Form + "\n" +
  "\nLorem"+
  "\nLorem";

  var advancedOpts = { name: "Doc PDF",attachments:[newFile] };

  MailApp.sendEmail(Email, subject, emailBody, advancedOpts);
  newFile.setTrashed(true);
}
