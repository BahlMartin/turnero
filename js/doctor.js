import { DEBUG_MODE } from "./propiedades.js";

import { DATABASE_TURNOS } from "./propiedades.js";

import { obtenerTurnoEspecialidad } from "./couchDBUtils.js";

import { cambiarestadoturno } from "./couchDBUtils.js";

import { especialidad } from "./login.js";

addEventListener("DOMContentLoaded",()=>{
    btmtraerpaciente.addEventListener("click",traerpaciente);
    btmatendido.addEventListener("click",pacienteatendido);
});

async function traerpaciente(){
    let paciente = await obtenerTurnoEspecialidad(DATABASE_TURNOS,especialidad);
    if (DEBUG_MODE == "INFO"){
        console.log("traer paciente",paciente);
    }
    nombrepaciente.innerText = paciente.nombre;
    apellidopaciente.innerText = paciente.apellido;
    dnipaciente.innerText = paciente.dni;
    obrasocialpaciente.innerText = paciente.obrasocial;
}

async function pacienteatendido(){
    let paciente = await obtenerTurnoEspecialidad(DATABASE_TURNOS,especialidad);
    paciente.estado = "atendido";
    paciente.diagnostico = diagnosticopaciente.value;
    
    if (DEBUG_MODE == "INFO"){
        console.log("paciente atendido",paciente);
    }
    cambiarestadoturno(DATABASE_TURNOS,paciente._id,paciente);
}


