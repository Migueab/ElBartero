
const express = require ('express');

const userController = require ( '../controllers/userController.js');

const router = express.Router();

const validationsUserMiddleware = require('../middlewares/validationUser.js');
const validationsUserMarcaMiddleware = require('../middlewares/validationUserMarca.js');

const validationsUserSignInMiddleware = require('../middlewares/validationUserSignin.js');

const guestMiddleware = require('../middlewares/guestMiddleware.js');
const authMiddleware = require ('../middlewares/authMiddleware.js');

const authMarcaMiddleware = require('../middlewares/authMarcaMiddleware.js');
const guestMarcaMiddleware = require ('../middlewares/guestMarcamiddleware.js');


//@get /signin
router.get ( '/signin' , guestMiddleware ,userController.getSignIn );

//@get /signin
router.post ( '/signin' , validationsUserSignInMiddleware.validateSignInUser,userController.postSignIn );


//@get /signup
router.get ( '/signup' , guestMiddleware ,  userController.getSignUp );

//@post /signup
router.post ( '/signup' , validationsUserMiddleware.validateCreateUser ,userController.postSignUp );



//@get /signinmarca
router.get ( '/signinmarca' , guestMarcaMiddleware ,userController.getSignInMarca );

//@post /signinmarca
router.post ( '/signinmarca' , validationsUserSignInMiddleware.validateSignInUser, userController.postSignInMarca );



//@get /signupmarca
router.get ( '/signupmarca' , guestMarcaMiddleware , userController.getSignUpMarca );

//@post /signupmarca
router.post ( '/signupmarca' , validationsUserMarcaMiddleware.validateCreateUserMarca ,userController.postSignUpMarca );




//@get /useracount
router.get ( '/useracount' ,authMiddleware , userController.getUserAcount );

router.get ( '/editarperfil' ,authMiddleware , userController.getEditUserProfile );

router.put ( '/editarperfil/:user/update' ,authMiddleware , userController.upDateUserProfile );

router.delete ( '/editarperfil/:user/delete' ,authMiddleware , userController.deleteUserProfile );

//@get /useracountmarcas
router.get ( '/useracountmarca' , authMarcaMiddleware , userController.getUserAcountMarcas );




//@get /logout
router.get ( '/logout' , userController.getLogout );




module.exports = router;