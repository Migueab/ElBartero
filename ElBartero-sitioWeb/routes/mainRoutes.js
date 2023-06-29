
const express = require ('express')


const controlador = require('../controllers/controlador.js');

const router = express.Router();

//@get /home
router.get ( '/' , controlador.getIndex );

//@get /instructivo
router.get ( '/instructivo' , controlador.getInstructivo );

//@get /balanza
router.get ( '/balanza' , controlador.getBalanza );

//@get /subasta
router.get ( '/subasta' , controlador.getSubasta );

//@get /valoracion
router.get ( '/valoracion' , controlador.getValoracion );

//@get /canasta
router.get ( '/canasta' , controlador.getCanasta );

//@get /piedepagina
router.get ( '/piedepagina' , controlador.getSmallFooter );




module.exports = router;