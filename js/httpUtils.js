
import { DEBUG_MODE } from "./propiedades.js";

export async function httpMethod(url, method, body, headers){
    
    if (body != null)
        body = JSON.stringify(body);
        if (DEBUG_MODE === "INFO"){
            console.log("body request recibido: " + body)
        }

    const ret = await fetch(url, {
        method: method,
        body: body,
        headers: headers
    });
    
    if (DEBUG_MODE === "INFO"){
            console.log("fecth return: " + JSON.stringify(ret))
        }

    return await ret.json();
}

export function createHeaders(username, password) {
    
    let headers = new Headers(); 

    headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    headers.set('Content-type', "application/json; charset=UTF-8");

    return headers;
}