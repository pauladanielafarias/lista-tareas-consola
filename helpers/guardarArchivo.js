const fs = require('fs')

//se fija si un objeto está vacío
const isEmptyObject = (obj) =>{
    for(var key in obj) { 
        if (Object.prototype.hasOwnProperty.call(obj, key)) { 
            return false; 
        } 
    } 
    return true; 
};

const archivo = './db/data.json'


const guardarDB = (data)=>{
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = ()=>{
    const info = fs.readFileSync(archivo, {encoding:'utf-8'})

    if (!fs.existsSync(archivo) || isEmptyObject(info)){
        return null;
    }else{
        const data = JSON.parse(info);
        return data;
    }
}


module.exports ={
    guardarDB,
    leerDB
}