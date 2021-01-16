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

var text = "hola como estas"
var hola = "hola como Estas "
console.log(text.trim().toLocaleLowerCase() == hola.trim().toLocaleLowerCase())