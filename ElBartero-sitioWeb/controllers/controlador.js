
const path = require ('path')


const controlador= {

    getIndex: ( req , res )=>{

        res.render ( 'index' , { title : 'El Bartero'});
    },

    getInstructivo : ( req , res ) =>{
    
        res.render ('instructivo' , { title : 'Instrutivo'});
    
    },

    getBalanza : ( req , res ) =>{
    
        res.render ('balanza' , { title : 'Balanza'});
    
    },

    getSubasta : ( req , res ) =>{
    
        res.render ('subasta' , { title : 'Subasta'});
        
    },

    getValoracion : ( req , res ) =>{
    
        res.render ( 'valoracion' , { title : 'Valoracion'});
        
    },

    getCanasta : ( req , res ) =>{

        res.render ( 'canasta' , { title : 'Canasta'});
        
    },

    getSmallFooter : ( req , res ) =>{

        res.render ( 'smallFooter' , { title : 'Pie de pagina'});
        
    },

}




module.exports= controlador;