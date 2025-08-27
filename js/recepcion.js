import { createDoc } from "./couchDBUtils.js";

import { DATABASE_TURNOS } from "./propiedades.js";

addEventListener("DOMContentLoaded",()=>{
    btmagregarpaciente.addEventListener("click",agregarTurnoPaciente);
});

function agregarTurnoPaciente() {
    var diayfecha = new Date();

    // Fecha iso sin milisegundos para el _id
    let fechaISO = diayfecha.toISOString().split(".")[0];
    
    //creacion de objeto de datos del turno del paciente
    let turno = {
        "_id" : `${especialidad.value}:${fechaISO}`,
        "nombre": nombre.value,
        "apellido": apellido.value,
        "dni": dni.value,
        "obrasocial": obrasocial.value,
        "especialidad": especialidad.value,
        "fecharegistro": fechaISO.split("T")[0],    // YYYY-MM-DD
        "horaregistro": fechaISO.split("T")[1],     // HH:MM:SS    
        "estado": "pendiente"
    };
    createDoc(turno,DATABASE_TURNOS);
    formTurno.reset();
}