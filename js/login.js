import { DEBUG_MODE } from "./propiedades.js";

import { DATABASE_PERSONAS } from "./propiedades.js";

import { obtenerDoc } from "./couchDBUtils.js";

export var especialidad = "";

export var dni = "";

document.getElementById("divturno").style.display = "none";
document.getElementById("divmedicopaciente").style.display = "none";
document.getElementById("divpaciente").style.display = "none";

addEventListener("DOMContentLoaded",()=>{
    btmvalidarusuario.addEventListener("click",validarusuario);
});

async function validarusuario(){
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;
    if (DEBUG_MODE == "INFO"){
        console.log("usuario",usuario);
        console.log("contraseña",contraseña);
    }
    let datosusuario = await obtenerDoc(DATABASE_PERSONAS,usuario);

    if (DEBUG_MODE == "INFO"){
        console.log("traer usuario",datosusuario);
    }
    if (contraseña === datosusuario.contraseña) {
        if (datosusuario.rol === "recepcion"){
            document.getElementById("divturno").style.display = "block";
        }
        if (datosusuario.rol === "medico"){
            especialidad = datosusuario.especialidad;
            document.getElementById("divmedicopaciente").style.display = "block";
        }
        if (datosusuario.rol === "paciente"){
            dni = datosusuario.dni;
            document.getElementById("divpaciente").style.display = "block";
        }
    }
    else{
        alert("Usuario o contraseña incorrectos");
    }
    
}