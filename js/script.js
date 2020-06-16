
function mostrar(id){
    if (document.getElementById(id).style.display == 'none'){
    document.getElementById(id).style.display = 'block';
    }else{
    document.getElementById(id).style.display = 'none';
    }
}

var apikey = "Hu5lI22FRzkqzJQVRbAF3GYpsB9VPt4tOkChM3jwb2NiUh8n68UzhTAQGCRo";
var channel = 1;
var url = "wss://connect.websocket.in/v3/"+channel+"?apiKey="+apikey;
var nickName;

var socket;   //objeto que vai conter a minha conexão

function conectar(){

  nickName = document.getElementById("nick").value;
  document.getElementById("btnConectar").disabled = true;
  socket = new WebSocket(url);
  socket.onopen = conectou;
  socket.onmessage = recebeu;
  
}

function conectou(){
  socket.onmessage = recebeu;
  document.getElementById("btnEnviar").disabled = false;

}

function recebeu(msg){

  var chat = document.getElementById("chat");
  var obj = JSON.parse(msg.data);
  chat.innerHTML += "<br>" + obj.nick + " diz: " + obj.message;

}

function enviar(){

  var inMsg = document.getElementById("msg");
  var obj = {
    message : inMsg.value,
    nick : nickName
  }
  socket.onmessage = recebeu;
  socket.send(JSON.stringify(obj));
  inMsg.value = "";

}