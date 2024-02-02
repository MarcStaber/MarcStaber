"use strict";
import {MainFacade} from "./MainFacade.js";

  function UserDAO(facade,user) {
    this.baseUrl = "http://localhost:5051/students";
    this.facade = facade;
    this.user = user;


  };

  UserDAO.prototype.sendUserData = function(callback) {
    console.log("RegistryInformations is send!");
    console.log(user);
    loadDoc("post", this.baseUrl, user, callback);
    console.log (user);
  };


