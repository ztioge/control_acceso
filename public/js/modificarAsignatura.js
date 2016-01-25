$(document).ready(function() {
	
	$.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
    }, "Value must not equal arg.");

	//reglas
	var reglas = {
		nombre:{required:true},
        clave:{required:true},
		obligatoria:{required:true},
		tipo:{required:true,valueNotEquals: "default" }
	};
	//mensajes
	var mensajes = {
		nombre:{required:" Requerido"},
        clave:{required:" Requerido"},
		obligatoria:{required:" Requerido"},
		tipo:{required:" Requerido",valueNotEquals: "elige un tipo: FP O Bachiller" }
	};

	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarAsignaturas();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarAsignaturas();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarAsignaturaId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/updateAsignatura' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "id_asignatura: <input type='text' id='id_asignatura' name='id_asignatura' class='form-control' value='"+result[0].id_asignatura+"'>";
    		formulario += "Nombre: <input type='text' id='nombre' name='nombre' class='form-control' value='"+result[0].nombre+"'>";
    		formulario += "Clave: <input type='text' id='clave' name='clave' class='form-control' value='"+result[0].clave+"'>";
    			if(result[0].obligatoria == 1){
					formulario += "Obligatoria<input type='radio' name='obligatoria' value='1' checked/>Si";
					formulario += "<input type='radio' name='obligatoria' value='0'/>No";
					formulario += "</br>";
				} else {
					formulario += "Obligatoria<input type='radio' name='obligatoria' value='1'/>Si";
					formulario += "<input type='radio' name='obligatoria' value='0'checked/>No";
					formulario += "</br>";					
				}
				if(result[0].tipo == 'FP'){
					formulario += "Tipo:<select name='tipo'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'>Bachiller</option>";
					formulario += "<option value='FP' selected>FP</option>";
					formulario += "</select>";
				} else {
					formulario += "Tipo:<select name='tipo'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'selected>Bachiller</option>";
					formulario += "<option value='FP'>FP</option>";
					formulario += "</select>";				
				}
			formulario += "</br><input type='submit' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace' href='/config/configGlobal/configAsignaturas' class='btn btn-primary'>Volver</a>";
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
			errorPlacement: function(error,element){
				element.before(error);
			},
	        submitHandler: function (form) {
	            event.preventDefault();
	            var data = $("#formUpdate").serializeArray();
	            console.log(data);
	            $.ajax({
	                url: '/updateAsignatura',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data);
	                console.log("success");
	            })
	            .fail(function() {
	                console.log("error");
	            })
	            /*
	            *   Form Submit Fin
	            */
	        }//submitHandler
	    });//Validate
	  //$( "#target" ).submit();
	});

	



	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarAsignaturas () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/buscarAsignaturaNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_asignatura+"'>"+data[i].id_asignatura+" "+data[i].nombre+"</h3>";
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
	}//function buscarAsignaturas

	//funcion para buscar alumnos por id
	function buscarAsignaturaId (id) { 
		return	$.ajax({
					url: '/buscarAsignaturaPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_asignatura:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarProfesores
	
			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		console.log($('#resultado #id_asignatura').val());
		if(confirm("Estas seguro de borrar la asignatura?")) {
			$.ajax({
				url: '/borrarAsignatura',
				type: 'post',
				dataType: 'html',
				data: {'id_asignatura':$('#resultado #id_asignatura').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function() {
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario asiganura
	
});//ready

