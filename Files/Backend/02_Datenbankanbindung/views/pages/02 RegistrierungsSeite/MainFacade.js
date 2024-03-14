"use strict";



function MainFacade() {
    this.vh = new ViewHandler(this);
    this.usDAO = new UserDAO(this);
    this.user = new User(this);
};

MainFacade.prototype.main = function(){
    this.vh.bind();
};

MainFacade.prototype.sendRegistryInformations = function() {
    console.log("Registry Complete clicked!");
    this.usDAO.sendUserData(this.getResponse);
}


MainFacade.prototype.getResponse = function() {
    this.user.createUser();
    console.log("Callback done");
}


let facade = new MainFacade();
facade.main();
