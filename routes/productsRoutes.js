const express = require ('express');
router = express.Router();
controller = require ('../controller/productsController');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, 'uploads/');
    },
    filename: function(req, file, cd){
        cd(null, file.originalname)
    }
});

const fileFilter = (req, file, cd)=>{
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || true){
        cd(null,true);
    }else{
        cd(new Error('just jpeg and png files are accepted'), false);
    }
};

const upload = multer({storage:storage, limits:{fileSize:1024*1024*5}, fileFilter:fileFilter
});

router.get('/get',controller.get);
router.post('/add',upload.single('image'),controller.add);
// router.post('/add',controller.add);





module.exports =router;
