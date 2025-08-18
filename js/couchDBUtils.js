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