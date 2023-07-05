
const fs = require('fs');
const path = require ('path');
const uuid= require('uuid');

const model={

    //Ruta de archivo json

    route: '../data/users.json',

    // Funciones

    //Traer mercaderias

    findAll: function(){

        const usersJSON = fs.readFileSync( path.join(__dirname, this.route),'utf-8');

        const users = JSON.parse(usersJSON);

        return users;
    },

    //Traer una mercaderia segun ID

    findByField: function(field , text){

        let users =this.findAll();
        let userFound = users.find(elemento=> elemento[field]===text);
        return userFound;
    },


    findByPk: function(id){
    
        let users = this.findAll();

        let searched =users.find(elemento=>elemento.id===id);

        if(!searched){

            searched = null;
        }
       
        return searched;

    },
    
    //Eliminar una mercaderia segun ID
    
    deleteByPk: function(id){

        let users =this.findAll();

        users = users.filter( elemento => elemento.id !==id);

        const usersJSON = JSON.stringify(users);

        fs.writeFileSync(path.join(__dirname, this.route),usersJSON);

        return users;

    },
    //Editar una mercaderia segun ID

    updateByEmail: function(email, newData){

        const users = this.findAll();

        const user = users.find(elemento=>elemento.email === email);

        const index = users.indexOf(user);

        users[index] = {

            ...user,
            email: users[index].email,
            name: newData.name,
            birthdate: newData.birthdate,
            phonenumber:newData.phonenumber
        }

        const usersJSON =JSON.stringify(users);

        fs.writeFileSync(path.join(__dirname,this.route),usersJSON);

        return users;

    },

    //Agregar producto

    createOne: function(newUser){

        let users = this.findAll();

        newUser.id = uuid.v4();
        
        users.push(newUser); 

        const usersJSON = JSON.stringify(users);

        fs.writeFileSync(path.join(__dirname, this.route), usersJSON);
        
        return newUser;

    }
}


module.exports = model;