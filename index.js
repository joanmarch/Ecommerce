var express = require ('express');
var cors = require('cors')
var app = express ();
const port = process.env.PORT || 3001;
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


//SOCKET IO EVENTS...
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    // path: '/test',
//   serveClient: false,
  // below are engine.IO options
  pingInterval: 6000,
  pingTimeout: 3000,
//   cookie: false
});
let serverNames = [];
server.listen(8000, () => {
    console.log('connected to port 8000!')
});
// controller = require ('./controller/messageController');
const messageModel = require('./model/messageModel');
const conversationModel = require('./model/conversationModel');
const productModel = require('./model/productsModel');




io.on('connection', socket => { 

//get a new message from a user after a handle Enter Key 
    socket.on('INPUT_MESSAGE',  data =>{   
        let userSocket ="";  

        const { message, user, sender,} = data;
        
        var newMessage = {
            message : {text:message},
            user,
            sender,   
        } 
// Check if the conversation between sender and user exists
            conversationModel.findOne({
                $and:[
                    {$or:[{sender:sender},{user:sender}]},
                    {$or:[{sender:user},{user:user}]}
                ]
                },(err, conversation)=>{
// If conversation does not exist, a new conversation is created
                if (!conversation){
                    let image
                    productModel.findOne({user:user},(err, data)=>{
                        
                        image = data.image;
                    
                    newConversation={
                        image,
                        user,
                        message,
                        sender,
                        newData : true
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
// If conversation already exist, last message is uptades and new message trigger is set to true
                }else{
                   
                    conversationModel.update({
                        $and:[
                            {$or:[{sender:sender},{user:sender}]},
                            {$or:[{sender:user},{user:user}]}
                        ]
                        },{$set:{
                        message: message,
                        newData: true,
                    }},(err,data)=>{
                        if (err) console.log(err);
                        else if (data) console.log("------Last message updated----------" + message )
                    })
                }
            })
  // New message is added to data base and then emit an event to the corrrespoding reciever (user)
         response =  messageModel.create(newMessage,(err, data)=>{
            if (err) {
                throw new Error(err);
            }else{
                for (let i = 0; i < serverNames.length; i++){
                    console.log("asasasasasasa array" + serverNames[i].name)       
                    console.log("-*-*-*-*-*-* user" + user)  
                    if (serverNames[i].name === user){
                        console.log("bbbb" + serverNames[i].socketId)
                        userSocket=serverNames[i].socketId;
                        io.sockets.connected[userSocket].emit("OUTPUT_MESSAGE_toUSER", data); 
                    }      
                }
                console.log("----- Message added to database---------");        
            }
        })      
    })
   
  // add the newest client to the list of active clients
  socket.on('SEND_NAME_TO_SERVER', name => {
    serverNames = [...serverNames, { socketId: socket.id, name }];
  
    serverNames.map(name => {
        console.log("----- Client connect from connect function NAME:" + name.name);
        console.log("----- Client connect from connect function SOCKET:" + name.socketId);
    })
  });

  // this is to make sure that when a client disconnects
  // the client's name will be removed from our server's list of names
  // then broadcast that to everybody connected so their list will be updated
  socket.on('disconnect', () => {
   
    // serverNames = serverNames.filter(data => data.socketId !== socket.id)
    serverNames = serverNames.filter((data)=>{
        if (data.socketId !== socket.id){
        console.log("----- Client disconnect:" + data.name);   
        return data.socketId !== socket.id
        }
        serverNames.map(name => {
            console.log("----- Client connect from disconnect function:" + name.name);
        })
    });
    // socket.broadcast.emit('SEND_NAMES_TO_CLIENTS', names)
    // socket.emit('SEND_NAMES_TO_CLIENTS', names);
  });
});






