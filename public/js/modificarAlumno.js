$(document).ready(function() {

    jQuery.validator.addMethod("lettersonly", function(value, element) { 
    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	},"Please enter only letters");
	
    jQuery.validator.addMethod("dni", function(value, element) {
        if ($('#dni').val().length == 10){
            return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
        }
    });

    //regla correo
    jQuery.validator.addMethod("correo", function(value, element) {
        return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
    });

	//reglas
	var reglas = {
		dni:{required:true,dni:true},
        nombre:{required:true,lettersonly:true},
		apellidos:{required:true,lettersonly:true},
		correo:{required:true,correo:true},
        num_tarjeta:{required:true},
	};
	//mensajes
	var mensajes = {
		dni:{required:"",dni:""},
        nombre:{required:"",lettersonly:""},
		apellidos:{required:"",lettersonly:""},
		correo:{required:"",correo:""},
        num_tarjeta:{required:""},
	};

	
	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarAlumnos();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarAlumnos();
	});
	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarAlumnoPorId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/modificarAlumno' id='formUpdate' name='formUpdate'>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_alumno' class='input-group-addon'>ID ALUMNO</label>";     		
    		formulario += "<input type='text' id='id_alumno' name='id_alumno' class='form-control' value='"+result.id_alumno+"'readonly>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
  			formulario += "<div class='form-inline' id='alertDni'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='dni' class='input-group-addon'>DNI</label>"; 
    		formulario += "<input type='text' id='dni' name='dni' class='form-control has-feedback' value='"+result.dni+"'>";
    		formulario += "<span id='dni1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";    		
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Dni ya existente</span></div>";	    		
    		formulario += "<div class='form-inline'  id='alertNombre'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='nombre' class='input-group-addon'>NOMBRE</label>"
    		formulario += "<input type='text' id='nombre' name='nombre' class='form-control has-feedback' value='"+result.nombre+"'>";
    		formulario += "<span id='nombre1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>"; 
  			formulario += "<div class='form-inline'  id='alertApellidos'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='apellidos' class='input-group-addon'>APELLIDOS</label>"
    		formulario += "<input type='text' id='apellidos' name='apellidos' class='form-control has-feedback' value='"+result.apellidos+"'>";
    		formulario += "<span id='apellidos1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
  			formulario += "<div class='form-inline'  id='alertCorreo'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='correo' class='input-group-addon'>CORREO</label>" 
    		formulario += "<input type='text' id='correo' name='correo' class='form-control has-feedback' value='"+result.correo+"'>";
    		formulario += "<span id='correo1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<img id='fotoProfesor' alt='fotoProfesor' src='data:img/png;base64,"+result.foto+"'/></br>";
    		formulario += "<br/>";
    		formulario += "<div class='form-inline'  id='alertFoto'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label id='labelfoto' for='foto' class='input-group-addon'>FOTO</label>";
    		formulario += "<input type='file' id='foto' name='foto' class='form-control has-feedback'>";
    		formulario += "<span id='foto1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='tarjeta_activada' class='input-group-addon'>TARJETA ACTIVADA</label>"
    		formulario += "<input type='text' id='tarjeta_activada' name='tarjeta_activada' class='form-control has-feedback' value='"+result.tarjeta_activada+"'>";
    		formulario += "<span id='tarjeta_activada1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'  id='alertNum_tarj'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='num_tarjeta' class='input-group-addon'>NUMERO TARJETA</label>"
    		formulario += "<input type='text' id='num_tarjeta' name='num_tarjeta' class='form-control has-feedback' value='"+result.num_tarjeta+"'>";
			formulario += "<span id='num_tarjeta1' class='glyphicon form-control-feedback'></span>";
			formulario += "</div>";
  			formulario += "</div><br/>";
			buscarGruposDelAlumno(result.id_alumno);
    		formulario += "<div id='gruposdelAlumno'>";
    		formulario += "</div>";
    		buscarTodosLosGrupos(result.id_alumno);
    		formulario += "<div id='gruposTodos'>";
    		formulario += "</div>";
    		buscarAsignaturasConvalidadasDelAlumno(result.id_alumno);
    		formulario += "Asignaturas,selecciona la que quieres convalidar: <div id='AsignaturaGrupo'>";
    		formulario += "</div>";
			buscarAsignaturasNoConvalidadasDelAlumno(result.id_alumno);
			formulario += "<div id='AsignaturaGrupoRestante'>";
    		formulario += "</div>";
			formulario += "<input type='submit' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace2' href='/config' class='btn btn-primary'>Volver</a>";
    		formulario += "</form>";
    		$('#resultado').html(formulario);
		})
		.fail(function() {
    		console.log("error crear formulario");
		});
	});//Formulario modificar y borrar

