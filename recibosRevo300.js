function emailOnFormSubmit(e) {

//Datos del Formulario
  var timestamp = e.values[0];
  var Membresia = e.values[1];
  var Nombre 	= e.values[2];
  var Empresa 	= e.values[3];
  var Concepto 	= e.values[4];
  var Forma 	= e.values[5];
  var Pago 		= e.values[6];
  var Cantidad 	= e.values[7];
  var Email 	= e.values[8];

  //Platilla pdf
  var TEMPLATE_ID = '15t9lyCXSoqTwPSgnyCSvZObpjU9cUuHXjfMCGjX5fYc';
  var PDF_FILE_NAME = "Recibo.pdf";

  var copyFile = DriveApp.getFileById(TEMPLATE_ID).makeCopy(),
		copyId = copyFile.getId(),
		copyDoc = DocumentApp.openById(copyId),
		copyBody = copyDoc.getActiveSection();

  copyBody.replaceText('TAG_DIA',timestamp);
  copyBody.replaceText('TAG_MEMBRESIA',Membresia);
  copyBody.replaceText('TAG_NOMBRE',Nombre);
  copyBody.replaceText('TAG_EMPRESA',Empresa);
  copyBody.replaceText('TAG_CONCEPTO',Concepto);
  copyBody.replaceText('TAG_FORMA',Forma);
  copyBody.replaceText('TAG_PAGO',Pago);
  copyBody.replaceText('TAG_CANTIDAD',Cantidad);

  copyDoc.saveAndClose();

	var newFile = DriveApp.createFile(copyFile.getAs('application/pdf'));

	if (PDF_FILE_NAME !== '') {

		newFile.setName(PDF_FILE_NAME);
	}

	copyFile.setTrashed(true);

  var subject = "Recibo de Pago REVO300";
  var emailBody = "Hola, " + Nombre + "\n" +
  "\nPor este medio me permito adjuntar recibo de pago.  A nombre de nuestro equipo, le reiteramos nuestro compromiso por ofrecerle el mejor servicio. Gracias por elegir a REVO300; es un privilegio servirle."+
  "\n\nSaludos";

  var advancedOpts = { name: "Revo300 Cowork",attachments:[newFile] };

  MailApp.sendEmail(Email, subject, emailBody, advancedOpts);
  newFile.setTrashed(true);
}
