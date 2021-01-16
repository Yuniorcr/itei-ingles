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
  var storage = firebase.storage();




function observador(){
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          imprimir(user)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log(user)
        console.log(' existe')
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
  if (user.emailVerified) {
       mostrarUser()
  }else{
    console.log('errpr')
  }
}

function cerrarsession() {
  firebase.auth().signOut().then(function() {
      location.href = "index.html"
    }).catch(function(error) {
      console.log(error)
    });
}

function mostrarUser() {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  var n = document.getElementById('namew')
  var e = document.getElementById('emailw')
  if (user != null) {
    
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; 
    n.innerHTML = `<label for="disabledTextInput">Nombre</label>
    <input type="text" id="Nombre" class="form-control" value="${name}">`
    e.innerHTML =  `<label for="disabledTextInput">Email</label>
    <input type="text" id="Email" class="form-control" value="${email}">`
    if (photoUrl != null) {
      var image = document.querySelector('#perfilimg')
      image.src = photoUrl
      var image1 = document.querySelector('#imagebar')
      image1.src = photoUrl
    }
  }
}


function uploadImageUser() {
  var storageRef = firebase.storage().ref();
  // File or Blob named mountains.jpg
  var file = document.querySelector('#image').files[0]
  var namef = new Date() + '-'+file.name
  // Create the file metadata
  var metadata = {
    contentType: file.type
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child(namef).put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('success upload');
      updateProfileFotoURL(downloadURL)
    });
  });
}

function updateProfileFotoURL(url){
  var user = firebase.auth().currentUser;
  user.updateProfile({
    photoURL: url
  }).then(function() {
    console.log('success update')
  }).catch(function(error) {
    console.log('error update')
  });
}
function recargar() {
  setTimeout(location.reload(), 4000)
}