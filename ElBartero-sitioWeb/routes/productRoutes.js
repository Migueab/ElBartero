
const express = require ('express');

const router = express.Router();
const multer = require('multer');

const storage=require('../middlewares/storage');
const storageMarca=require('../middlewares/storageMarca');

const productController = require ('../controllers/productController.js');

const validationsMarcaMiddlewares = require ('../middlewares/validationsMarca.js');
const validationsMiddlewares= require('../middlewares/validations.js')



const upload = multer({ storage: storage });
const uploadMarca = multer({ storage : storageMarca});


// @get /mercadocomercial
router.get ( '/mercadocomercial' , productController.getMercadoComercial );

//@get /mercadocomercialmercaderias
router.get ( '/mercadocomercialmercaderias' , productController.getMercadoComercialMercaderias );

// @post /mercadocomercial/mercadocomercialmercadrias 
router.post ('/mercadocomercialmercaderias', [uploadMarca.single('img'), validationsMarcaMiddlewares.validateCreateMercaderiaMarca] , productController.postMercadoComercialMercaderias);



/* lAs mercaderias son creadas desde la cuenta de marcas */

//@get /useracountmarcas/crearmercaderiamarcas
router.get ( '/crearmercaderiamarcas' , productController.getCrearMercaderiaMarcas );

// @get /mercadocomercial/mercadocomercialmercaderias/mercaderiaenexhibicion
router.get ( '/:id/mercaderiaenexhibiciondetalle' , productController.getMercaderiaExhibidaDetalle );

// @get /mercadocomercial/mercadocomercialmercaderias/mercaderiaenexhibicion
router.delete ( '/mercaderiaenexhibiciondetalle/:id/delete' , productController.deleteMercaderiaExhibidaDetalle );

// @get /mercadocomercial/mercadocomercialmercaderias/mercaderiaenexhibiciondetalle
router.get ( '/mercaderiaenexhibiciondetalle/:id/update' , productController.getUpdateMercaderiaExhibidaDetalle );

// @put /mercadocomercial/mercadocomercialmercaderias/mercaderiaenexhibiciondetalle
router.put ( '/mercaderiaenexhibiciondetalle/:id/update',[uploadMarca.single('img')] , productController.updateMercaderiaExhibidaDetalle );






// @get /mercadousuarios => Buscador de mercaderias principal
router.get ( '/mercadousuarios' , productController.getMercadoUsuarios );

//@get /mercadousuarios/mercaderiausuarios => Donde se dirigen las mercaderias
router.get ( '/mercadousuariosmercaderias' , productController.getMercadoUsuariosMercaderias );

//@post /mercadousuarios/mercaderiausuarios 
router.post ( '/mercadousuariosmercaderias' ,[ upload.single('img'), validationsMiddlewares.validateCreateMercaderia ], productController.postMercaderiaUsuariosMercaderias );



/* las mercaderias son creadas desde la cuenta de usuarios */
// @get /useracount/crearmercaderia
router.get ( '/crearmercaderia' , productController.getCrearMercaderia );

// @get /mercadousuarios/:id/mercaderiausuariosdetalle
router.get ( '/:id/mercaderiausuariosdetalle' , productController.getMercaderiaUsuariosDetalle );


// @delete /mercadousuarios/:id/mercaderiausuariosdetalle => /mercadousuarios/delete
router.delete ( '/mercaderiausuariosdetalle/:id/delete' , productController.deleteMercaderiaUsuariosDetalle );


// @get /mercadousuarios/:id/mercaderiausuariosdetalle => /mercadousuarios/update
router.get ( '/mercaderiausuariosdetalle/:id/update' , productController.getUpdateMercaderiaUsuariosDetalle );

// @put /mercadousuarios/:id/mercaderiausuariosdetalle => /mercadousuarios/update
router.put ( '/mercaderiausuariosdetalle/:id/update' , productController.updateMercaderiaUsuariosDetalle );





/* otras paginas donde aparecen mercaderias segun clasificacion */

// @get /mercadousuarios/mercadousuariosoro
router.get ( '/mercadousuariosoro' , productController.getMercadoUsuariosOro );

// @get /mercadousuarios/mercadousuariosplata
router.get ( '/mercadousuariosplata' , productController.getMercadoUsuariosPlata );

// @get /mercadousuarios/mercadousuariosbronce
router.get ( '/mercadousuariosbronce' , productController.getMercadoUsuariosBronce );



/* La pagina de compra es la misma para todas las mercaderias */

// @get /mercadocomercial/ * search , * buscar por categorias , * buscar por rubro / comprarmercaderia
// @get /mercadousuarios /  * mercadousuariosoro , * mercadousuariosplata , * mercadousuariosbronce / comprarmercaderia

router.get ( '/:id/comprarmercaderia' , productController.getComprarMercaderia );




module.exports = router;