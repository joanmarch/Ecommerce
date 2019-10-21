const mongoose = require ('mongoose');
Schema = mongoose.Schema;
const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 360000 },
   
});

module.exports = mongoose.model('tokenReset', tokenSchema);