const mongoose = require ('mongoose');
Schema = mongoose.Schema;
const productsSchema = new Schema( {
    image: {type : String, required: true},
    name: {type:String, required: true, unique:true},
    price: {type:Number, required: true},
    description: {type:String, required: true},
    user : {type:String, require:true},
    currency : {type:String, require:true},
    category: {type:String, require:true}
});

module.exports = mongoose.model('products', productsSchema);
