"use strict";

function loadDoc(method, url, paramaters, responseCallback) {
    let isGet = method.toLowerCase() == 'get';
    let xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);

    if (isGet) {
        console.log("Send get!")
        xhttp.send();
    } else {
        console.log("Send post/put/delete");
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(paramaters);
    }

    xhttp.onload = function () {
        if (xhttp.status == 200) {
            console.log("Request Succesfull");
            responseCallback(JSON.parse(xhttp.responseText));
        } else {
            console.log("Something went wrong! Status == " + xhttp.status);
        }
    }
}
