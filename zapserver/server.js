var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');



// INFO WATSON

var username = "3a166b983f"
var password = "ClQ"
var workspace_id = "811-22980c999edb"

// INFO WATSON



var cont= 0;

var version_date = ConversationV1.VERSION_DATE_2017_02_03

var conversation = new ConversationV1({ username, password, version_date });

app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'));

var context = null;
var usuarios= [];

var port = process.env.PORT || 5000

app.listen(port, function () {
  console.log("App started at: " + port);
});




app.post('/send', function (req, res) {
  var infouser={};
  infouser.faceID=req.body.senderID;

///### tratamtento de usuarios, armazenar  e consultar no banco usando STORAGE
    if(usuarios.length==0){
        console.log("eu estava vazio"); // Primeira vez que entra
        usuarios.push(infouser);
        context = null;
      }else{  console.log("eu ja tenho usuarios ")
                  var valid = false;
                  for (var i in usuarios) {
                   //   console.log(usuarios.faceID);
                     if (usuarios[i].faceID == infouser.faceID) {
                      console.log("atualizar conversa e counter");
                      console.log("chanel: "+usuarios[i].conversation_id)
                      console.log("contagem"+usuarios[i].dialog_turn_counter)
                      context = usuarios[i].context ;
                      valid= true;
                     }
                  }
                  if (!valid) {
                    console.log("vou adicionar um novo usuario");
                    usuarios.push(infouser);
                    context = null;
                  }
      }
///### tratamtento de usuarios, armazenar  e consultar no banco usando STORAGE

  var message = { input: { text: req.body.messageTex }, workspace_id, context }; // Montando pacote de envio para watson
  var input = { text: req.body.messageTex, workspace_id };


  function callback (err, response) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
          infouser.context= response.context;
          infouser.conversation_id= response.context.conversation_id;
          infouser.dialog_turn_counter= response.context.system.dialog_turn_counter;
            console.log(" Context !!!!!! AQUIII ")
             // console.log(infouser.context)

              var enviar = JSON.stringify(infouser.context, null, 2)
              console.log(enviar)
             console.log(" Context !!!!!! AQUIII ")
          var pacote={};
          pacote.text=response.output.text ;
          pacote.action = response.output.action;
          pacote.sender= infouser.faceID;
          cont++;



            if(response.output.action){
               console.log(pacote.action);  // Chamar tokenize para editar pacote a enviar 
               console.log("############# mandar CARD")
            }else{
              console.log("usar somente texto");
            }


          for (var i in usuarios) {
               if (usuarios[i].faceID == infouser.faceID) {
                console.log("atualizar usuario com a resposta final ");
                usuarios[i] = infouser;
               }
          }
      res.send(pacote);
    }// End sucess 
  }// End Callback

  conversation.message(message, callback);  // chamada do watson 
});





app.get('/testando', function(req, res) {
  console.log("teste");
  res.send({
        "messages": [
                   {"text": "enviando msg facebook"}
                  
              ]
      })
});