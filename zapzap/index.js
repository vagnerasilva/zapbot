'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
var watson = require('watson-developer-cloud');
const app = express()

const rp = require('request-promise');
app.use('/', express.static('public'));
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(app.get('port'), function() {
	console.log("logado olha o log !! aquiiiiiiiiiiiiii  TO ONLINEEEE  4040 ")
})

var conversation_id = "";

var cont= Date.now();
var limite = 0;
     var testando = 0;

app.post('/msgzapzap', function(req, res) {
	// console.log("teste");
	// console.log(testando)
	// console.log("teste")

	var action = req.body.event

	switch (action) {
        //### Entrada de users #### // 
      case 'ack':{
      	console.log("################# testando " + action)
        console.log(req.body)
      }

      break;
      case 'message':{
      	console.log("################# MENSAGEM " + action)
      	var type =  req.body.message.type;
		      	switch (type) {
		      		case 'user':{
				      	console.log("################# testando " + type)
				      	console.log(req.body)
				      }
				    break;
				    case 'chat':{
				      	console.log("################# testando " + type)
				      	
				      	   let senderID = req.body.contact.uid
				      	   let name = req.body.contact.name
				      	   let sender = req.body.contact.type
						   let messageTex = req.body.message.body.text

						   let timeOfMessage = Date.now()


						   console.log(senderID)
						   console.log(name)
						   console.log(messageTex)
						   console.log(sender)
						   
						   if(req.body.message.dir=='i'){
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
								servidorAsk(senderID, messageTex)
								console.log(req.body)
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")
						   console.log("################# Chamar Watson ###################")

						   }else{
							console.log("################# output Watson ###################")
						   console.log("################# output WatsonChamar Watson ###################")
						   console.log(req.body)
						   console.log("################# output WatsonChamar Watson ###################")
						   console.log("################# output WatsonChamar Watson ###################")
						   }
						   


				      }
				    break;
				    case 'image':{
				      	console.log("################# testando " + type)
				      	console.log(req.body)
				      }
				    break;
				    default:
				        {
				      console.log(" nenhhum type dentro do typo de msg")  
				      	console.log(req.body)	
				        }
		      	}	
      }

      break;
      
      default:
        {
      console.log(" nenhhuma action")  	
        }
    }



		//if(testando<=1){

		//	let senderID = req.body.contact.uid
		  //  let messageTex = req.body.message.body.text
		  //  let timeOfMessage = Date.now()
		   // testando +1 
		  //  servidorAsk(senderID, messageTex, timeOfMessage)
	//	}
			
	
		





	res.send("OK")
});







function servidorAsk(senderID, messageTex){

rp({
    method: 'POST',
    uri: 'https://serverwatson.herokuapp.com/send',
	headers: 
		   { 'Content-Type': 'application/json' },
    body: {
        senderID : senderID,
        messageTex : messageTex
    },
    json: true // Automatically stringifies the body to JSON
}).then(function (parsedBody) {
        console.log(parsedBody);
        // POST succeeded...
       var msg = parsedBody.text[0];
       var pacote1 = parsedBody.sender;
       console.log(msg);
       console.log(pacote1);
      // context = parsedBody.output.text;
       //senderID= parsedBody.username;
      //  console.log(context);

        cont++;
        console.log("#################contador")
       // console.log(cont)
	//	msgenviarnumero(senderID, msg)
	console.log("###############################  Mensagem ###############################")
	console.log("###############################  Mensagem ###############################")
	console.log("###############################  Mensagem ###############################")
	console.log("###############################  Mensagem ###############################")
	console.log("###############################  Mensagem ###############################")
	console.log("###############################  Mensagem ###############################")
	 
	    console.log(cont)
	    //if(limite<2){
	    	console.log(senderID)
	    	console.log(msg)
	    			msgenviarnumero(senderID, msg)
	    			   
			//}else{

				//console.log(" nao posso mandar msg")
				 //  console.log(msg)
	   // }

	console.log("###############################  Mensagem ###############################")
	console.log("###############################  Mensagem ###############################")
	console.log("###############################  Mensagem ###############################")
	console.log("###############################  Mensagem ###############################")

		   // somente Texto como resposta
		// callSendAPI(messageData)  chamada da entrega Card e texto ja personalizado
    })
    .catch(function (err) {
       // console.log(parsedBody);
       console.log(err);
        console.log("deu ruim")
        
        // POST failed...
    });


}  // Funcao que chama No Servidor 


function msgenviarnumero(senderID, msg) {
	//api de facebook
				var options = { method: 'POST',
				  url: 'https://www.waboxapp.com/api/send/chat',
				  qs: 
				   { token: '862bfd614314f46e6d3759bc82cb7f730',
				     uid: '55****388**',
				     to: senderID,
				     custom_uid: 'msg000'+cont,
				     text: msg  },
				  headers: 
				   { 'postman-token': '1147f2e5-1ff2-fc52-2d4c-a24cdfeac12c',
				     'cache-control': 'no-cache' } };

				request(options, function (error, response, body) {
				  if (error) throw new Error(error);

				  console.log(body);
				});
}







// ROUTES
app.get('/teste', function(req, res) {
	console.log("teste");

var msg = " testando envio"
var senderID = '5511993288708'
    msgenviarnumero(senderID, msg) 

	res.send({
 				"messages": [
   								 {"text": "enviando msg facebook"}
									
 							]
			})
});