
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



function registrar() {
    var email = document.getElementById('emailr').value;
    var password = document.getElementById('passr').value;
    
    var content = document.getElementById('error')
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            verificarUser()
            updatep()
            content.innerHTML = `
            <div class="alert alert-success" role="alert">
            Se le ha enviado un correo para verificar
            </div>`
            console.log('success')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            
            content.innerHTML = `
            <div class="alert alert-danger" role="alert">
            ${errorCode}<br>
            ${errorMessage}
            </div>`
        });
}

function validar() {
    var email2 = document.getElementById('email').value;
    var password2 = document.getElementById('pass').value;
    firebase.auth().signInWithEmailAndPassword(email2, password2)
    .then((user) => {
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        var content1 = document.getElementById('error1')
        content1.innerHTML = `
            <div class="alert alert-danger" role="alert">
            ${errorCode}<br>${errorMessage}
            </div>`

    });
}
function observador(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('existe')
            imprimir(user)
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
}

observador()

function imprimir(user) {
    var user = user
    if (user.emailVerified) {
        location.href = "main.html"
    }else{
        
        var content1 = document.getElementById('error1')
        content1.innerHTML = `
            <div class="alert alert-danger" role="alert">
            verifique su Email
            </div>`
        setTimeout(cerrarsession, 3000)
    }
}



function verificarUser() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
    // Email sent.
    }).catch(function(error) {
    // An error happened.
    });
}
function cerrarsession() {
    firebase.auth().signOut().then(function() {
        location.href="index.html"
      }).catch(function(error) {
        console.log(error)
      });
}

function SignGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        console.log('success')
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}

function SignFacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function updatep(){
    var name = document.getElementById('namer').value
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('success update')
    }).catch(function(error) {
      console.log('error update')
    });
}

function recuperar() {
  var email = document.getElementById('emailre').value
  var auth = firebase.auth();
  var emailAddress = email;

  auth.sendPasswordResetEmail(emailAddress).then(function() {
    var content = document.getElementById('error2')
    content.innerHTML = `
        <div class="alert alert-success" role="alert">
        Se ha enviado un email de recuperacion a su correo
        </div>`
      document.getElementById('emailre').value = ''
  }).catch(function(error) {
    // An error happened.
  });
}