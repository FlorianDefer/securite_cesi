//affiche la fenetre ajouter un message
//path = chemin vers le servicer
function new_resources() {
    $('#_Modal_title').html('Ajouter un compte')
    $('#resources_form_btn').attr('onclick','submit_resources()');
    $('#category').html('');
    jQuery.ajax({ url : 'http://localhost:3000/api/category/get' }).done(function(data){
    console.log(data)
   // info = JSON.parse(data)	
   data.forEach(function(elem){
             $('#category').append('<option value="' + elem._id+ '">' +  elem.name + '</option>');
        })
    });
		$('#new_resources_Modal').modal('show')

}

function update_resources(id) {

    $('#resources_form_btn').attr('onclick','submit_resources(\''+id+'\')');

    $('#_Modal_title').html('Modfier un compte')
    $('#new_resources_Modal').modal('show')


    jQuery.ajax({ url : 'http://localhost:3000/api/resources/'+id	}).done(function(data){
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
    $('#new_resources_Modal').modal('show')
}

function submit_resources(id=""){
	var XHR = new XMLHttpRequest();
	var urlEncodedData = "";
	var urlEncodedDataPairs = [];
    var name;
    // Configurez la requêtes
    if (id == ""){
        XHR.open('POST', 'http://localhost:3000/api/resources/create');
    }
    else {
        XHR.open('PUT' ,'http://localhost:3000/api/resources/get/'+id);
    }
    array_relation = new Array()
    if ($('#soi').is(":checked"))
    {
      array_relation.push("soi")
    }
    if ($('#conjoints').is(":checked"))
    {
      array_relation.push("conjoints")
    }
    if ($('#famille').is(":checked"))
    {
      array_relation.push("famille")
    }
    if ($('#professionnelle').is(":checked"))
    {
      array_relation.push("professionnelle")
    }
    if ($('#amis').is(":checked"))
    {
      array_relation.push("amis")
    }
    if ($('#inconnus').is(":checked"))
    {
      array_relation.push("inconnus")
    }
   my_date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
   console.log(my_date);
   console.log($_GET('userId').replace('#', ''));
	urlEncodedDataPairs.push(encodeURIComponent('title') + '=' + encodeURIComponent($('#title').val()));
	urlEncodedDataPairs.push(encodeURIComponent('description') + '=' + encodeURIComponent($('#description').val()));
	urlEncodedDataPairs.push(encodeURIComponent('categoryid') + '=' + encodeURIComponent($('#category').val()));
	urlEncodedDataPairs.push(encodeURIComponent('type') + '=' + encodeURIComponent($('#name').val()));
	urlEncodedDataPairs.push(encodeURIComponent('relation') + '=' + encodeURIComponent(array_relation));
	urlEncodedDataPairs.push(encodeURIComponent('datePublished') + '=' + encodeURIComponent(my_date));
	urlEncodedDataPairs.push(encodeURIComponent('userId') + '=' + encodeURIComponent($_GET('userId').replace('#', '')));

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