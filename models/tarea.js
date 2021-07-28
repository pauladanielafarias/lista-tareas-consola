const { v4: uuidv4 } = require('uuid');
uuidv4(); //Create a version 4 (random) UUID

// clase de js Tarea
class Tarea{
    id='';
    desc = '';
    completada = null;

    constructor(desc){
        this.id = uuidv4();
        this.desc =desc;
        this.completada = null;
    }
}

// exportar la clase
module.exports = Tarea;