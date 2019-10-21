var express = require ('express');
var cors = require('cors')
var app = express ();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var port = 3001;
bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose = require ('mongoose');
app.use(cors());
app.use('/uploads', express.static('uploads'));



userRoutes = require ('./routes/userRoutes');
productsRoutes = require ('./routes/productsRoutes');
purchaseRoutes = require ('./routes/purchaseRoutes');
messageRoutes = require ('./routes/messageRoutes');
conversationRoutes = require ('./routes/conversationRoutes');

// const stripe = require('stripe')(stripeSecretKey)


mongoose.connect('mongodb://127.0.0.1/ecommerce_db',()=>{
    console.log('Mongo is connected')
});

app.listen(port,()=>{
    console.log('server running on port '+ port)
});


app.use('/user', userRoutes);
app.use('/products', productsRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/messages', messageRoutes);
app.use('/conversations', conversationRoutes);

// app.use('/purchase', function(req, res){
//     //calcular el total a carregar al client
//     stripe.charges.create({
//         amount : total, //en centims d'euro!!
//         source : req.body.stripeTokenId,
//         currency: 'usd',

//     }).then(function(){

//     }).catch(function(){
//         res.status(500).end()
//     })

// })
controller = require ('./controller/messageController');
const messageModel = require('./model/messageModel');
const conversationModel = require('./model/conversationModel');
const productModel = require('./model/productsModel');
server.listen(8000, () => console.log('connected to port 8000!'));

let pot = 0;
let names = [];
let serverNames = [];
io.on('connection', socket => {


    socket.on('GET_MESSAGES', user =>{
      let res =  controller.get(user)
      socket.broadcast.emit("SEND_MESSAGES", res);
    })

    socket.on('CHANGE_CONVERSATION', user =>{
        socket.emit("UPDATE_CONVERSATION", user);
      })

    socket.on('INPUT_MESSAGE',  data =>{   
        let userSocket ="";  

        const { message, user, sender,} = data;
        
        var newMessage = {
            message : {text:message},
            user,
            sender,   
        } 
        // {$or:[{sender:sender},{user:sender}]}

        
            conversationModel.findOne({$or:[{sender:sender},{user:sender}]}, {$or:[{sender:user},{user:user}]},(err, conversation)=>{
                if (!conversation){
                    let image
                    productModel.findOne({user:user},(err, data)=>{
                        
                        image = data.image;
                    
                    newConversation={
                        image,
                        user,
                        message,
                        sender
                    }
                    
                    conversationModel.create(newConversation,(err, data)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Conversation added to DB")
                            socket.emit("OUTPUT_MESSAGE_toUSER", data.user); 
                            
                        }
                    })
                })

                }else{
                    // console.log("----" + message)
                    // conversation.updateOne({},{message:message});
                    
                    conversationModel.update({ sender: sender, user: user},{$set:{
                        message: message,
                    }},(err,data)=>{
                        if (err) console.log(err);
                        else if (data) console.log("Last message updated" + data )
                    })
                    conversationModel.update({ sender: user, user: sender},{$set:{
                        message: message,
                    }},(err,data)=>{
                        if (err) console.log(err);
                        else if (data) console.log("Last message updated" + data )
                    })
                    // conversationModel.update({$or:[{sender:sender},{user:sender}]}, {$or:[{sender:user},{user:user}]},{$set:{
                    //     message: message,
                    // }},(err,data)=>{
                    //     if (err) console.log(err);
                    //     else if (data) console.log("Last message updated" + data )
                    // })

                }
            })
     
         response =  messageModel.create(newMessage,(err, data)=>{
            if (err) {
                throw new Error(err);
            }else{
                for (let i = 0; i < serverNames.length; i++){
                    
                    if (serverNames[i].name === user){
                        
                        
                        userSocket=serverNames[i].socketId;
                        io.sockets.connected[userSocket].emit("OUTPUT_MESSAGE_toUSER", data); 
                    }      
                }
                console.log("----- Message added to database");        
            }
        })      
    })
   
  // below we listen if our pot is updated..
  // then emit an event to all connected sockets about the update
  socket.on('UPDATE_POT', state => {
    pot = state.pot;
    socket.broadcast.emit('UPDATED_POT', state);
  });

  
  // get the current pot's value and emit it to clients
  socket.on('GET_CURRENT_POT', () => socket.emit('CURRENT_POT', pot));

  // add the newest client to the list of active clients
  // then broadcast that to all connected clienhts 
  socket.on('SEND_NAME_TO_SERVER', name => {
    serverNames = [...serverNames, { socketId: socket.id, name }];
    // serverNames = {[name]:socketId} 
    names = [...names, name];
    socket.broadcast.emit('SEND_NAMES_TO_CLIENTS', names);
    socket.emit('SEND_NAMES_TO_CLIENTS', names);
  });

  // broadcast to everyone if somebody pitched in
  socket.on('SOMEONE_PITCHED_IN', name => {
    socket.broadcast.emit('GUESS_WHO_PITCHED_IN', name);
  });

  // broadcast to everyone if somebody got one
  socket.on('SOMEONE_GOT_ONE', name => {
    socket.broadcast.emit('GUESS_WHO_GOT_ONE', name);
  });


  // this is to make sure that when a client disconnects
  // the client's name will be removed from our server's list of names
  // then broadcast that to everybody connected so their list will be updated
  socket.on('disconnect', () => {
    serverNames = serverNames.filter(data => data.socketId !== socket.id);
    names = serverNames.map(data => data.name);
    socket.broadcast.emit('SEND_NAMES_TO_CLIENTS', names);
    socket.emit('SEND_NAMES_TO_CLIENTS', names);
  });
});






