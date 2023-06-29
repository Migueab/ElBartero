
const express = require ('express');

const routes = express.Router();

const footerController = require ('../controllers/footerController.js');
const router = require('./mainRoutes');

// @get /arrepentimiendodeactividades
router.get ( '/arrepentimientodeactividades' , footerController.getArrepentimiento );

// @get /contacto
router.get ( '/contacto' , footerController.getContacto );


// @get /cambiosydevoluciones
router.get ( '/cambiosydevoluciones' , footerController.getCambiosDevoluciones);

// @get /politicasdeprivacidad
router.get ( '/politicasdeprivacidad' , footerController.getPoliticasPrivacidad );

// @get /terminosycondiciones
router.get ( '/terminosycondiciones' , footerController.getTerminosCondiciones );

// @get /preguntasfrecuentes
router.get ( '/preguntasfrecuentes' , footerController.getPreguntasFrecuentes );

// @get /preguntasblog
router.get ( '/preguntasblog' , footerController.getPreguntasBlog );

// @get /transporte
router.get ( '/transporte' , footerController.getTransporte );

// @get /contratacion
router.get ( '/contratacion' , footerController.getContratacion );



module.exports= router;