
const fs = require('fs');
const path = require ('path');
const uuid = require('uuid');

const model={

    //Ruta de archivo json

    route: '../data/usersMarcas.json',

    // Funciones

    //Traer mercaderias

    findAll: function(){

        const usersMarcasJSON = fs.readFileSync( path.join(__dirname, this.route),'utf-8');

        const usersMarcas = JSON.parse(usersMarcasJSON);

        return usersMarcas;
    },

    findByField: function(field , text){

        let usersMarcas =this.findAll();
        let userMarcaFound = usersMarcas.find(elemento=> elemento[field]===text);
        return userMarcaFound;
    },

    //Traer una mercaderia segun ID

    findByPk: function(id){
    
        let usersMarcas = this.findAll();

        let searched =usersMarcas.find(elemento=>elemento.id===id);

        if(!searched){

            searched = null;
        }
       
        return searched;

    },
    
    //Eliminar una mercaderia segun ID
    
    deleteByEmail: function(id){

        let usersMarcas =this.findAll();

        usersMarcas = usersMarcas.filter( elemento => elemento.id !==id);

        const usersMarcasJSON = JSON.stringify(usersMarcas);

        fs.writeFileSync(path.join(__dirname, this.route),usersMarcasJSON);

        return usersMarcas;

    },
    //Editar una mercaderia segun ID

    updateByEmail: function(email, newData){

        const usersMarcas = this.findAll();

        const userMarca = usersMarcas.find(elemento=>elemento.email === email);

        const index = usersMarcas.indexOf(userMarca);

        usersMarcas[index] = {

            email: usersMarcas[index].email,
            title: newData.title,

        }

        const usersMarcasJSON =JSON.stringify(usersMarcas);

        fs.writeFileSync(path.join(__dirname,this.route),usersMarcasJSON);

        return usersMarcas;

    },

    //Agregar producto

    createOne: function(newUserMarca){

        let usersMarcas = this.findAll();

        newUserMarca.id = uuid.v4();

        usersMarcas.push(newUserMarca); 

        const usersMarcasJSON = JSON.stringify(usersMarcas);

        fs.writeFileSync(path.join(__dirname, this.route), usersMarcasJSON);
        
        return newUserMarca;

    }
}


module.exports = model;