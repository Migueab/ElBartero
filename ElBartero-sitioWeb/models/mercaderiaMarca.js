
const fs = require('fs');
const path = require ('path');
const { title } = require('process');


marcasModel ={

//Ruta de archivo json

route : '../data/mercaderiasMarcas.json',

//traer las mercaderias Marcas

findAll: function(){

    const mercaderiasMarcasJSON = fs.readFileSync( path.join(__dirname, this.route),'utf-8');

    const mercaderiasMarcas = JSON.parse(mercaderiasMarcasJSON);

    return mercaderiasMarcas;
},

//Traer una mercaderia Marcas segun ID

findById: function(id){

    let mercaderiasMarcas = this.findAll();

    let searched = mercaderiasMarcas.find(elemento=>elemento.id===id);

    if(!searched){

        searched = null;
    }
   
    return searched;

},

//Eliminar una mercaderia Marca segun ID

deleteById: function(id){

    let mercaderiasMarcas =this.findAll();

    mercaderiasMarcas = mercaderiasMarcas.filter( elemento => elemento.id !==id);

    const mercaderiasMarcasJSON = JSON.stringify(mercaderiasMarcas);

    fs.writeFileSync(path.join(__dirname, this.route),mercaderiasMarcasJSON);

    return mercaderiasMarcas;

},
//Editar una mercaderia Marca segun ID

updateById: function(id, newData){

    const mercaderiasMarcas = this.findAll();

    const mercaderiaMarca = mercaderiasMarcas.find(elemento=>elemento.id === id);

    const index = mercaderiasMarcas.indexOf(mercaderiaMarca);

    mercaderiasMarcas[index] = {

        id: mercaderiasMarcas[index].id,
        title: newData.title,
        price: Number(newData.price),
        description: newData.description,
        img: newData.img? '/uploadImages/imagenesmercaderiasmarcas/'+Date.now()+newData.img: 'No sube'
        
    }

    const mercaderiasMarcasJSON =JSON.stringify(mercaderiasMarcas);

    fs.writeFileSync(path.join(__dirname,this.route),mercaderiasMarcasJSON);

    return mercaderiasMarcas;

},

//Agregar producto a Marcas

createOne: function(newMercaderiaMarca){

    let mercaderiasMarcas = this.findAll();

    newMercaderiaMarca.id = mercaderiasMarcas[mercaderiasMarcas.length - 1].id +1;
    
    mercaderiasMarcas.push(newMercaderiaMarca); 

    const mercaderiasMarcasJSON = JSON.stringify(mercaderiasMarcas);

    fs.writeFileSync(path.join(__dirname, this.route), mercaderiasMarcasJSON);
    
    return newMercaderiaMarca;

}

}


module.exports = marcasModel;