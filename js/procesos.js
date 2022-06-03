///////////////////funcion para la ruta de buscar todos
let usuarios = [];
let usuario;
function getUsuarios()
{
   axios.get('http://localhost:3000/getUsuarios')
     .then(function (response) {
      console.log(response.data)
      usuarios = response.data
      document.getElementById("tableUserBody").innerHTML = response.data.map((item)=>
      ` <tr>
          <td>${item.idusuario}</td>
          <td>${item.nombre}</td>         
          <td>${item.apellido}</td>
          <td>${item.user}</td>
          <td>${item.pass}</td>         
          <td>${item.idperfil}</td>
          <td> <button type="button" class="btn btn-success" onclick="add_Editar(${item.idusuario})">Update</button></td>          
          <td> <button type="button" class="btn btn-danger"  onclick="delete_Usuarios(${item.idusuario})">Delete</button></td>
        <tr>
      `);    
     
     })
     .catch(function (error) {
      console.log(error);
     });
}

function getSql2()
{
   axios.get('http://localhost:3000/getSql2')
     .then(function (response) {
      console.log(response.data)
      perfiles = response.data
      document.getElementById("tablePerfBody").innerHTML = response.data.map((item)=>
      ` <tr>
          <td>${item.idperfil}</td>
          <td>${item.nombre}</td>
          <td>${item.estado}</td>
          
        <tr>
      `);     
     })
     .catch(function (error) {
      console.log(error);
     });
}

function getSql1()
{
   axios.get('http://localhost:3000/getSql1')
     .then(function (response) {
      console.log(response.data)
      usuarios = response.data
      document.getElementById("tableUsuarioBody").innerHTML = response.data.map((item)=>
      ` <tr>
          <td>${item.idusuario}</td>
          <td>${item.nombre}</td>
          <td>${item.apellido}</td>
          <td>${item.user}</td>
          <td>${item.pass}</td>
          <td>${item.idperfil}</td>
          <tr>
      `);    
     
     })
     .catch(function (error) {
      console.log(error);
     });
}
////////////////////////// Función Para enlistar Opciones de tipo de Perfiles en formulario
function getPerfil()
{
   axios.get('http://localhost:3000/getPerfil')
     .then(function (response) {
      console.log(response.data)
      document.getElementById("inputidperfil").innerHTML = response.data.map((item)=>
      `<option value=${item.idperfil}> ${item.nombre}</option>`);     
     })
     .catch(function (error) {
      console.log(error);
     });
}

///////////////////funcion para la ruta para insertar datos en la tabla Usuarios
function add_Usuarios()
{
  inputnombre = document.getElementById("inputnombre").value;
  inputapellido = document.getElementById("inputapellido").value;
  inputuser = document.getElementById("inputuser").value;
  inputpass = document.getElementById("inputpass").value;
  inputidperfil = document.getElementById("inputidperfil").value;
  const nuevousuario={
    nombre: inputnombre,
    apellido: inputapellido,
    user: inputuser,
    pass: inputpass,
    idperfil: inputidperfil
}
document.getElementById("formu").reset()
axios ({
    method: 'POST',
    url: 'http://localhost:3000/add_Usuarios',
    data: nuevousuario,
}).then(res => console.log(res), alert("Registro Exitoso"))
.catch(err => console.log('Error: ', err))
}

function getLogin()
{
  inputuser = document.getElementById("inputuser").value;
  inputpass = document.getElementById("inputpass").value;
    const nuevodocumento={
    user: inputuser,
    pass: inputpass,   
}
document.getElementById("formulario").reset()
axios ({
    method: 'POST',
    url: 'http://localhost:3000/getLogin',
    data: nuevodocumento,
}).then(res => {
  console.info(res);
  if(res.data[0]) {
    window.location.href = 'http://localhost/Taller3/html/Usuarios.html'
  }
})
.catch(err => console.log('Error: ', err), alert('Error login, reintente'))
}

///////////////////funcion para editar contenido de la tabla 
function add_Editar(id)
{   
   const user = usuarios.find(u => u.idusuario == id)
   usuario = user;
   document.getElementById('inputnombre').value = user.nombre
   document.getElementById('inputapellido').value = user.apellido
   document.getElementById('inputuser').value = user.user
   document.getElementById('inputpass').value = user.pass
   document.getElementById('inputidperfil').value = user.idperfil
   var btn = document.getElementById("Button");
   btn.disabled = false;
   var btn = document.getElementById("Button1");
   btn.disabled = true;
}

///////////////////funcion para actualizar Tabla Usuarios
function update_Usuarios()
{
  inputnombre = document.getElementById("inputnombre").value;
  inputapellido = document.getElementById("inputapellido").value;
  inputuser = document.getElementById("inputuser").value;
  inputpass = document.getElementById("inputpass").value;
  inputidperfil = document.getElementById("inputidperfil").value; 
  const nuevousuario={
    nombre: inputnombre,
    apellido: inputapellido,
    user: inputuser,
    pass: inputpass,
    idperfil: inputidperfil
}
const id = usuario.idusuario;
document.getElementById("formu").reset()
axios ({
    method: 'PUT',
    url: 'http://localhost:3000/update_Usuarios/'+id,
    data: nuevousuario,
}).then(res => console.log(res), alert("Usuario actualizado."))
.catch(err => console.log('Error: ', err))
}

///////////////////funcion para eliminar
function delete_Usuarios(id)
{

    axios.delete('http://localhost:3000/delete_Usuarios/'+id)
    .then(res => {
        console.log(res.data)
       
            alert("Registro Eliminado")   

    })
    .catch(err => console.log('Error: ', err))
}

getPerfil ()


