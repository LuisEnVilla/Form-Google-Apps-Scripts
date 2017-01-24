function emailOnFormSubmit(e) {

  //Form data represented as an array, starting from the time tag imposed by default
  var timestamp = e.values [ 0 ];
  var folio = e.values [ 1 ];
  var nombre = e.values [ 2 ];
  var rfc = e.values [ 3 ];
  var domicilio = e.values [ 4 ];
  var concepto = e.values [ 5 ];
  var importe = e.values [ 6 ];
  var importeLetra = e.values [ 7 ];
  var formaPago = e.values [ 8 ];
  var nota = e.values [ 9 ];
  var emailCliente = e.values [ 10 ];

  //Fill template of google docs and export in pdf.
  var TEMPLATE_ID = '1IRYwCG32C93OsKCIfKcZWTY4nxXup5HPZJCNcUZgn3o';
  var PDF_FILE_NAME = "Recibo_" + folio + ".pdf";

  var copyFile = DriveApp.getFileById(TEMPLATE_ID).makeCopy(),
		copyId = copyFile.getId(),
		copyDoc = DocumentApp.openById (copyId),
		copyBody = copyDoc.getActiveSection();

  copyBody.replaceText ('TAG_FOLIO', folio);
  copyBody.replaceText ('TAG_NOMBRE_CLIENTE', nombre);
  copyBody.replaceText ('TAG_RFC_CLIENTE', rfc);
  copyBody.replaceText ('TAG_DOMICILIO_CLIENTE', domicilio);
  copyBody.replaceText ('TAG_CONCEPTO', concepto);
  copyBody.replaceText ('TAG_IMPORTE', importe);
  copyBody.replaceText ('TAG_LETRA_IMPORTE', importeLetra);
  copyBody.replaceText ('TAG_FORMA_PAGO', formaPago);
  copyBody.replaceText ('TAG_NOTA', nota);

  copyDoc.saveAndClose();

	var newFile = DriveApp.createFile(copyFile.getAs('application/pdf'));

	if (PDF_FILE_NAME !== '') {

		newFile.setName(PDF_FILE_NAME);
	}

	copyFile.setTrashed(true);

  // Structure of email, enclosing pdf
  var subject = "Recibo de Pago " + folio ;
  var emailBody = "Hola " + nombre + "!\n" +
  "\nPor este medio me permito adjuntar el recibo de pago por el  concepto " + concepto + " con el monto de $ " + importe + " ( " + importeLetra + " 00/100 M.N. ). A nombre de nuestro equipo, le reiteramos nuestro compromiso por ofrecerle el mejor servicio. Gracias por elegir a Startup Hidalgo."+
  "\n\nEs un privilegio servirle."+
  "\nSaludos.";

  var advancedOpts = { name: "Startup Hidalgo",attachments:[newFile] };

  MailApp.sendEmail(emailCliente, subject, emailBody, advancedOpts);
  newFile.setTrashed(true);
}
