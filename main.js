function solicitud(datos) {
    console.log("No asincrona");

    return new Promise(resolve=>{
        setTimeout(resolve, datos);
    })
}

async function f() {
    console.log("Inicio de funcion asincrona");

    await solicitud(2000);
    console.log("Terminamos ejecucion de funcion asincrona");
}

function bigFunction(){
    console.log("Funcion normal ejecutada");
    let result = 0;
    for(let i=0;i<1e7;i++){
        result = result + 1;
    }
    console.log("Funcion normal terminada");
}

// f();
// bigFunction();

const COUNTER_P = document.getElementById('counter');
// console.log(COUNTER_P);
let counter = 0;

const butonp = document.getElementById('boton');
butonp.addEventListener('click',async (e)=>{
    await setTimeout(() => {
        console.log("hola");
        counter++;
        COUNTER_P.innerText = counter;
    }, 2000);
})