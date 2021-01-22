
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
			location.href="/"
		  // User is signed out
		  // ...
		}
	  });
  }
  
  observador()
  
  function imprimir(user) {
	var user = user
	var content = document.getElementById('container')
	mostrarUser() 
  }
  function userinfo() {
	location.href= "userinf.html"
  }
  function cerrarsession() {
	firebase.auth().signOut().then(function() {
		location.href = "/"
	  }).catch(function(error) {
		console.log(error)
	  });
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

document.getElementById('hablar').addEventListener("click",()=>{
    decir(document.getElementById("texto").value)
})

function decir(texto) {
    speaks = [
        {
          "name": "Alex",
          "lang": "en-US"
        },
        {
          "name": "Fiona",
          "lang": "en"
        },
        {
          "name": "Fred",
          "lang": "en-US"
        },
        {
          "name": "Samantha",
          "lang": "en-US"
        },
        {
          "name": "Victoria",
          "lang": "en-US"
        }
      ];
      
      
      const msg = new SpeechSynthesisUtterance();
      msg.volume = 1; // 0 to 1
      msg.rate = 1; // 0.1 to 10
      msg.pitch = 1.5; // 0 to 2
      msg.text  = texto;
      
      
      const voice = speaks[3]; 
      msg.voiceURI = voice.name;
      msg.lang = voice.lang;
      
      
      speechSynthesis.speak(msg);

}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function cerrarWindow() {
  var prodId = parseInt(getParameterByName('niv'))
  if (prodId === 1 || prodId === 2 || prodId ===3) {
    if (prodId === 1) {
      location.href = "nivel.html?niv=1"
    }else if (prodId === 2) {
      location.href = "nivel.html?niv=2"
    }else{
      location.href = "nivel.html?niv=3"
    }
  }else{
    location.href = "main.html"
  }
}





// sortable
const tareas = document.getElementById('tareas');
const tareasCompletadas = document.getElementById('tareasCompletadas');

const listaTareas = Sortable.create(tareas, {
	group: {
		name: "lista-tareas",
		pull: true,
		put: true
	},
	animation: 150,
	easing: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
	filter: ".titulo",
	chosenClass: "active",
	dataIdAttr: "data-identificador",
	store: {
		set: function(sortable){
			const orden = sortable.toArray();
			localStorage.setItem('lista-tareas', orden.join(''));
		},

		get: function(){
			const orden = localStorage.getItem('lista-tareas');
			return orden ? orden.split('|') : [];
		}
		
	},
});

const listaTareasCompletadas = Sortable.create(tareasCompletadas, {
	group: {
		name: "lista-tareas",
		pull: true,
		put: true
	},
	animation: 150,
	easing: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
	// handle: ".fas",
	filter: ".titulo",
	ghostClass: "active",
	chosenClass: "active",
	//dragClass: "invisible"
	dataIdAttr: "data-identificador",
	store: {
		set: function(sortable){
			const orden = sortable.toArray();
			localStorage.setItem('lista-tareasCompletadas', orden.join(''));
			const ordenes =[]
			for (let index = 0; index < orden.length; index++) {
				ordenes.push(index.toString())
			}
			let a1 = orden.map(letra => letra.toLowerCase())
			let a2 = ordenes.map(letra => letra.toLowerCase())
			let str1 = a1.toString()
			let str2 = a2.toString()
			const btnToggle = document.getElementById('toggle');
			const btnToggle2 = document.getElementById('togle2');
			const result = document.getElementById('h1')
			const tamanio = document.querySelector('#texto')
			const siguiente = document.getElementById('siguiente')
			const t = parseInt(tamanio.name)
			if (orden.length === t) {
				btnToggle.addEventListener('click', () => {
					if (str1 === str2) {
						result.innerHTML =`<div class="alert alert-success" role="alert">
						Correcto, Genial!!
						</div>`
						siguiente.innerHTML=""
						siguiente.innerHTML=`<div class="d-grid gap-2 col-6 mx-auto">
						<a class="btn btn-success" href="nivel_use.html?group=${grupo}&niv=${nivel}&id=${id+1}">Siguiente</a>
					  </div>`
					  btnToggle2.innerHTML =""
					}else{
						result.innerHTML =`<div class="alert alert-danger" role="alert">
						Verifica tu respuesta
						</div>`
					}
				});
			}else{
				result.innerHTML =""
			}
				
		},

		get: function(){
			const orden = localStorage.getItem('lista-tareasCompletadas');
			return orden ? orden.split('') : [];
		}
	},
});




function mostrarpalabras(pa) {
	//texto a array
	let arreglo = pa.split(" ");
	var arrayletras = shuffle(arreglo)
	var content = document.getElementById("tareas")
	var tamanio = document.querySelector('#texto')
	tamanio.name = arreglo.length
	arrayletras.forEach(element =>{
		let arregloo = pa.split(" ");
		content.innerHTML +=
		`
		<div class="btn-group m-2" role="group" aria-label="First group"  data-identificador=${arregloo.indexOf(element)}>
			<button type="button" class="btn btn-success">${element}</button>
		</div>
		`
		
	});
}


//initialize
var db = firebase.firestore();

// leer documentos
var nivel = parseInt(getParameterByName('niv'))
var grupo = getParameterByName('group')
var id = parseInt(getParameterByName('id'))
var image = document.querySelector('#texto')
db.collection("palabras").where("nivel", "==", nivel).where("grupo", "==", grupo).where("id", "==", id).limit(1).onSnapshot((querySnapshot) => {
	image.value =""
    querySnapshot.forEach((doc) => {
		console.log(doc.data().type)
		if (doc.data().type == "complete") {
			image.value = doc.data().palEn
			mostrarpalabras(doc.data().palEs)
		}else if(doc.data().type == "analizar"){
			var principal = document.getElementById("principal")
			principal.innerHTML=""
			principal.innerHTML=`
			
			<div class="text-center my-5">
			<h6>Escribe "${doc.data().palEs}" en inglés</h6>
				<img src="${doc.data().foto}" class="rounded" >
			</div>
			<div class="d-grid gap-2 col-5 mx-auto my-5" >
				<input type="email" class="form-control" id="floatingInput" placeholder="escribe aqui">
			</div>
			<div id="content">
            	
			</div>
			<div class="d-grid col-2 mx-auto my-5" id="btns" >
            	<button class="btn btn-success" type="button" id="toggle">Comprobar</button>
			</div>`
			
			const btnToggle = document.getElementById('toggle');  
			const result = document.getElementById('content');
			const siguiente = document.getElementById('btns')
			btnToggle.addEventListener('click', () => {
			const textinput = document.getElementById('floatingInput').value
				if ( textinput.trim().toLowerCase()=== doc.data().palEn.toLowerCase()) {
					console.log('cprr')
					result.innerHTML =`<div class="alert alert-success" role="alert">
						Correcto, Genial!! 🎉🎉
						</div>`
					siguiente.innerHTML=""
					siguiente.innerHTML=`<div class="d-grid gap-2 col-6 mx-auto">
						<a class="btn btn-success" href="nivel_use.html?group=${grupo}&niv=${nivel}&id=${id+1}">Siguiente</a>
					  </div>`
				}else{
					result.innerHTML =`<div class="alert alert-danger" role="alert">
						Sigue Intentando 😉😉
						</div>`
				}
			})
		}else if(doc.data().type == ""){
			
		}else if(doc.data().type == ""){
			
		}
		
    });
});

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// Mientras queden elementos a mezclar...
	while (0 !== currentIndex) {
  
	  // Seleccionar un elemento sin mezclar...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // E intercambiarlo con el elemento actual
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }

  function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

const progress = document.getElementById('progress')
progress.innerHTML = `<div class="progress-bar bg-success" role="progressbar" style="width:${(id/10)*100}%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>`


if (id <1 || id >11) {
	location.href = "main.html"	
}else if (id ===11) {
	var principal = document.getElementById("principal")
	principal.innerHTML=""
	principal.innerHTML=`<div class="alert alert-success rows-4 my-5" role="alert">
	<span class="align-middle">Felicitaciones terminaste</span>
	
  </div>
  <div class="d-grid gap-2 col-2 mx-auto">
  <button class="btn btn-success" onclick="cerrarWindow()" type="button">Aprender Mas...</button>
</div>`
}