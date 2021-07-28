//pkgs and modules
require('colors');
const readline = require('readline')

const mostrarMenu = ()=>{
    return new Promise(resolve=>{
        console.log('============================'.green)
        console.log('   Seleccione una opción'.green)
        console.log('============================\n'.green)
    
        console.log(`${'1.'.blue} Crear tarea`);
        console.log(`${'2.'.blue} Listar tareas`);
        console.log(`${'3.'.blue} Listar tareas completadas`);
        console.log(`${'4.'.blue} Listar tareas pendientes`);
        console.log(`${'5.'.blue} Completar tarea(s)`);
        console.log(`${'6.'.blue} Borrar tarea`);
        console.log(`${'0.'.blue} Salir\n`);
    
    
        // crea el output
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // captura el input
        rl.question('Seleccione una opción: ', (option)=>{
            rl.close();
            resolve(option)
        })
    })
};

const pausa = ()=>{
    return new Promise(resolve=>{
        // crea el output
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // captura el input
        rl.question(`\nPresione ${'ENTER'.green}\n`, (option)=>{
            rl.close();
            resolve();
        })
    })
};



module.exports ={
    mostrarMenu,
    pausa
}