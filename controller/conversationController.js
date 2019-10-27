const conversationModel = require('../model/conversationModel');




// const upload = multer({ storage: storage });

class conversationController{
    
    get(req, res){
        const {sender, user} = req.body;
      
        conversationModel.update({$and:[
            {$or:[{sender:sender},{user:sender}]},
            {$or:[{sender:user},{user:user}]}
        ]
            
         },{$set:{
            newData: false,
        }},(err,data)=>{
            if (err) console.log(err);
            else if (data){
                conversationModel.find({$or:[{sender:sender},{user:sender}]},(err,data)=>{
                    if (err) throw new Error (err);
                    else res.send(data);
                })
            } 
        })
      
    }
 
}

module.exports = new conversationController();