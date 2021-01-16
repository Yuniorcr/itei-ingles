
var firebaseConfig = {
    apiKey: "AIzaSyByTOLb93pb2eJXgek10tXF5qZcLS4ooWU",
    authDomain: "crud-271ed.firebaseapp.com",
    projectId: "crud-271ed",
    storageBucket: "crud-271ed.appspot.com",
    messagingSenderId: "43430674089",
    appId: "1:43430674089:web:9cd7d159a74fb49e95f3b8",
    measurementId: "G-SG6MHTG6G0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



function observador(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            imprimir(user)
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          // ...
        } else {
            console.log('no existe')
            location.href="index.html"
          // User is signed out
          // ...
        }
      });
}

observador()

function imprimir(user) {
    var user = user
    var content = document.getElementById('container')
    if (user.emailVerified) {
        mostrarUser() 
        content.innerHTML = `
        <h1>welcome ${user.displayName}</h1>
        <button onclick="cerrarsession()">cerrar session</button>`
    }
}
function userinfo() {
    location.href= "userinf.html"
}
function cerrarsession() {
    firebase.auth().signOut().then(function() {
        location.href = "index.html"
      }).catch(function(error) {
        console.log(error)
      });
}

//initialize
var db = firebase.firestore();

function save(user) {
    var names = document.getElementById('nombres').value
    var fechas = document.getElementById('fechas').value
    var apels = document.getElementById('apellidos').value

    var user = user
    
    //create documents
    db.collection("users").add({
        email: firebase.auth().currentUser.email,
        nombre: names,
        apellido: apels,
        fecha: fechas
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombres').value = ''
        document.getElementById('fechas').value = ''
        document.getElementById('apellidos').value = ''
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// leer documentos
var tabla = document.getElementById('table')
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = ''
    querySnapshot.forEach((doc) => {
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().email}</td>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().fecha}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().fecha}')">editar</button></td>
        </tr>`
    });
});

// eliminar documento
function eliminar(id) {
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
// actualizar documentos

function editar(id, nombre, apellido, fecha) {

    document.getElementById('nombres').value = nombre
    document.getElementById('fechas').value = fecha
    document.getElementById('apellidos').value = apellido
    
    var boton = document.getElementById('boton')
    boton.innerHTML=`editar`

    boton.onclick = function () {
        var nombre = document.getElementById('nombres').value 
        var fecha = document.getElementById('fechas').value 
        var apellido = document.getElementById('apellidos').value 

        var washingtonRef = db.collection("users").doc(id);

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            nombre: nombre,
            apellido: apellido,
            fecha: fecha
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'save'
            document.getElementById('nombres').value = ''
            document.getElementById('fechas').value = ''
            document.getElementById('apellidos').value = ''
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        }); 
    }
    
}


function mostrarUser() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      if (photoUrl != null) {
        var image = document.querySelector('#imgbar')
        image.src = photoUrl
      }
    }
  }
