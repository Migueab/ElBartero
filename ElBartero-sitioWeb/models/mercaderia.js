
const fs = require('fs');
const path = require('path');
const { title } = require('process');

const model={

    //Ruta de archivo json

    route: '../data/mercaderias.json',

    // Funciones

    //Traer mercaderias

    findAll: function(){

        const mercaderiasJSON = fs.readFileSync( path.join(__dirname, this.route),'utf-8');

        const mercaderias = JSON.parse(mercaderiasJSON);

        return mercaderias;
    },

    //Traer una mercaderia segun ID

    findById: function(id){
    
        let mercaderias = this.findAll();


        let searched = mercaderias.find(elemento=>elemento.id===id);

        if(!searched){

            searched = null;
        }
       
        return searched;

    },
    
    //Eliminar una mercaderia segun ID
    
    deleteById: function(id){

        let mercaderias =this.findAll();

        mercaderias = mercaderias.filter( elemento => elemento.id !==id);

        const mercaderiasJSON = JSON.stringify(mercaderias);

        fs.writeFileSync(path.join(__dirname, this.route),mercaderiasJSON);

        return mercaderias;

    },
    //Editar una mercaderia segun ID

    updateById: function(id, newData){

        const mercaderias = this.findAll();

        const mercaderia = mercaderias.find(elemento=>elemento.id === id);

        const index = mercaderias.indexOf(mercaderia);

        mercaderias[index] = {

            id: mercaderias[index].id,
            title: newData.title,
            price: newData.price,
            description: newData.description,
            img: newData.img? '/uploadImages/imagenesmercaderias/'+Date.now()+'-'+ newData.img:'No sube'
        }

        const mercaderiasJSON =JSON.stringify(mercaderias);

        fs.writeFileSync(path.join(__dirname,this.route),mercaderiasJSON);

        return mercaderias;

    },

    //Agregar producto

    createOne: function(newMercaderia){

        let mercaderias = this.findAll();

        newMercaderia.id = mercaderias[mercaderias.length - 1].id +1;
        
        mercaderias.push(newMercaderia); 

        const mercaderiasJSON = JSON.stringify(mercaderias);

        fs.writeFileSync(path.join(__dirname, this.route), mercaderiasJSON);
        
        return newMercaderia;

    }
}


module.exports=model;