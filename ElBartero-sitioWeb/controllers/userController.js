
const { randomUUID } = require('crypto');
const path = require ('path');
const bcryptjs = require('bcryptjs');
const cokkies = require('cookie-parser');

const usersModel = require('../models/user');
const usersMarcasModel = require('../models/userMarca');

const expressValidator = require('express-validator');


userController={

    getSignIn : ( req , res ) =>{
    
        res.render ( 'signIn' , {
            title : 'Iniciar Sesion' , 
            errors:[] ,
            values:[] 
        });
    },

    postSignIn : ( req , res ) =>{

        const validation = expressValidator.validationResult(req);
        
        if( validation.errors.length >0){

            return res.render( 'signIn', {
                title : 'Sign in', 
                errors : validation.errors, 
                values:req.body })
        } 

        let usuariologin = usersModel.findByField('email', req.body.email);

        if(!usuariologin){

            return res.render('signIn' , { 
                title: 'Sign in' , 
                errors:[{
                        msg:'Este email no se ha encontrado registrado'
                    }], 
                values:req.body });
        }

        if(usuariologin){

            const passwordValido = bcryptjs.compareSync(req.body.password, usuariologin.password);

           if(passwordValido){

            delete usuariologin.password;
            delete usuariologin.id;
        
            if(req.body.rememberme){

                res.cookie('email',usuariologin.email, {maxAge:(1000 *60)*60});
            }

            req.session.usuarioLogeado = usuariologin;

            return res.redirect('/useracount');
           };

        }else{

            return res.render('signIn', {

                title: 'Sign in',
                errors:[{
                        msg: 'La contraseña es incorrecta'
                    }],
                values:req.body
            });
        };
    },

    getSignUp : ( req , res ) =>{
    
        res.render ('signUp' , {  
            title:'Sign up' ,
            errors:[], 
            values:[]
        });

    },
    
    postSignUp : ( req , res ) =>{

        const validation= expressValidator.validationResult(req);
        
        if(validation.errors.length >0){
            
            return res.render( 'signUp' ,{ 

                title : 'Sign up' , 
                errors: validation.errors,
                values:req.body ,
                });
        };

        const passwordEquality = req.body.password !== req.body.confirmpassword;
        if( passwordEquality){

            return res.render('signUp', {
                title:'Sign up',
                errors:[{
                    msg:'La contraseña debe coincidir.'
                }],
                values:req.body
            });
        }

        const usuarioEnBD = usersModel.findByField('email',req.body.email);
        const usuarioMarcaEnBD = usersMarcasModel.findByField('email',req.body.email);

        if(usuarioEnBD || usuarioMarcaEnBD){

            return res.render('signUp', { 
                title:'Sign up' ,
                errors: [{
               
                        msg:'El mail ya existe, elija otro.'
                    }],
                values:req.body});
        }

        const newUser ={

            ...req.body,
            password: bcryptjs.hashSync(req.body.password , 10),
            confirmpassword: bcryptjs.hashSync(req.body.confirmpassword,10)
        }
    
        usersModel.createOne(newUser);
        
        res.redirect('/signin');
    },

    getSignInMarca : ( req , res ) =>{
    
        res.render ('signInMarca' , {
            title: 'Iniciar sesion de Marca' , 
            errors:[], 
            values:[]
        });

    },

    postSignInMarca : ( req , res ) =>{

        const validation = expressValidator.validationResult(req);
        
        if( validation.errors.length >0){

            return res.render( 'signinmarca', {
                title : 'Sign in marca', 
                errors : validation.errors, 
                values:req.body
            });
        } 

        let usuarioMarcaLogin = usersMarcasModel.findByField('email', req.body.email);

        if(!usuarioMarcaLogin){

            return res.render('signInMarca' , { 
                title: 'Sign in marca' , 
                errors:[{
                        msg:'Este email no se ha encontrado registrado'
                    }], 
                values:req.body });
        }

        if(usuarioMarcaLogin){

            const passwordMarcaValido = bcryptjs.compareSync(req.body.password, usuarioMarcaLogin.password);

           if(passwordMarcaValido){

            delete usuarioMarcaLogin.password;
            delete usuarioMarcaLogin.id;

            if(req.body.rememberme){

                res.cookie('email',usuarioMarcaLogin.email, {maxAge:(1000 *60)*60});
            }

            req.session.usuarioMarcaLogeado = usuarioMarcaLogin;

            return res.redirect('/useracountmarca');
           }

        }else{

            return res.render('signInMarca', {

                title: 'Sign in Marca',
                errors:[{
                        msg: 'La contraseña es incorrecta'
                    }],
                values:req.body
            });
        };
        
        return res.redirect('/useracountmarca');
    
    },

    
    getSignUpMarca : ( req , res ) =>{
    
        res.render ('signUpMarca' , {
            title: 'Registracion de Marca', 
            errors:[] , 
            values:[]
        });

    },
    
    postSignUpMarca : ( req , res ) =>{
    
        const validation= expressValidator.validationResult(req);

        if(validation.errors.length >0){

            return res.render( 'signUpMarca' , { 
                title:'Sign up Marca', 
                errors: validation.errors , 
                values:req.body
            });
        }
        

        const passwordEquality = req.body.password !== req.body.confirmpassword;
        if( passwordEquality){

            return res.render('signUp', {
                title:'Sign up',
                errors:[{
                    msg:'La contraseña debe coincidir.'
                }],
                values:req.body
            });
        }

        const usuarioEnBD = usersModel.findByField('email',req.body.email);
        const usuarioMarcaEnBD = usersMarcasModel.findByField('email',req.body.email);

        if(usuarioEnBD || usuarioMarcaEnBD){

            return res.render('signUpMarca', { 
                title:'Sign up marca' ,
                errors: [{
               
                        msg:'El mail ya existe, elija otro.'
                    }],
                values:req.body});
        }


        const newUserMarca ={

            ...req.body,
            password: bcryptjs.hashSync(req.body.password , 10),
            confirmpassword: bcryptjs.hashSync(req.body.confirmpassword , 10)
        }


        usersMarcasModel.createOne(newUserMarca);

        res.redirect('/signinmarca')

    },
    

    getUserAcount : ( req , res ) =>{


        res.render ( 'userAcount', { 
            title : 'Usuario',
            user:req.session.usuarioLogeado

        });
        
    },

    getEditUserProfile : ( req , res ) =>{

       const userData = usersModel.findByPk(req.params.id)

       console.log(userData)

        res.render ( 'updateUserProfile', { 
            title : 'Editar perfil del usuario',
            user:req.session.usuarioLogeado,
            userData:userData,
            values:[]
        });
        
    },

    upDateUserProfile : ( req , res ) =>{

        usersModel.updateByEmail( req.session.usuarioLogeado ,req.body)

        res.render ( 'updateUserProfile', { 
            title : 'Editar perfil del usuario',
            user:req.session.usuarioLogeado
        
        });
        
    },



    getUserAcountMarcas : ( req , res ) =>{
    
        res.render ( 'usersAcountMarcas', { title : 'Marcas'});
        
    },
    
    
    getLogout : ( req , res ) =>{
        
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },



}



module.exports = userController;