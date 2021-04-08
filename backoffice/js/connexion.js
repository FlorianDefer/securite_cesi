//affiche la fenetre ajouter un message
//path = chemin vers le servicer
function connexion() {
		$('#connexion_Modal').modal('show')
}
// ferme le modal de resultat de la page
// function close_modal() {
	  // console.log('1');

	// console.log(document.getElementById("myModal").innerHTML);
	// si l'action est réussite ferme la page de modification
	// if (document.getElementById("myModal").innerHTML.search("Modification Réussi") != -1) {
			// console.log('2');
	// document.getElementById("myModal").style.display = "none";
		// $('#total_roadmap_Modal').modal('hide');
		// refresh_table();
	// }
	// else {
			// console.log('1');

		// document.getElementById("myModal").style.display = "none";
	// }
// }
// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
	// console.log('0');
  // if (event.target == document.getElementById("myModal")) {
	  // console.log('1');
	  // si l'action est réussite ferme la page de modification
	// if (document.getElementById("myModal").innerHTML.search("Modification Réussi") != -1) {
		// console.log('2');
		// document.getElementById("myModal").style.display = "none";
		// $('#total_roadmap_Modal').modal('hide');
		// refresh_table();
		// console.log('3');

	// }
	// else {
		// console.log('1');
		// document.getElementById("myModal").style.display = "none";
	// }
  // }
// }


//envoie du formulaire 
function submit_connexion(){
	var XHR = new XMLHttpRequest();
	var urlEncodedData = "";
	var urlEncodedDataPairs = [];
	var name;
  
	
	urlEncodedDataPairs.push(encodeURIComponent('email') + '=' + encodeURIComponent($('#email').val()));
	urlEncodedDataPairs.push(encodeURIComponent('password') + '=' + encodeURIComponent($('#password').val()));
	
  
	// Combinez les paires en une seule chaîne de caractères et remplacez tous
	// les espaces codés en % par le caractère'+' ; cela correspond au comportement
	// des soumissions de formulaires de navigateur.
	urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
  
	// Définissez ce qui se passe en cas de succès de soumission de données
	XHR.onload = function () {
		if (XHR.readyState === XHR.DONE) {
			data = XHR.response;
			if (data.search('token') != -1) {
				info = JSON.parse(data)
				document.location.href='/index.html?token='+info.token+'&userId='+info.userId
			}
			else {
				document.getElementById("retour_data").innerHTML = '<div class="alert alert-danger" style="margin-bottom:0px;width:'+window.innerWidth+'px"><div class="row"><div class="col-md-11 "><center>'+data+'</center></div><div class="col-md-1"><span onclick="document.getElementById(\'retour_data\').innerHTML = \'\'">&times;</span>	</div></div></div>';
								// document.getElementById("myModal").style.display = "block"
			}
		}
	};
  
	// Définissez ce qui arrive en cas d'erreur
	XHR.addEventListener('error', function(event) {
	  alert('Oups! Quelque chose s\'est mal passé.');
	});
  
	// Configurez la requêtes
	XHR.open('POST', 'http://localhost:3000/api/auth/signup');
  
	// Ajoutez l'en-tête HTTP requise pour requêtes POST de données de formulaire
	XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
	// Finalement, envoyez les données.
	XHR.send(urlEncodedData);
	
	//$.ajax({
    //        url: "http://localhost:3000/api/auth/signup",
    //        type: 'post',
    //        data: formData,
    //        contentType: false,
    //        processData: false,
    //        success: function(data){
	//			if (data.search('Réussi') != -1) {
	//				document.getElementById("retour_data").innerHTML = '<div class="alert alert-success" style="margin-bottom:0px;width:'+window.innerWidth+'px"><div class="row"><div class="col-md-11 "><center>'+data+'</center></div><div class="col-md-1"><span onclick="document.getElementById(\'retour_data\').innerHTML = \'\'" class="close">&times;</span>	</div></div></div>';
	//				setTimeout(function(){ document.getElementById('retour_data').innerHTML = '' }, 5000);
	//				refresh_table();
	//				close_modal();
	//			}
	//			else {
	//				document.getElementById("retour_data").innerHTML = '<div class="alert alert-danger" style="margin-bottom:0px;width:'+window.innerWidth+'px"><div class="row"><div class="col-md-11 "><center>'+data+'</center></div><div class="col-md-1"><span onclick="document.getElementById(\'retour_data\').innerHTML = \'\'">&times;</span>	</div></div></div>';
					// document.getElementById("myModal").style.display = "block"
	//			}
			
	//		}
  // });
}