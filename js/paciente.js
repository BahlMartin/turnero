import { DEBUG_MODE } from "./propiedades.js";

import { DATABASE_TURNOS } from "./propiedades.js";

import { contadorpersonas } from "./couchDBUtils.js";

import { obtenerDoc } from "./couchDBUtils.js";

import { dni } from "./login.js";

addEventListener("DOMContentLoaded",()=>{
    btmpacientesadelantes.addEventListener("click",pacientesadelante);
});

async function pacientesadelante(){
    let datospaciente = await obtenerDoc(DATABASE_TURNOS,dni);
    if (DEBUG_MODE == "INFO"){
        console.log("traer paciente",datospaciente);
    }
    var especialidad = datospaciente.especialidad;
    var horaregistro = datospaciente.horaregistro;
    let cantidad = await contadorpersonas(DATABASE_TURNOS,especialidad,horaregistro);
    if (DEBUG_MODE == "INFO"){
        console.log("cantidad personas adelante",cantidad);
    }
    alert(`Cantidad de personas adelante: ${cantidad}`);
}