$('#resultado').on("click","#btnModificar",function () {
		$("#formUpdate").validate({
	        rules:reglas,
	        messages:mensajes,
	        highlight: function(element) {
	                var id_attr = "#" + $( element ).attr("id") + "1";
	                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
	        },
	        unhighlight: function(element) {
	                var id_attr = "#" + $( element ).attr("id") + "1";
	                $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');      
	        },
	        errorPlacement: function(error,element){
	            console.log(error.attr("id"));
	            if (error.attr("id") == "dni-error"){
	                 showAlertValidate("#alertDni"," Introduce un dni correcto");
	            } else if (error.attr("id") == "nombre-error"){
	                showAlertValidate("#alertNombre"," Solo Letras por favor");
	            }else if (error.attr("id") == "apellidos-error"){
	                showAlertValidate("#alertApellidos"," Solo Letras por favor");
	            } else if (error.attr("id") == "correo-error"){
	                showAlertValidate("#alertCorreo"," Introduce un correo correcto");
	            } else if (error.attr("id") == "foto-error"){
	                showAlertValidate("#alertFoto"," Tamaño de la foto maximo 100Kb");
	            }
	            
	        },
	        submitHandler: function (form) {
	        	console.log($('#resultado #gruposdelAlumno :checkbox').length);
	        	if ($('#resultado #foto').val() == ''){
	        		event.preventDefault();
	            	var data = $("#formUpdate").serializeArray();
			            $.ajax({
			                url: '/configAlumno/modificarAlumnoSinFoto',
			                type: 'post',
			                dataType: 'json',
			                data: data,
			                success: function (data) {
			                }
			            })
			            .done(function(data) {
			                console.log(data)
				                if (data.err=="existeDNI"){
				                showAlert($('#resultado #alertDni'),"error"," DNI ya existente");
				                } else if (data.err=="existeCorreo"){
				                showAlert($('#resultado #alertCorreo'),"error"," Correo ya existente");
				                } else if (data.err=="existeTarjeta"){
				                showAlert($('#resultado #alertNum_tarj'),"error"," Tarjeta ya existente");
				                } else if (data.err=="nogrupo"){
				                showAlertValidate("#enlace2"," Selecciona un grupo para el alumno");	
				                }else if (data.dato=="ok"){
				                showAlertRedirect($('#resultado #enlace2'),"ok"," Alumno modificado correctamente",'/config');
				                }
				                console.log("success");
					            })
					            .fail(function() {
			                console.log("error");
			            })
	        	} else {
	        		var attach_id = $('#resultado #foto').attr("id");
					var size = $('#'+attach_id)[0].files[0].size;
					   if (size > 102400)// checks the file more than 100 Kb
			           {
			               showAlertValidate("#alertFoto"," Tamaño de la foto maximo 100Kb");
			           } else {      
			           
	            	event.preventDefault();
	            	var formData = new FormData($('#resultado #formUpdate')[0]);
	            $.ajax({
	                url: '/configAlumno/modificarAlumno',
	                type: 'post',
	                data: formData,
	                async: false,
	                cache: false,
	                contentType: false,
	                processData: false,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data)
		                if (data.err=="existeDNI"){
		                showAlert($('#resultado #alertDni'),"error","dni ya existente");
		                } else if (data.err=="existeCorreo"){
		                showAlert($('#resultado #alertCorreo'),"error","Correo ya existente");
		                } else if (data.err=="existeTarjeta"){
		                showAlert($('#resultado #alertNum_tarj'),"error","Tarjeta ya existente");
		                }else if (data.dato=="ok"){
		                showAlertRedirect($('#resultado #enlace2'),"ok","Alumno modificada correctamente",'/config');
		                }
		                console.log("success");
			            })
			            .fail(function() {
	                console.log("error");
	            })
	            /*
	            *   Form Submit Fin
	            */
	            }//.else if (size > 102400)
	        	}//.else	        
	        }//submitHandler
	    });//Validate
	  //$( "#target" ).submit();
	});

	
	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarAlumnos () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configAlumno/buscarAlumnoPorNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_alumno+"'>"+data[i].id_alumno+" "+data[i].nombre+"</h3>";
					resp += "</td></tr></table>";
				};
				$('#resultado').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAlumnos

	//funcion para buscar alumnos por id
	function buscarAlumnoPorId (id) { 
		return	$.ajax({
					url: '/configAlumno/buscarAlumnoPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarAlumnoPorId

			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar al alumno?")) {
			$.ajax({
				url: '/configAlumno/borrarAlumno',
				type: 'post',
				dataType: 'html',
				data: {'id_alumno':$('#resultado #id_alumno').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				if (data[9]=="o"){
				showAlertRedirect("#enlace2","ok"," Alumno borrado correctamente",'/config');
				}
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario alumno

	//funcion para buscar las asignaturas de un grupo
	$('#resultado').on("change","#gruposdelAlumno" || "#gruposTodos",function () {
		$(":checkbox").click(function(){
	    	var arrayId_grupo=[];
	    $('#gruposdelAlumno  :checkbox').each(function(){
	    	if($(this).prop('checked')){
	    		arrayId_grupo.push($(this).attr('value'));
	    	} })
	   	$('#gruposTodos  :checkbox').each(function(){
	    	if($(this).prop('checked')){
	    		arrayId_grupo.push($(this).attr('value'));
	    	} })
	   	console.log(arrayId_grupo.length);
	   	if (arrayId_grupo.length == 0){
	   		$('#AsignaturaGrupoRestante').html('');
			$('#AsignaturaGrupo').html('');
	   	} else {
					$.ajax({
					url: '/configGrupo/buscarAsignaturasDelosGrupos',
					type: 'post',
					dataType: 'json',
					data: {id_grupo:arrayId_grupo},
					success:function (data) {
						$('#AsignaturaGrupoRestante').html('');
						$('#AsignaturaGrupo').html('');
						var resp = "";
						resp += "<div class='form-inline'>";
    					resp += "<div class='input-group'>";
						resp += "<label for='asignaturas' class='input-group-addon'>ASIGNATURAS</label>";
						resp += "</div>";
  						resp += "</div><br/>";
						resp += "<table id='asignaturas'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_asignatura+"' name='asignatura' value='"+data[i].id_asignatura+"'>";
							resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#AsignaturaGrupo').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
				/**/
			}//.else
			});//$(":checkbox").click(function()
	});

	//funcion para buscar todos los grupos
	function buscarGruposDelAlumno (id) {
		return	$.ajax({
					url: '/configGrupo/buscarGruposdelAlumno',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<div class='form-inline'>";
    					resp += "<div class='input-group'>";
						resp += "<label for='gruposdelAlumno' class='input-group-addon'>GRUPOS DEL ALUMNO</label>";
						resp += "</div>";
  						resp += "</div><br/>";
						resp += "<table id='gruposdelAlumno'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_grupo+"' name='grupo' value='"+data[i].id_grupo+"' checked='true'>";
							resp += "<label for='"+data[i].id_grupo+"'>"+data[i].nombre_grupo+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#gruposdelAlumno').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarTodosLosGrupos

		//funcion para buscar todos los grupos
	function buscarTodosLosGrupos (id) {
		return	$.ajax({
					url: '/configGrupo/buscarTodosLosGrupos',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<div class='form-inline'>";
    					resp += "<div class='input-group'>";
						resp += "<label for='gruposTodos' class='input-group-addon'>GRUPOS RESTANTES</label>";
						resp += "</div>";
  						resp += "</div><br/>";
						resp += "<table id='gruposTodos'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_grupo+"' name='grupo' value='"+data[i].id_grupo+"'>";
							resp += "<label for='"+data[i].id_grupo+"'>"+data[i].nombre_grupo+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#gruposTodos').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarTodosLosGrupos

			//funcion para buscar las asignaturas de un grupo
	function buscarAsignaturasConvalidadasDelAlumno (id) {
		return	$.ajax({
					url: '/configAlumno/buscarAsignaturasConvalidadasDelAlumno',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<div class='form-inline'>";
    					resp += "<div class='input-group'>";
						resp += "<label for='asignaturas' class='input-group-addon'>ASIGNATURAS</label>";
						resp += "</div>";
  						resp += "</div><br/>";
						resp += "<table id='asignaturas'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_asignatura+"' name='asignatura' value='"+data[i].id_asignatura+"'checked='true' >";
							resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#AsignaturaGrupo').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarTodosLosGrupos

		function buscarAsignaturasNoConvalidadasDelAlumno (id) {
		return	$.ajax({
					url: '/configAlumno/buscarAsignaturasNoConvalidadasDelAlumno',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<table id='asignaturas'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_asignatura+"' name='asignatura' value='"+data[i].id_asignatura+"'>";
							resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#AsignaturaGrupoRestante').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarTodosLosGrupos

		$('#resultado').on("change","#AsignaturaGrupo" || "#AsignaturaGrupoRestante" || "#gruposdelAlumno"  || "#gruposTodos" ,function () {
		$(":checkbox").click(function(){
	        var id = $(this).attr('id'); 
		if ($(this).attr("checked",true)) {
			$(this).attr("checked",false);
		} else {
			$(this).attr("checked",true)
		}
		});//$(":checkbox").click(function()
	});




});//ready
function showAlertValidate(lugar,texto) {
    $('#mensaje').attr('class','alert alert-warning fade in');
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(1000, function(){
                });
    }


function showAlert(lugar,tipo,texto) {

    if (tipo=="error"){
        $('#mensaje').attr('class','alert alert-danger fade in');
    }else {
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(1000, function(){
                });

    }

function showAlertRedirect(lugar,tipo,texto,url) {

    if (tipo=="error"){
        $('#mensaje').attr('class','alert alert-danger fade in');
    }else {
        $('#mensaje strong').html(' ');
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(1000, function(){
      window.location.replace(url);
                });

    }