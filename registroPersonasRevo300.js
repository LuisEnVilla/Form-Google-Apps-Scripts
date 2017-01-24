function emailOnFormSubmit(e) {

	var timestamp = e.values[ 0 ];
  var nombre = e.values[ 1 ];
  var apellidos = e.values[ 2 ];
	var empresa = e.values[ 3 ];
	var cargo = e.values[ 4 ];
	var telefono = e.values[ 5 ];
	var habilidades = e.values[ 6 ];
	var Facebook = e.values[ 7 ];
	var Twitter = e.values[ 8 ];
  var Linkedin = e.values[ 9 ];
  var correo = e.values[ 10 ];

  var subject = "Registro de " + nombre + " en Revo300 Cowork";
  var emailBody = "Hola " + nombre + "!" +
    "\n\nGracias por registrarse en Revo300 Cowork. A nombre de nuestro equipo, le reiteramos nuestro compromiso por ofrecerle el mejor servicio." +
    "\nEs un privilegio servirle.";

  var reglamento = DriveApp.getFileById('0B4pTgWoW4_h3bVA3N3c1TGlDX2M');
  var advancedOpts = { name: "Revo300 Cowork", attachments:[reglamento.getAs('application/pdf')] };

  MailApp.sendEmail(correo, subject, emailBody, advancedOpts);
}
