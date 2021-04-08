//affiche la fenetre ajouter un message
//path = chemin vers le servicer
function new_account() {
    $('#_Modal_title').html('Ajouter un compte')
    $('#user_form_btn').attr('onclick','submit_account()');
		$('#new_account_Modal').modal('show')

}
function update_user(id) {

    $('#user_form_btn').attr('onclick','submit_account(\''+id+'\')');

    $('#_Modal_title').html('Modfier un compte')
    $('#new_account_Modal').modal('show')


    jQuery.ajax({ url : 'http://localhost:3000/api/user/'+id	}).done(function(data){
        console.log(data)	
        $('#email').val(data.email)
        $('#password').val("")
        $('#surname').val(data.surname)
        $('#name').val(data.name)
        $('#geographicalZone').val(data.geographicalZone)
        $('#type').val(data.type)
        $('#nickname').val(data.nickname)
        $('#socialSituation') .val(data.socialSituation)
    });
    $('#new_account_Modal').modal('show')
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
function test(){
	form = new FormData();
	form.append( "name", $('#name').val());
	form.append( "deb_audio" , $('input[name=deb_audio]:checked').val());
	form.append( "musique" , $('input[name=musique]:checked').val());
	form.append( "fin_audio", $('input[name=fin_audio]:checked').val());
	form.append( "color", $('#color').val());
	
	form.append('pcm', $("#pcm")[0].files[0]); 
	txt = quill.getContents()
	//console.log(txt.ops[txt.ops.length-1].insert)
	//console.log(txt.ops[txt.ops.length-1].insert.substring(0, txt.ops[txt.ops.length-1].insert.length-1))
	txt.ops[txt.ops.length-1].insert = txt.ops[txt.ops.length-1].insert.substring(0, txt.ops[txt.ops.length-1].insert.length-1)
	//console.log(txt.ops[txt.ops.length-1])
	form.append( "description", JSON.stringify(txt));
		$.ajax({
            url: "data.php?action=new_account&id_service="+$_GET('id_service'),
            type: 'post',
            data: form,
            contentType: false,
            processData: false,
            success: function(data){
				if (data.search('Réussi') != -1) {
					document.getElementById("retour_data").innerHTML = '<div class="alert alert-success" style="margin-bottom:0px;width:'+window.innerWidth+'px"><div class="row"><div class="col-md-11 "><center>'+data+'</center></div><div class="col-md-1"><span onclick="document.getElementById(\'retour_data\').innerHTML = \'\'" class="close">&times;</span>	</div></div></div>';
					setTimeout(function(){ document.getElementById('retour_data').innerHTML = '' }, 5000);
					refresh_table();
					close_modal();
				}
				else {
					document.getElementById("retour_data").innerHTML = '<div class="alert alert-danger" style="margin-bottom:0px;width:'+window.innerWidth+'px"><div class="row"><div class="col-md-11 "><center>'+data+'</center></div><div class="col-md-1"><span onclick="document.getElementById(\'retour_data\').innerHTML = \'\'">&times;</span>	</div></div></div>';
					// document.getElementById("myModal").style.display = "block"
				}
				// is_modif = 1
				
			}
   });
}

function submit_account(id=""){
	var XHR = new XMLHttpRequest();
	var urlEncodedData = "";
	var urlEncodedDataPairs = [];
    var name;
    // Configurez la requêtes
    if (id == ""){
        XHR.open('POST', 'http://localhost:3000/api/user/create');
    }
    else {
        XHR.open('PUT' ,'http://localhost:3000/api/user/get/'+id);
    }
	
	urlEncodedDataPairs.push(encodeURIComponent('email') + '=' + encodeURIComponent($('#email').val()));
	urlEncodedDataPairs.push(encodeURIComponent('password') + '=' + encodeURIComponent($('#password').val()));
	urlEncodedDataPairs.push(encodeURIComponent('surname') + '=' + encodeURIComponent($('#surname').val()));
	urlEncodedDataPairs.push(encodeURIComponent('name') + '=' + encodeURIComponent($('#name').val()));
	urlEncodedDataPairs.push(encodeURIComponent('geographicalZone') + '=' + encodeURIComponent($('#geographicalZone').val()));
	urlEncodedDataPairs.push(encodeURIComponent('type') + '=' + encodeURIComponent($('#type').val()));
	urlEncodedDataPairs.push(encodeURIComponent('nickname') + '=' + encodeURIComponent($('#nickname').val()));
	urlEncodedDataPairs.push(encodeURIComponent('socialSituation') + '=' + encodeURIComponent($('#socialSituation').val()));
	
  // Combinez les paires en une seule chaîne de caractères et remplacez tous
  // les espaces codés en % par le caractère'+' ; cela correspond au comportement
  // des soumissions de formulaires de navigateur.
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  // Définissez ce qui se passe en cas de succès de soumission de données
  XHR.addEventListener('load', function(event) {
    if (XHR.readyState === XHR.DONE) {
        data = JSON.parse(XHR.response).message;
        if (data.search('Utilisateur créé !') != -1 || data.search('User updated successfully!') != -1) {
            
            document.getElementById("retour_data").innerHTML = '<div class="alert alert-success" style="margin-bottom:0px;width:'+window.innerWidth+'px"><div class="row"><div class="col-md-11 "><center>'+data+'</center></div><div class="col-md-1"><span onclick="document.getElementById(\'retour_data\').innerHTML = \'\'">&times;</span>	</div></div></div>';
            refresh_table()
            close_modal()
        }
        else {
            document.getElementById("retour_data").innerHTML = '<div class="alert alert-danger" style="margin-bottom:0px;width:'+window.innerWidth+'px"><div class="row"><div class="col-md-11 "><center>'+data+'</center></div><div class="col-md-1"><span onclick="document.getElementById(\'retour_data\').innerHTML = \'\'">&times;</span>	</div></div></div>';
                            // document.getElementById("myModal").style.display = "block"
        }
    }
    
  });

  // Définissez ce qui arrive en cas d'erreur
  XHR.addEventListener('error', function(event) {
    alert('Oups! Quelque chose s\'est mal passé.');
  });

  
 

  // Ajoutez l'en-tête HTTP requise pour requêtes POST de données de formulaire
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  XHR.setRequestHeader('authorization', $_GET('token'));
  // Finalement, envoyez les données.
  XHR.send(urlEncodedData);
}