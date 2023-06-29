
const expressValidator = require('express-validator');

const validations={

    validateCreateMercaderia:[

        expressValidator.body('title')
    .notEmpty().withMessage('El nombre no deberia estar vacio'),

    expressValidator.body('price')
    .notEmpty().withMessage('El precio no deberia estar vacio')
    .isInt().withMessage('Deberia ser un numero'),


    ]
}


module.exports=validations;