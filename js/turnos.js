import { createDoc } from "./couchDBUtils.js";

import { DATABASE_TURNOS } from "./propiedades.js";

addEventListener("DOMContentLoaded",()=>{
    btmagregarpaciente.addEventListener("click",agregarpaciente);
});

function agregarpaciente() {
    var diayfecha = new Date();

    const formulario = document.getElementById('formTurno');
    const formularioData = new FormData(formulario);
    const paciente = Object.fromEntries(formularioData.entries());
    paciente.estado = "pendiente";
    paciente.fechaRegistro = diayfecha.toLocaleDateString()
    paciente.horaRegistro = diayfecha.toLocaleTimeString()
    
    console.log(paciente);

    createDoc(paciente,DATABASE_TURNOS);
    formulario.reset();
    
}
