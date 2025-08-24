import { createDoc } from "./couchDBUtils.js";

import { DATABASE_TURNOS } from "./propiedades.js";

addEventListener("DOMContentLoaded",()=>{
    btmagregarpaciente.addEventListener("click",agregarTurnoPaciente);
});

function agregarTurnoPaciente() {
    var diayfecha = new Date();
    
    //creacion de objeto de datos del turno del paciente
    let turno = {
        "_id" : `${especialidad.value}:turno_${diayfecha.toLocaleTimeString()}`,
        "nombre": nombre.value,
        "apellido": apellido.value,
        "dni": dni.value,
        "obrasocial": obrasocial.value,
        "especialidad": especialidad.value,
        "fecharegistro": diayfecha.toLocaleDateString(),
        "horaregistro": diayfecha.toLocaleTimeString(),
        "estado": "pendiente"
    }
    createDoc(turno,DATABASE_TURNOS);
    formTurno.reset();
}