import { createHeaders } from "./httpUtils.js";

import { httpMethod } from "./httpUtils.js";

import { USERNAME } from "./propiedades.js";

import { PASSWORD } from "./propiedades.js";

import { DATABASE_URL_BASE } from "./propiedades.js";

import { DEBUG_MODE } from "./propiedades.js";

export function createDoc(doc,database){

    let requestUri = `${DATABASE_URL_BASE}/${database}`;

    let headers = createHeaders(USERNAME,PASSWORD );

    if (DEBUG_MODE === "INFO"){
        console.log("request:" + requestUri);
        console.log("user: " + USERNAME + " password: " +PASSWORD)
        console.log("headers" + [...headers.entries()]);
    }
    httpMethod(requestUri,"POST",doc,headers);
}

export function getAllDocs(database){

    let requestUri = `${DATABASE_URL_BASE}/${database}/_all_docs`;
    
    let headers = createHeaders(USERNAME,PASSWORD );

    httpMethod(requestUri,"GET",null,headers);
}

export async function obtenerTurnoEspecialidad(database,especialidad) {
    let requestUri = `${DATABASE_URL_BASE}/${database}/_partition/${especialidad}/_all_docs?include_docs=true`;
        
    let headers = createHeaders(USERNAME,PASSWORD );

    let basededatos = await httpMethod(requestUri,"GET",null,headers);
    
    if (DEBUG_MODE === "INFO"){
        console.log("basededatos",basededatos)
    }
    if (basededatos.rows.length === 0){
        return null;
    }
    else {
        for (let ciclos =0;ciclos<basededatos.rows.length;ciclos += 1){
            if (basededatos.rows[ciclos].doc.estado === "pendiente"){
                return basededatos.rows[ciclos].doc;
            }
        }
    }
}

export async function cambiarestadoturno(database,id,cambios){
    let requestUri = `${DATABASE_URL_BASE}/${database}/${id}`;
        
    let headers = createHeaders(USERNAME,PASSWORD );

    let basededatos = await httpMethod(requestUri,"GET",null,headers);
    
    if (DEBUG_MODE === "INFO"){
        console.log("basededatos antes de la modificacion",basededatos) //duda por que aparece ya con las modificaciones antes del GET
    }

    Object.assign(basededatos, cambios);
    
    if (DEBUG_MODE === "INFO"){
        console.log("basededatos modificado",basededatos)
    }
    httpMethod(requestUri,"PUT",basededatos,headers);
}