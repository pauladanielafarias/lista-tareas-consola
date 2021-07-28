//pkgs and modules
const colors = require('colors');

//clases, funciones y variables importadas de otros archivos
const Tarea = require("./tarea");

// clase de js Tareas
class Tareas{
    _listado = {};

    constructor(desc){
        this._listado = {};
    }

    get listadoArr(){
        const listado = [];
        
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea)
        });

        return listado;
    }

    // se crea la tarea (proveniente de la clase Tarea) y se agrega al listado de tareas
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    // se crea la tarea (proveniente de la clase Tarea) y se agrega al listado de tareas
    borrarTarea(id){
        if(this._listado[id].id == id){
            delete this._listado[id];
        }
    };


    // da el listado completo de tareas creadas
    listadoCompleto(){
        if(this.listadoArr[0] == undefined){
            console.log(''); //deja un salto de linea
            console.log('No hay tareas.');
        }else{ 
            let i = 1;
            console.log(''); //deja un salto de linea
            this.listadoArr.forEach(tarea => {
                let completada = tarea.completada;
                completada = (completada!=null) ? 
                                completada = colors.green('Completada') : 
                                completada = colors.red('Pendiente ');

                console.log(`${colors.white(i + '.')} ${completada} ${colors.blue('::')} ${tarea.desc}`);
                i++;
            }); 
        }
    };

    // da el listado completo de tareas completas o pendientes (según la sección)
    listarCompletadas(estado){
        let completadas = [];
        let pendientes = [];

        this.listadoArr.forEach(tarea => {
            let completada = tarea.completada;
            completada = (completada!=null) ? 
                            completadas.push(tarea):
                            pendientes.push(tarea);
        }); 

        if(this.listadoArr[0] == undefined){
            console.log(''); //deja un salto de linea
            console.log('No hay ninguna tarea creada.');

        }else if(completadas[0] == undefined && estado == 'Completadas'){
            console.log(''); //deja un salto de linea
            console.log(colors.magenta('No hay tareas completadas.'));

        }else if(pendientes[0] == undefined && estado == 'Pendientes'){
            console.log(''); //deja un salto de linea
            console.log(colors.green('No hay tareas pendientes.'));

        }else{ 
            let i = 1;
            console.log(''); //deja un salto de linea

            if(estado == 'Completadas'){
                completadas.forEach(completada => {
                    console.log(`${colors.white(i + '.')} ${colors.green(completada.completada)} :: ${completada.desc}`);
                    i++;
                });
            }
            if(estado == 'Pendientes'){
                pendientes.forEach(pendiente => {
                    console.log(`${colors.red(i + '.')} ${pendiente.desc}`);
                    i++;
                });
            };

        };
    };

    // 
    toggleCompletadas(ids = []){
        const tareas = this._listado;

        ids.forEach(id => {
            const tarea = tareas[id];
            if( !tarea.completada){
                tarea.completada = new Date().toLocaleString();
            }
        });

        this.listadoArr.forEach(tarea =>{

            if(!ids.includes(tarea.id)){
                tareas[tarea.id].completada = null;
            }
        });
    }

}; // fin de clase

// exportar la clase
module.exports = Tareas;
