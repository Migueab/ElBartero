
const express = require ( 'express' );
const app = express();

const path = require ('path');
const methodOverride = require ('method-override'); 
const morgan = require('morgan');
const fs = require('fs');
const session = require('express-session');
const userLoggedNavBarMiddleware = require('./middlewares/userLoggedNavBarMiddleware.js');
const cookieParser = require('cookie-parser');



const publicPath = path.join (__dirname, './public');

const mainRoutes = require ('./routes/mainRoutes.js');
const productRoutes = require ('./routes/productRoutes.js');
const userRoutes = require ( './routes/userRoutes.js');
const footerRoutes = require ('./routes/footerRoutes.js');

app.set('view engine' , 'ejs');

app.set ('views' , [ 
    path.join(__dirname,'./views/main'),
    path.join(__dirname,'./views/productos'),
    path.join(__dirname, './views/users'),
    path.join (__dirname,'./views/footer'),
    
]);


/* Middlewares */

app.use ( express.static ( publicPath));
app.use ( express.urlencoded({ extended: true }));
app.use ( express.json());
app.use (methodOverride('_method'));
app.use (morgan('tiny'));
app.use (session({
    secret: "¿Esta es la contraseña secreta?",
    resave:false,
    saveUninitialized:false
}));
app.use(userLoggedNavBarMiddleware);
app.use(cookieParser());



/*  Registro de rutas del sitio del usuario */
/* app.use((req,res,next)=>{

    const ruta = req.originalUrl + '\n';
    fs.appendFileSync(path.join(__dirname,'./data/rutas.txt'),ruta);

    next();
});  */


/* Routers */
/* Deben ir despues de los middlewares */

app.use ( mainRoutes);
app.use (productRoutes);
app.use ( userRoutes);
app.use ( footerRoutes);


app.use((req,res,next)=>{

    res.render('404');
});


app.listen ( 3002 , ()=>{   
    console.log ( 'Servidor corriendo , http://localhost:3002');
});

