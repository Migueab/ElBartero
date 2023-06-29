

function guestMiddleware(req,res,next){

    if(req.session.usuarioLogeado){

        return res.redirect('/useracount');
    
    }; 
    next();
}



module.exports = guestMiddleware;