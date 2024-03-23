"use strict";
 
function ViewHandler (facade) {
    this.facade = facade;
}

ViewHandler.prototype.bind = function() {
    let listBtn = document.getElementById("btnRegistry");
    listBtn.onclick = event=>{ 
        this.facade.sendRegistryInformations();
    }
}   

ViewHandler.prototype.refresh = function() {
    let resArea = document.getElementById("resultArea");

    resArea.innerHTML = JSON.stringify(this.facade.studentList);
}

