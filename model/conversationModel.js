const mongoose = require ('mongoose');
Schema = mongoose.Schema;

const conversationSchema = new mongoose.Schema({
    image: { type:String, required: true, ref: 'products' },
    user: { type: String, required: true, ref: 'user' },
    message: { type: String, required: true, ref: 'message' },
    sender : {type : String, required:true }
}
   
);


module.exports = mongoose.model('conversation', conversationSchema);