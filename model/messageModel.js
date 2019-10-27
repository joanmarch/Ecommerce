const mongoose = require ('mongoose');
Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    message:{
        text: { type:String, required:true }
        // you can add any other properties to the message here.
        // for example, the message can be an image ! so you need to tweak this a little
    },
    // if you want to make a group chat, you can have more than 2 users in this array
    // users:[{
        user: { type:String, ref:'users', required:true },
    // }],
    sender: { type:String, ref:'users',  required:true },
    read: { type:Date }
},
{
    timestamps: true
}
   
);

module.exports = mongoose.model('messages', messageSchema);