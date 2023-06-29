

function authMarcaMiddleware( req, res, next){

    if(!req.session.usuarioMarcaLogeado){

        return res.redirect('/signinmarca');
    };

    next();
};



module.exports = authMarcaMiddleware;