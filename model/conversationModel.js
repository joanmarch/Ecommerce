const mongoose = require ('mongoose');
Schema = mongoose.Schema;

const conversationSchema = new mongoose.Schema({
    image: { type:String, required: true, ref: 'products' },
    user: { type: String, required: true, ref: 'users' },
    message: { type: String, required: true, ref: 'messages' },
    sender : {type : String, required:true },
    newData : {type : Boolean, required:true },
  
},
{
    timestamps: true
}
   
);


module.exports = mongoose.model('conversation', conversationSchema);