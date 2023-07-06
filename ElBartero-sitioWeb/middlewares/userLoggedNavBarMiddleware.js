
const usersModel = require('../models/user.js');
const usersMarcasModel = require('../models/userMarca.js')


/* Este middleware sirve para diferenciar que muestra la barra de navegacion si el usuario se encuentra logueado */
/* Contiene configuracion de cookies */


function userLoggedNavBarMiddleware(req,res,next){

    res.locals.isLogged =false;
    res.locals.isMarcaLogged = false;


    /* Users */

        /* 
        let emailInCookie = req.cookies.email;
        let userFromCookie = usersModel.findByField('email',emailInCookie);
        
            if(userFromCookie){ 
                req.session.usuarioLogeado = userFromCookie;
            }  */  




    /*  Users Marcas */

   /*  let emailMarcaInCookie = res.cookie.email;
    let userMarcaFromCookie = usersMarcasModel.findByField('email',emailMarcaInCookie);
    
    if(userMarcaFromCookie){ 
        req.session.usuarioMarcaLogeado = userMarcaFromCookie;
    }   
 */

    /*  */

    if(req.session.usuarioLogeado){
        
        res.locals.isLogged =true;
        res.locals.usuarioLogeado= req.session.usuarioLogeado;
    } 

    if(req.session.usuarioMarcaLogeado){
        
        res.locals.isMarcaLogged =true;
        res.locals.usuarioMarcaLogeado= req.session.usuarioMarcaLogeado;
    } 

    
    next();
}


/* Si se lo quiere aplicar, 
Desde app.js hay que requerirlo y usarlo a toda la app con
app.use */
/*  COnsiderar que el middleware en app() tiene que estar despues del app session */

/* Desde el navbar,
if. ejs
locals.isLogged
muestro contenido html,
else
muestro otro contenido html */
/* Ejemplo, user acount diferente de register y signUP */

/* Se le pasa una variable local a global*/



module.exports = userLoggedNavBarMiddleware;