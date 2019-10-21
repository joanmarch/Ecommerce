const conversationModel = require('../model/conversationModel');




// const upload = multer({ storage: storage });

class conversationController{
    
    get(req, res){
        const {sender} = req.body;
        conversationModel.find({$or:[{sender:sender},{user:sender}]},(err,data)=>{
            if (err) throw new Error (err);
            else res.send(data);
        })
    }
 
}

module.exports = new conversationController();