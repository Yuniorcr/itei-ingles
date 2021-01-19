
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

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var prodId = parseInt(getParameterByName('niv'))

if (prodId == 1 || prodId == 2 || prodId ==3) {
  // leer documentos
  var card = document.getElementById('card')
  db.collection("niveles").where("nivel", "==", prodId).onSnapshot((querySnapshot) => {
    card.innerHTML = ''
    querySnapshot.forEach((doc) => {
      card.innerHTML += `
      <div  class="col-md-4 ">
        <div class="card" style="width: 18rem;" id="card">
          <img class="card-img-top" src="${doc.data().foto}" alt="Card image cap">
          <div class="card-body text-center">
            <h5 class="card-title">${doc.data().grupo}</h5>
            <a href="nivel_use.html?group=${doc.data().grupo}&niv=${prodId}&id=1" type="submit" class="btn btn-success">Aprender</a>
          </div>
        </div>
      </div>
        `
    });
  });
}else{
  location.href = "main.html"
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