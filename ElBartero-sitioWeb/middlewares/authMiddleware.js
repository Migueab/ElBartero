
function authMiddleware( req, res, next){

    if(!req.session.usuarioLogeado){

        return res.redirect('/signin');
    };

    next();
};



module.exports = authMiddleware;