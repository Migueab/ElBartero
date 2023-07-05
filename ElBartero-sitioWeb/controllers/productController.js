
const path = require( 'path');
const fs = require ('fs');
const expressValidator = require('express-validator');

const mercaderiasModel = require ('../models/mercaderia');
const mercaderiasMarcasModel = require('../models/mercaderiaMarca');

const mercaderiasMarcas = mercaderiasMarcasModel.findAll();
const mercaderia = mercaderiasModel.findAll();


const productController = {

    /* Mercado comercial */
    getMercadoComercial :( req , res ) =>{

        const mercaderiasMarcas = mercaderiasMarcasModel.findAll();
    
        res.render ( 'mercadoComercial' , { 
            title : 'Mercado comercial' , 
            mercaderiasMarcas
        });
        
    },

    /* Mercado comercial Mercaderias */
    getMercadoComercialMercaderias : (req,res)=>{

        const mercaderiasMarcas = mercaderiasMarcasModel.findAll();

        res.render ('mercadoComercialUno', {
            title : 'Mercado comercial' , 
            mercaderiasMarcas
        });
    },
    

    /* Detalle de mercaderia en mercado comercial */
    getMercaderiaExhibidaDetalle : ( req , res ) =>{
        
        const id = Number(req.params.id);

        const mercaderiaMarcaAMostrar = mercaderiasMarcasModel.findById(id);

        if(!mercaderiaMarcaAMostrar){

            return res.send ('El id de la mercaderia no es valido');
        }
            
        res.render ('mercaderiaExhibidaDetalle' , { 
            title:'Mercaderia' , 
            mercaderiasMarcas:mercaderiaMarcaAMostrar
        });

    },

    /* Creamos la pagina de crear mercaderia, marcas , desde usuario marcas*/
    getCrearMercaderiaMarcas : (req,res)=>{

        res.render ( 'crearMercaderiaMarcas' , {
            title:'Crear mercaderia' , 
            errors:[]
        });

    },

    /* Envia a mercado cmercial, formulario */
    postMercadoComercialMercaderias :(req,res) =>{

        const datosMarcas = req.body;
        
        /* validation result le pasamos todo por req */

        const validations = expressValidator.validationResult(req);
        
        if(validations.errors.length >0 ){  
            
            return res.render ('crearMercaderiaMarcas' , {
                title: 'Crear Mercaderia',
                errors : validations.errors
            });
        };

        datosMarcas.price = Number(datosMarcas.price);
        datosMarcas.img = req.file ? '/uploadImages/imagenesmercaderiasmarcas/'+req.file.filename : 'No sube';
      
        mercaderiasMarcasModel.createOne(datosMarcas);
        
        res.redirect('/mercadocomercialmercaderias');

    },

    deleteMercaderiaExhibidaDetalle: (req,res)=>{

        const id = Number(req.params.id);

        mercaderiasMarcasModel.deleteById(id);

        res.redirect('/mercadocomercialmercaderias')

    },
    
    getUpdateMercaderiaExhibidaDetalle: (req,res)=>{

        const id = Number(req.params.id);

        const mercaderiaMarcaAModificar = mercaderiasMarcasModel.findById(id);

        if(!mercaderiaMarcaAModificar){

            return res.send('El id de la mercaderia no es valido');
        };

        res.render ( 'updateMercaderiaMarcas' , {
            title : 'Editar Mercaderia', 
            mercaderiasMarcas : mercaderiaMarcaAModificar
        });

    },

    updateMercaderiaExhibidaDetalle:(req,res)=>{

        const id = Number(req.params.id);
        const datosEditadosMarcas = req.body;

        mercaderiasMarcasModel.updateById(id,datosEditadosMarcas);

        res.redirect('/mercadocomercialmercaderias');
    },
    

    //************* 
    
    /* Se diferencian los mercados de usuarios y comercial */
    
    //************* 


    /* Mercado de usuarios */
    getMercadoUsuarios : ( req , res ) =>{

        const mercaderia = mercaderiasModel.findAll();
        
        res.render ( 'mercadoUsuarios' , { 
            title : 'Mercado de Usuarios' , 
            mercaderia 
        });
        
    },

    /* Mercado de usuarios Mercaderias */

    getMercadoUsuariosMercaderias : ( req , res ) =>{

        const mercaderia = mercaderiasModel.findAll();

        res.render ( 'mercadoUsuariosUno' , { 
            title : 'Mercado de Usuarios' , 
            mercaderia 
        });
        
    },
    
   
    /* Donde estaran las mercaderias de los usuarios */
    /* Mercado de usuarios Merado de oro */

    getMercadoUsuariosOro : ( req,res)=>{


        res.render ('mercadoUsuariosOro' , { 
            title : 'Mercado de oro'});
    },

    /* Mercado de usuarios Mercado de Plata */
    getMercadoUsuariosPlata : ( req,res)=>{

        res.render ('mercadoUsuariosPlata' , { 
            title : 'Mercado de plata'});
    },

    /* Mercado de usuarios Mercado de Bronce */
    getMercadoUsuariosBronce : ( req,res)=>{

        res.render ('mercadoUsuariosBronce' , { 
            title : 'Mercado de bronce'});

    },

    /* Detalle de mercaderia en mercado de usuarios */
    getMercaderiaUsuariosDetalle : ( req , res ) =>{

        /* Agarramos id que nos pasaron por paramentro de ruta */
        const id = Number(req.params.id);

        const mercaderiaAMostrar = mercaderiasModel.findById(id);

        /* Si es invalido muestra mensaje */
        if(!mercaderiaAMostrar){
        
            /* El return detiene ejecucion del controler */
            return res.send('El id de la mercaderia no es valida')
        }
        
        /* Renderizamos vista y le pasamos datos */
        res.render ( 'mercaderiaUsuariosDetalle' , { 
            title : 'Mercaderia de usuarios' , 
            mercaderia : mercaderiaAMostrar 
        });
        
    },

    deleteMercaderiaUsuariosDetalle: ( req,res )=>{

        const id = Number(req.params.id);

        mercaderiasModel.deleteById(id);

        res.redirect ( '/mercadousuariosmercaderias');
    },


     /* Edicion de mercaderia */
     getUpdateMercaderiaUsuariosDetalle: (req,res)=>{
        
        const id = Number(req.params.id);

        const mercaderiaAEditar = mercaderiasModel.findById(id);

        if(!mercaderiaAEditar){

            return res.send('La mercaderia no fue identificada');
        };

        res.render ( 'updateMercaderia' , { 
            title:'Editar Mercaderia', 
            mercaderia: mercaderiaAEditar });

    },

    updateMercaderiaUsuariosDetalle: (req,res)=>{

        const id = Number(req.params.id);
        const datosEditados = req.body;

        mercaderiasModel.updateById(id, datosEditados);

        res.redirect( '/mercadousuariosmercaderias');

    },
    
    /* Creacion desde la cuenta usuarios */
    /* Envia a mercado de usuarios, formulario */

    postMercaderiaUsuariosMercaderias: (req,res)=>{
        
        const newMercaderia = req.body;

        const validations = expressValidator.validationResult(req);
        
        if(validations.errors.length >0 ){  
            
            return res.render ('crearMercaderia' , {
                title: 'Crear Mercaderia',
                errors : validations.errors,
            });
        };

        newMercaderia.price = Number(newMercaderia.price);
        newMercaderia.img = req.file ? '/uploadImages/imagenesmercaderias/'+ req.file.filename : 'No sube';
       
        mercaderiasModel.createOne(newMercaderia);

        res.redirect('/mercadousuariosmercaderias');
     
    },
    
    /* Creamos la pagina de crear mercaderia, usuarios */
    getCrearMercaderia : (req,res)=>{
        
        res.render ('crearMercaderia' , { 
            title: 'Crear mercaderia', 
            errors:[]});

    },



    /* Comprar mercaderia, igual usuarios o comercios */
    getComprarMercaderia : ( req,res)=>{

        /* const mercaderiasMarcas = mercaderiasMarcasModel.findById();
        const mercaderia = mercaderiasModel.findById(); */

        res.render ('comprarMercaderia' , { 
            title : 'Compra' , 
            mercaderiasMarcas , 
            mercaderia});
    }



}


module.exports = productController;