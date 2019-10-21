const messageModel = require('../model/messageModel');




// const upload = multer({ storage: storage });

class messageController{
   async add(data){
              
        const { message, user, sender,} = data;
      
        var newMessage = {
            message : {text:message},
            user,
            sender,
        } 
        
       return  response = await messageModel.create(newMessage,(err, data)=>{
            if (err) {
                throw new Error(err);
            }else{
                let {sender, message, user, createdAt, updatedAt} = data; 
                 
                           
            }
        })

    }
    get(req, res){
        
        const {sender} = req.body;
        
        // messageModel.find({$or:[{sender:sender},{user:sender}]},(err, data)=>{
         messageModel.find({$or:[{sender:sender},{user:sender}]}, {$or:[{sender:user},{user:user}]},(err, data)=>{ 
            
            if (err) throw new Error (err);
            else res.send(data);
        }).limit(20).sort({updatedAt: -1})
      
    }
   
}

module.exports = new messageController();