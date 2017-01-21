function emailOnFormSubmit(e) {

  //Datos del Formulario Partiendo de la etiqueta de tiempo
  var timestamp = e.values[0];
  var Membresia = e.values[1];
  var Nombre 	= e.values[2];
  var Empresa 	= e.values[3];
  var Concepto 	= e.values[4];
  var Forma 	= e.values[5];
  var Pago 		= e.values[6];
  var Cantidad 	= e.values[7];
  var Email 	= e.values[8];

  //Rellenar plantilla y exportar en PDF, a travez de una copia de google docs.
  var TEMPLATE_ID = '13eFeunIWkRRKz8TpXLM5xzwkFNbjibShAV6o7m6Nd7c';
  var PDF_FILE_NAME = "Recibo.pdf";

  var copyFile = DriveApp.getFileById(TEMPLATE_ID).makeCopy(),
		copyId = copyFile.getId(),
		copyDoc = DocumentApp.openById(copyId),
		copyBody = copyDoc.getActiveSection();

  copyBody.replaceText('DIA',timestamp);
  copyBody.replaceText('MEMBRESIA',Membresia);
  copyBody.replaceText('NOMBRE',Nombre);
  copyBody.replaceText('EMPRESA',Empresa);
  copyBody.replaceText('CONCEPTO',Concepto);
  copyBody.replaceText('FORMA',Forma);
  copyBody.replaceText('PAGOO',Pago);
  copyBody.replaceText('CANTIDAD',Cantidad);

  copyDoc.saveAndClose();

	var newFile = DriveApp.createFile(copyFile.getAs('application/pdf'));

	if (PDF_FILE_NAME !== '') {

		newFile.setName(PDF_FILE_NAME);
	}

	copyFile.setTrashed(true);

  // Estructura de Email y adjuntar documento PDF creado.
  var subject = "Recibo de Pago REVO300";
  var emailBody = "Hola, " + Nombre + "\n" +
  "\nPor este medio me permito adjuntar recibo de pago.  A nombre de nuestro equipo, le reiteramos nuestro compromiso por ofrecerle el mejor servicio. Gracias por elegir a REVO300; es un privilegio servirle."+
  "\nSaludos";

  var advancedOpts = { name: "Recibo",attachments:[newFile] };

  MailApp.sendEmail(Email, subject, emailBody, advancedOpts);
  newFile.setTrashed(true);
}
