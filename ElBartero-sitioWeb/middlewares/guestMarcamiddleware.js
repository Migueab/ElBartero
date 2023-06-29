


function guestMarcaMiddleware(req,res,next){

    if(req.session.usuarioMarcaLogeado){

        return res.redirect('/useracountmarca');
    
    }; 
    next();
}



module.exports = guestMarcaMiddleware;