
const footerController = {


    getArrepentimiento : ( req , res ) =>{
    
        res.render ( 'foo-arrepentimiento' ,{ title : 'Arrepentimiento de actividades'});
        
    },

    getContacto : ( req , res ) =>{
 
        res.render ( 'foo-contacto' , { title : 'Contacto'});
    
    },

    getCambiosDevoluciones :  ( req , res ) =>{
    
        res.render ( 'foo-cambiosDevoluciones' , { title : 'Cambios y devoluciones'});
    
    },

    getPoliticasPrivacidad : ( req , res ) =>{
    
        res.render ( 'foo-politicasPrivacidad' , { title : 'Politicas de privacidad'});
        
    },

    getTerminosCondiciones : ( req , res ) =>{

        res.render ( 'foo-terminosCondiciones' ,{ title : 'Terminos y condiciones'});
        
    },

    getPreguntasFrecuentes : ( req , res ) =>{
    
        res.render ( 'foo-preguntasFrecuentes' , { title : 'Preguntas frecuentes'});
    
    },

    getPreguntasBlog : ( req , res ) =>{
    
        res.render ( 'foo-preguntasBlog' , { title : 'Preguntas blog'});
    
    },

    getTransporte : ( req , res ) =>{
    
        res.render ( 'foo-transporte' , { title : 'Transporte'});
    
    },

    getContratacion :  ( req , res ) =>{

        res.render ( 'foo-contratacion' , { title : 'Contratacion'});
    
    },

}


module.exports = footerController;