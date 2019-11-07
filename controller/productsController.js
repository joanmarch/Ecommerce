const productsModel = require('../model/productsModel');




// const upload = multer({ storage: storage });

class productsController{
    add(req, res){
              
        const { name, price, user, description, category, curreny} = req.body;
      
        var newProduct = {
            image: "http://142.93.109.226/server/" + req.file.path,
            name,
            price,
            description,
            user,
            category,
            curreny

        } 
       

        productsModel.create(newProduct,(err, data)=>{
            if (err) {
                throw new Error(err);
            }else{
            res.send(data) ;
            }
        })
    }
    get(req, res){
        productsModel.find({},(err,data)=>{
            if (err) throw new Error (err);
            else res.send(data);
        })
    }
 
}

module.exports = new productsController();
