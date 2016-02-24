# ContolFid

######Control de acceso/asistencia 

## Descripción

Proyecto de fin de curso 2014-2016 del ciclo formativo de desarrollo de aplicaciones web

En éste proyecto, hemos creado una empresa temporal, la cual se dedica mediante tecnologías de hoy en día al control de asistencia/acceso en cualquier entorno mediante un dispositivo electrónico y una aplicación web.

En el siguente apartado se detallan los pasos a seguir para la implementación de nuestra aplicación.

* * *

[Web ControlFid](controlfid.zubirimanteoweb.com)  

* * *

## Documentación

Primeramente descargar el código desde éste repositorio, acceder a él desde la línea de comandos y ejecutar 'npm install' para instalar los módulos necésarios para el funcionamiento. [Guía de instalación de NodeJS y npm](https://github.com/ionatibia/nodejs)  
Para poner en marcha la aplicación ejecutar "node ./bin/www.js".

### Dispositivo

El dispositivo utilizado en éste proyecto ha sido diseñado por alumnos de Don Bosco, pero en éste documento se detalla como hacerlo con un dispositivo Arduino o sin ningún dispositivo.

*	Sin dispositivo: Podemos utilizar cualquier REST client como [PostMan para Chrome](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) o [REST Client para Android](https://play.google.com/store/apps/details?id=com.sourcestream.android.restclient&hl=es). La dirección GET en ambos casos, para el cambio de presencia es 'http://'donde este alojada la aplicación'/presencia?num_tarjeta='número de tarjeta'&room='numero dispositivo''.
Es posible añadir '&time='00:00:00'' si no se añade, utilizará la hora del sistema.

*  Arduino

	*	Materiales: 
		*	[Placa arduino UNO](https://www.google.es/search?sourceid=chrome-psyapi2&ion=1&espv=2&ie=UTF-8&q=arduino%20UNO&oq=arduino%20UNO&aqs=chrome..69i57j0l5.2722j0j7)
		*	[Ethernet shield](https://www.google.es/search?sourceid=chrome-psyapi2&ion=1&espv=2&ie=UTF-8&q=ethernet%20shield%20arduino&oq=ethernet%20shield%20&aqs=chrome.1.69i57j0l5.4435j0j9)
		*	[RFID rc522](https://www.google.es/search?espv=2&q=arduino+rfid+rc522&oq=arduino+rfi&gs_l=serp.1.1.0l10.26130.28270.0.30137.11.11.0.0.0.0.116.913.7j3.10.0....0...1c.1.64.serp..1.10.910.z9XDkjYuEvo)

	*	Conexiones:
		*	RFID:
			*	SDA -> pin7
			*	SCK -> pin13
			*	MOSI -> pin11
			*	MISO -> pin12
			*	GND -> GND
			*	RST -> pin9
			*	3.3V -> 3.3V
		*	LEDs:
			*	Verde -> pin2
			*	Amarillo -> pin3
			*	Rojo -> pin4
			*	Resistencias de 220 Ohm

	*	Código:
		*	Descargar el código desde el [repositorio](https://github.com/ionatibia/Arduino_Proyects/tree/master/proyecto27_Controlfid_V1).
		*	Sustituir el nombre del servidor de la línea 29 por el vuestro o la IP
		*	Comprobar con el monitor serie de Arduino el número de las tarjetas y añadirlas a la base de datos de la aplicación

	![Sin titulo](public/images/arduino.jpg)


### Base de datos

*   **MySQL:** Importar base de datos mediante phpMyAdmin o línea de comandos a MySQL local o en la nube. Hay 2 opciones:
    1.  Cotrolfid.sql: Contiene datos de alumnos, clases, profesores, etc... preinsertados para una utilización rápida de la aplicación. **Las contraseñas** de los profesores son como usuario profesor(1-5)@zubirimanteo.com y como contraseña para todos su correspondiente profesor(1-5).
    2.  ControlfidVacio.sql: Contiene 1 único usuario con permisos de administrador para tener el esquema vacio e ir configurándolo a gusto del consumidor (seguir pasos del apartado Uso). Ususario: admin pasword: admin.

*   **Conexión en local:** Modificar los parámetros que están entre comillas simples en el archivo 'models/connection.js' host,puerto,usuario,contraseña, el nombre de la base de datos no es necesario modificar.
*   **Openshift:** No hay que modificar nada.
*   **Cloud 9:** Comentar el código existente y descomentar el segundo código en el archivo 'models/connection.js'.

*   **Mongo:** Crear una cuenta en MongoLabs o utilizar servidor Mongo local. Crear una Collection llamada 'faltas' y modificar la dirección del servidor mongo (@ds059215.mongolab.com:59215/faltas) en el archivo 'models/mongo.js'. Para el usuario y la contraseña guardarlos en variables de entorno con los nombres, MONGO_USER y MONGO_PASSWORD. [Guía Openshift](https://developers.openshift.com/en/managing-environment-variables.html). En local utilizar en la llamada a la aplicación "MONGO_USER='el usuario' MONGO_PASSWORD='el password' node ./bin/www.js"

### Correo

*   **Maigun:** Crear cuenta en Mailgun, guardar el dominio y la ApiKey como variables de entorno con los nombres MAILGUN_DOMAIN y MAILGUN_API_KEY. Para la configuración del correo con el dominio [acceder aquí](https://github.com/ionatibia/php/tree/master/tests/3-mailgun)


###Uso

Login

Iniciamos la aplicacion y en el login insertamos el usuario y la contraseña.Si el usuario y la contraseña son correctos accederemos a la aplicacion. hay dos tipos de acceso: Profesor y administrador. Para acceder como profesor solamente tenemos que introducir el usuario y la contraseña del profesor. Para acceder como administrador en cambio tenemos que introducir un usuario que sea administrador y hacer click en el boton "Entrar como administrador". Depende del tipo de acceso que hagamos accederemos a diferente paginas. Si accedemos como profesor nos dirigiremos a la pagina vista profesor, en cambio si accedemos como administrador nos dirigiremos a la pagina de configuracion de la aplicación.

Vista Profesor

En esta pagina el profesor podra ver los alumnos que tiene en la clase actual con su foto y datos correspondientes. Los alumnos apareceran en colores diferentes dependiendo si estan en clase o no. Si estan en clase el alumno aparecera en verde, si no esta aparecera en rojo y al final de la clase ese alumno tendra una falta. en esta pagina el profesor tambien podra consultar su horario haciendo click en el boton Horario. Como en toda la aplicacion el profesor tiene un buscador de personas para saber donde se encuentra el alumno o profesor y en el mismo se puede buscar de diferente modos: DNI , nombre apellidos y correo electronico. si el profesor tiene alguna duda o necesita contactar con el administrador tiene un boton en la parte inferior de la pagina para mandar un mensaje.Tambien en la parte inferior derecha de la pagina tiene un boton para salir de la apliacion. si el profesor tiene permisos de administrador podra acceder desde vista profesor a la configuracion. 


Configuracion

En esta pagina el usuario podra administrar la aplicacion. cuando accedemos a la pagina vemos todas las aulas que hay en el colegio. al hacer click en una aula, si hay clase nos redirigira a la clase y veremos la vista del profesor. si no hay clase nos aparecera un mensaje advirtiendonos que en ese aula no hay ninguna clase.
en la parte superior de la pagina veremos que hay un menu. desde ese menu podemos acceder a diferente paginas para administrar nuestra aplicacion. las paginas a las que podemos acceder son:

	- Modifiar Falta
	- Dispositivos
	- Global
		- Asignaturas
			-	Agregar Asignatura
			-   Modificar Asignatura
		- Grupos
			-	Agregar Grupos
			-   Modificar Grupos		
		- Aulas
			-	Agregar Aulas
			-   Modificar Aulas		
		- Horario Grupo
			-	Agregar Horario Grupo
			-   Modificar Horario Grupo		
		- Horario Profesor
			-	Agregar Horario Profesor
			-   Modificar Horario Profesor
	- Personas
		- Alumno
			-	Agregar Alumno
			-   Modificar Alumno	
		- Profesor
			-	Agregar Profesor
			-   Modificar Profesor				

Modificar Falta

En esta pagina podemos modificar la falta. 
cuandro abrimos la pagina aparece un buscador de faltas, escribimos el nombre del alumno y hacemos click en la falta. al hacer click se abre otro formulario con los datos de la falta para modificar. los campos que se pueden modificar son el alumno y la observacion de la falta. esta comprobado que no se pueda modificar la falta igual que una ya existente. al finalizar la modificacion hacemos click en modificar si queremos modificar la falta si queremos borrar la falta hacemos click en el boton borrar. al hacer click en modificar aparecera una recuadro en verde con el texto "falta modificada correctamente" y si borramos la falta aparece el recuerdo con el texto "falta borrada correctamente" en los dos casos nos redirrigira a la pagina de configuracion.

Dispositivos

En esta pagina aparecen los dispositivos que tenemos. Se pueden añadir haciendo click en el boton añadir y seleccionando el aula donde esta el dispositivo y el numero que tiene el dispositivo. tambien podemos borrar el dispositivo haciendo click en el boton borrar que esta debajo del dispositivo.

Global

Asignaturas

Agregar Asignatura

En esta pagina añadimos una asignatura a la base de datos.rellenamos los campos del formulario y hacemos click en añadir. en cuanto hagamos click aparecera un recuadro con el texto "asignatura añadida correctamente" y nos redirrigira a la pagina de configuracion. esta comprobado que no se pueda añadir una clave de una asignatura ya existente y que el campo nombre tienen que ser solo letras.

Modificar Asignatura

En esta pagina podemos modificar la asignatura. 
cuando abrimos la pagina aparece un buscador de asignaturas, escribimos el nombre de la asignatura y hacemos click en la asignatura. al hacer click se abre otro formulario con los datos de la asignatura para modificar. se pueden modificar todos los campos excepto el campo id asignatura. esta comprobado que no se pueda modificar la clave de la asignatura con una ya existente. al finalizar la modificacion hacemos click en modificar si queremos modificar la asignatura ,si queremos borrar la falta hacemos click en el boton borrar. al hacer click en modificar aparecera una recuadro en verde con el texto "asignatura modificada correctamente" y si borramos la falta aparece el recuerdo con el texto "asignatura borrada correctamente" en los dos casos nos redirigira a la pagina de configuracion.

Grupos

Agregar Grupo

En esta pagina añadimos un grupo a la base de datos.rellenamos los campos del formulario y hacemos click en añadir. en cuanto hagamos click aparecera un recuadro con el texto "grupo añadida correctamente" y nos redirrigira a la pagina de configuracion. esta comprobado que no se pueda añadir un nombre de grupo ya existente.

Modificar Grupo

En esta pagina podemos modificar la Grupo. 
cuando abrimos la pagina aparece un buscador de grupos, escribimos el nombre del grupo y hacemos click en el grupo. al hacer click se abre otro formulario con los datos del Grupo para modificar. se pueden modificar todos los campos excepto el campo id Grupo. esta comprobado que no se pueda modificar el nombre del grupo con uno ya existente. al finalizar la modificacion hacemos click en modificar si queremos modificar el grupo ,si queremos borrar el grupo hacemos click en el boton borrar. al hacer click en modificar aparecera una recuadro en verde con el texto "Grupo modificado correctamente" y si borramos la falta aparece el recuerdo con el texto "Grupo borrado correctamente" en los dos casos nos redirigira a la pagina de configuracion.

Aulas
Agregar Aula

En esta pagina añadimos una aula a la base de datos.rellenamos los campos del formulario y hacemos click en añadir. en cuanto hagamos click aparecera un recuadro con el texto "aula añadida correctamente" y nos redirrigira a la pagina de configuracion. esta comprobado que no se pueda añadir un numero de aula ya existente , que el campo numero no puede ser mayor a 250, que el campo piso no puede ser mayor a 3 y que el campo capacidad no puede ser mayor a 30 .

Modificar Aula

En esta pagina podemos modificar el aula. 
cuando abrimos la pagina aparece un buscador de aula, escribimos el numero del aula y hacemos click en el aula. al hacer click se abre otro formulario con los datos del aula para modificar. se pueden modificar todos los campos excepto el campo id aula. esta comprobado que no se pueda modificar la clave de la aula con una ya existente , que el campo numero no puede ser mayor a 250, que el campo piso no puede ser mayor a 3 y que el campo capacidad no puede ser mayor a 30.al finalizar la modificacion hacemos click en modificar si queremos modificar el aula ,si queremos borrar la falta hacemos click en el boton borrar. al hacer click en modificar aparecera una recuadro en verde con el texto "aula modificada correctamente" y si borramos la falta aparece el recuerdo con el texto "aula borrada correctamente" en los dos casos nos redirigira a la pagina de configuracion.

Horario Grupo

Agregar Horario Grupo

En esta pagina añadimos un horario de un grupo a la base de datos.rellenamos los campos del formulario y hacemos click en añadir. en cuanto hagamos click aparecera un recuadro con el texto "horario grupo añadido correctamente" y nos redirigira a la pagina de configuracion. esta comprobado que no se pueda añadir un horario grupo ya existente y que el campo hora inicio no puede ser mayor a el campo hora_final.

Modificar Horario Grupo

En esta pagina podemos modificar el horario de un grupo. 
cuando abrimos la pagina aparece un buscador de horario grupos, escribimos el nombre del grupo y hacemos click en el horario_grupo. al hacer click se abre otro formulario con los datos del horario_grupo para modificar. se pueden modificar todos los campos excepto el campo id horario_grupo. esta comprobado que no se pueda modificar los campos como un horario grupo ya existente y que el campo hora inicio no puede ser mayor a el campo hora_final.al finalizar la modificacion hacemos click en modificar si queremos modificar el horario_grupo ,si queremos borrar el horario grupo hacemos click en el boton borrar. al hacer click en modificar aparecera una recuadro en verde con el texto "horario_grupo modificada correctamente" y si borramos el horario_grupo aparece el recuerdo con el texto "horario_grupo borrada correctamente" en los dos casos nos redirigira a la pagina de configuracion.

Horario Profesor

Agregar Horario Profesor

En esta pagina añadimos un horario de un profesor a la base de datos.seleccionamos el id_horario_grupo y el profesor y hacemos click en añadir. en cuanto hagamos click aparecera un recuadro con el texto "horario Profesor añadido correctamente" y nos redirigira a la pagina de configuracion. esta comprobado que no se pueda añadir un horario profesor ya existente.

Modificar Horario Profesor

En esta pagina podemos modificar el horario de un profesor. 
cuando abrimos la pagina aparece un buscador de horario profesor, escribimos el nombre del profesor y hacemos click en el horario_profesor. al hacer click se abre otro formulario con los datos del horario_profesor para modificar. solo se puede modificar el campo del profesor. esta comprobado que no se pueda modificar los campos como un horario profesor ya existente. al finalizar la modificacion hacemos click en modificar si queremos modificar el horario_profesor ,si queremos borrar el horario profesor hacemos click en el boton borrar. al hacer click en modificar aparecera una recuadro en verde con el texto "horario_profesor modificada correctamente" y si borramos el horario_profesor aparece el recuerdo con el texto "horario_profesor borrada correctamente" en los dos casos nos redirigira a la pagina de configuracion.

Personas

Alumno

Agregar Alumno

En esta pagina añadimos un Alumno a la base de datos.rellenamos todos los campos y hacemos click en añadir. en cuanto hagamos click aparecera un recuadro con el texto "alumno añadido correctamente" y nos redirigira a la pagina de configuracion. esta comprobado que no se pueda añadir un dni,correo,num_tarjeta que ya exista ,el tamaño de la foto tiene que ser inferior a 100kb,el nombre y apellidos no puede ser numerico,que el dni sea un dni y que el correo sea un correo.

Modificar Alumno

En esta pagina podemos modificar el alumno. 
cuando abrimos la pagina aparece un buscador de alumnos, escribimos el nombre del alumno y hacemos click en el alumno que queremos modificar o borrar. al hacer click se abre otro formulario con los datos del alumno para modificar. en este formulario aparecen campos que no estaban al agregar el alumno.podemos modificar los campos que rrelenamos al agregar el alumno pero tambien podemos modificar si la tarjeta esta activada o no, el grupo o los grupos en los que esa el alumno y las asignaturas que tiene convalidadas el alumno, los grupos del alumno y las asignatura convalidadas aparecen seleccionadas. tambien tenemos un boton para mostrar todos los grupos que tenemos en la base de datos. esta comprobado que no se pueda modificar el id alumno, que no se pueda tener dni,correo,num_tarjeta ya existente, que la foto no puede ser mayor de 100kb,que el nombre y apellidos del alumno no puedan ser numeros , que el dni sea un dni, que el correo sea un correo verdadero. al finalizar la modificacion hacemos click en modificar si queremos modificar el alumno ,si queremos borrar el alumno hacemos click en el boton borrar. al hacer click en modificar aparecera una recuadro en verde con el texto "alumno modificada correctamente" y si borramos el alumno aparece el recuerdo con el texto "alumno borrada correctamente" en los dos casos nos redirigira a la pagina de configuracion.

Profesor

Agregar Profesor

En esta pagina añadimos un Profesor a la base de datos.rellenamos todos los campos y hacemos click en añadir. en cuanto hagamos click aparecera un recuadro con el texto "Profesor añadido correctamente" y nos redirigira a la pagina de configuracion. esta comprobado que no se pueda añadir un dni,correo,num_tarjeta que ya exista ,el tamaño de la foto tiene que ser inferior a 100kb,el nombre y apellidos no puede ser numerico,que el dni sea un dni y que el correo sea un correo. cuando mandamos el password del profesor a la base de datos lo encriptamos.

Modificar Profesor

En esta pagina podemos modificar el Profesor. 
cuando abrimos la pagina aparece un buscador de profesores, escribimos el nombre del Profesor y hacemos click en el Profesor que queremos modificar o borrar. al hacer click se abre otro formulario con los datos del Profesor para modificar. en este formulario aparecen campos que no estaban al agregar el Profesor.podemos modificar los campos que rrelenamos al agregar el Profesor pero tambien podemos modificar si la tarjeta esta activada o no, si es administrador o no,podemos modificar el password introduciendo el password viejo y dos veces el passsword nuevo , las asignaruras que imparte el profesor aparecen seleccionadas. esta comprobado que no se pueda modificar el id Profesor, que no se pueda tener dni,correo,num_tarjeta ya existente, que la foto no puede ser mayor de 100kb,que el nombre y apellidos del Profesor no puedan ser numeros , que el dni sea un dni, que el correo sea un correo verdadero, que el password viejo sea el verdadero y que el profesor tiene que tener como minimo una asignatura. al finalizar la modificacion hacemos click en modificar si queremos modificar el Profesor ,si queremos borrar el Profesor hacemos click en el boton borrar. al hacer click en modificar aparecera una recuadro en verde con el texto "Profesor modificada correctamente" y si borramos el Profesor aparece el recuerdo con el texto "Profesor borrada correctamente" en los dos casos nos redirigira a la pagina de configuracion.

###API

### ALUMNOS

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarAlumno</td>
<td align="left">dni,nombre,apellidos,correo,num_tarjeta</td>
</tr>
<tr class="even">
<td align="left">/modificarAlumno</td>
<td align="left">id_alumno,dni,nombre,apellidos,correo,num_tarjeta,tarjeta_activada</td>
</tr>
<tr class="odd">
<td align="left">/modificarPresenciaDelAlumno</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="even">
<td align="left">/borrarAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoPorId</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoPorDni</td>
<td align="left">dni</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoPorTarjeta</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoPorNombre</td>
<td align="left">nombre</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoPorNombreYApellidos</td>
<td align="left">nombre, apellidos</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoPorCorreo</td>
<td align="left">correo</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoPorCorreo</td>
<td align="left">correo</td>
</tr>
<tr class="even">
<td align="left">/buscarAulaEnLaQueTieneQueEstarPorTarjeta</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="odd">
<td align="left">/buscarAulaEnLaQueTieneQueEstarPorId</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarPresenciaAlumno</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="odd">
<td align="left">/buscarTodosLosIdAlumno</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarTodosLosIdNombreApellidosAlumno</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarAsignaturasConvalidadasDelAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarAsignaturasNoConvalidadasDelAlumno</td>
<td align="left">id_alumno</td>
</tr>
</tbody>
</table>

### ALUMNO GRUPOS

<table>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarAlumnoGrupo</td>
<td align="left">id_grupo,id_alumno</td>
</tr>
<tr class="even">
<td align="left">/modificarAlumnoGrupo</td>
<td align="left">id_alumno_grupos,id_alumno,id_grupo</td>
</tr>
<tr class="odd">
<td align="left">/borrarAlumnoGrupos</td>
<td align="left">id_alumno_grupos</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoGrupoPorIdAlumnoGrupo</td>
<td align="left">id_alumno_grupos</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoGrupoPorIdAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoGrupoPorIdGrupo</td>
<td align="left">id_grupo</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoGrupoPorIdAlumnoYIdGrupo</td>
<td align="left">id_alumno,id_grupo</td>
</tr>
</tbody>
</table>
