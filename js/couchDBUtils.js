import { createHeaders } from "./httpUtils.js";

import { httpMethod } from "./httpUtils.js";

import { USERNAME } from "./propiedades.js";

import { PASSWORD } from "./propiedades.js";

import { DATABASE_URL_BASE } from "./propiedades.js";

import { DEBUG_MODE } from "./propiedades.js";

import { DATABASE_TURNOS } from "./propiedades.js";

import { DATABASE_PERSONAS } from "./propiedades.js";

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
    // opcion larga
    //if (basededatos.rows.length === 0){
        //return null;
    //}
    //else {
        //for (let ciclos =0;ciclos<basededatos.rows.length;ciclos += 1){
            //if (basededatos.rows[ciclos].doc.estado === "pendiente"){
                //return basededatos.rows[ciclos].doc;
            //}
        //}
    //}
    //opcion corta
    let pendiente = basededatos.rows.map(r => r.doc).find(doc => doc.estado === "pendiente");
    return pendiente || null;
}

export async function cambiarestadoturno(database,id,cambios){
    let requestUri = `${DATABASE_URL_BASE}/${database}/${id}`;
        
    let headers = createHeaders(USERNAME,PASSWORD );

    let basededatos = await httpMethod(requestUri,"GET",null,headers);
    
    if (DEBUG_MODE === "INFO"){
        console.log("basededatos antes de la modificacion",basededatos) 
    }

    Object.assign(basededatos, cambios);
    
    if (DEBUG_MODE === "INFO"){
        console.log("basededatos modificado",basededatos)
    }
    httpMethod(requestUri,"PUT",basededatos,headers);
}

export async function obtenerDoc(database,dni) {
    let requestUri = `${DATABASE_URL_BASE}/${database}/_find`;

    if (database === DATABASE_PERSONAS) { 
        var index = "idx_persona_rol"
    }
    if (database === DATABASE_TURNOS) {
        var index = ["idx-turnos-pendientes", "turnos-pendientes-por-fecha"]
    }
    let headers = createHeaders(USERNAME,PASSWORD );

    let body = {
        "selector": { "dni": dni },
        "limit": 1,
        "use_index": index
    }

    let basededatos = await httpMethod(requestUri,"POST",body,headers);

    if (DEBUG_MODE === "INFO"){
        console.log("basededatos",basededatos)
        console.log("paciente", basededatos.docs)
    }
    return basededatos.docs[0] || null;
}

export async function contadorpersonas(database,especialidad,hora) {
    let requestUri = `${DATABASE_URL_BASE}/${database}/_partition/${especialidad}/_find`;
        
    let headers = createHeaders(USERNAME,PASSWORD );

    let body = {
                "selector": {
                "estado": "pendiente",
                "horaregistro": { "$lt": hora}   // solo los que tienen hora anterior
                },
                "fields": ["_id"],
                "use_index": ["idx-turnos-pendientes", "turnos-pendientes-por-fecha"]
            }

    let basededatos = await httpMethod(requestUri,"POST",body,headers);
    
    if (DEBUG_MODE === "INFO"){
        console.log("basededatos",basededatos)
        console.log("cantidad de pacientes", basededatos.docs.length)
    }
    return basededatos.docs.length;
}
