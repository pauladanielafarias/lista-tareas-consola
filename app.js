//pkgs and modules
const colors = require('colors');


//funciones y variables importadas de otros archivos
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
console.clear()

const main = async()=>{

    let option = 0;
    const tareas = new Tareas;
    const dataDB = leerDB();

    //si existe un archivo data.json con tareas, las agrega al listado de tareas de esta sesión de la consola
    if(dataDB != null){
        dataDB.forEach(tarea => {
            tareas._listado[tarea.id] = tarea; 
        });
    }

    do{
        //imprimir el menu
        option = await inquirerMenu();

        //cuando se selecciona una opcion del menu
        switch(option.opt){
            
            case 1:
                //Crear tarea
                //leer el input
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);

            break;
            case 2:
                //Listar tareas
                tareas.listadoCompleto();
                await pausa();

            break;
            case 3:
                //Listar tareas completadas
                tareas.listarCompletadas('Completadas');
                await pausa();

            break;
            case 4:
                //Listar tareas pendientes
                tareas.listarCompletadas('Pendientes');
                await pausa();

            break;
            case 5:
                //Completar tarea(s)
                const {ids} = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);

                if(ids[0] == undefined){
                    console.log('')
                    console.log(colors.red('No seleccionaste tareas completadas.'))
                }else{
                    console.log('')
                    console.log(colors.green('Completaste tareas.'))
                }
                await pausa();

            break;
            case 6:
                //Borrar tarea
                if(tareas.listadoArr[0] == undefined){
                    console.log(''); //deja un salto de linea
                    console.log('No hay tareas.')
                    await pausa();
                    
                }else{
                    const id = await listadoTareasBorrar(tareas.listadoArr);
                    if(id.id != 0){
                        const {ok} = await confirmar('¿Está seguro que quiere borrar la tarea?');
                        //console.log(id.id)
                        if(ok == true){
                            tareas.borrarTarea(id.id);
                            guardarDB(tareas.listadoArr);

                            console.log(''); //deja un salto de linea
                            console.log(colors.magenta('Tarea borrada'));
                        };
                        await pausa();
                    }
                }
                
            break;

        }

        if(tareas.listadoArr[0] != undefined){
            guardarDB(tareas.listadoArr);
        }

        //si el usuario selecciona una opcion !=0, se aguarda una pausa
        if(option.opt != 0){
            //await pausa();
  
        }else{
            console.log(colors.red('Saliendo...'))
        }


    }while(option.opt != 0)

}





main()