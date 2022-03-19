const axios = require('axios');
let registro;
//PUNTO 1 
console.log('Punto #1 \n')
axios.get('https://api.garantto.com/api/v1/pais')
.then(res=>{
    console.log(res.data);
    console.log(`Hay ${res.data.length} registros existentes \n`);
    registro = res.data.find(item=>item.IdT === 'CO');

    if(registro === undefined ){
        console.error(`No se ah encontrado el registro`) //informando el error
    }else{
        dataPais();
    }
})
.catch(err=>console.log(err));

//PUNTO 2
const dataPais = ()=>{
    console.log('Punto #2 \n')
    let productos= [];
    axios.get(`https://api.garantto.com/api/v1/categoria?idPais=${registro.Id}`)
    .then(res=> {
        res.data.forEach(el=>{
            let producto = el.Hijos.filter(producto=>producto.IdT === 'Televisor' || producto.IdT === 'Carro');
            if(producto.length > 0){
                producto.categoria = el.Descripcion; //Agrego la propiedad categoria al producto
                console.log(`Categoria de ${producto[0].IdT}: ${el.Descripcion}`) // consola Categoria del producto
                productos.push(producto);
            } 
        })
    })
    .catch(err=>console.log(err))
}