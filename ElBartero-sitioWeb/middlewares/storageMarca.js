
const multer = require('multer');


const storageMarcas = multer.diskStorage({

    destination: (req, file , cb)=>{
        cb(null,'./public/uploadImages/imagenesmercaderiasmarcas')
    },
    filename: (req , file , cb )=>{
    
        cb(null, Date.now()+ '-'+ file.originalname);
    }
});


module.exports=storageMarcas;