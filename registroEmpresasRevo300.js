function emailOnFormSubmit(e) {
  //Datos del Form
	var timestamp 		= e.values[0];
	var Nombre_Empresa  = e.values[1];
	var Ramo_Empresa 	= e.values[2];
	var Servicios 	    = e.values[3];
	var Mail_Contacto 	= e.values[4];
	var Telefono 	    = e.values[5];
	var Facebook 		= e.values[6];
	var Twitter         = e.values[7];
    var Linkedin        = e.values[8];

  var subject = "Registro de " + Nombre_Empresa + " en Revo300 Cowork";
  var emailBody = "Estimados " + Nombre_Empresa +
    "\n\nGracias por su interés en Revo300 tenemos el placer de informarle que su Startup se encuentra registrada, a continuación debe seguir estos sencillos pasos para concluir y  ser parte de Revo300."+
    "\n\n- Realizar el pago de  membresía valor $700.00 pesos."+
    "\n- Eligue tu plan y tu espacio." +
    "\nFundación Emprendamos Éxitos A.C \nBanco:Banorte\nNo. de cuenta: 0230646209\nClabe: 072 312 0023 0646 209 5 \nReferencia: "+Nombre_Empresa+
    "\nEnviar comprobante de pago a hola@revo300.work, y sus documentos adjuntos: INE y comprobante de domicilio."+
    "\nUna vez recibidos sus documentos y el comprobante de pago, enviaremos número de folio de su membresía."+
    "\n\nA nombre de nuestro equipo, le reiteramos nuestro compromiso por ofrecerle el mejor servicio. Gracias por elegir a Revo300 es un privilegio servirle.";

  var reglamento = DriveApp.getFileById('0B4pTgWoW4_h3bVA3N3c1TGlDX2M');
  var planes = DriveApp.getFileById('0B4pTgWoW4_h3dlVvXy0walBoelE');

  var advancedOpts = { name: "Revo300 Cowork", attachments:[reglamento.getAs('application/pdf'),planes.getAs('application/pdf')]};

  MailApp.sendEmail(Mail_Contacto, subject, emailBody, advancedOpts);
}
