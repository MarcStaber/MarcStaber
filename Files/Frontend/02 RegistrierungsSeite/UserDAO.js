"use strict";
import { MainFacade } from "./MainFacade.js";

// UserDAO Konstruktor
function UserDAO(facade, user) {
  this.baseUrl = "http://localhost:5051/students"; //
  this.facade = facade;
  this.user = user;
};


// Funktion zum Hinzufügen eines Benutzers
UserDAO.prototype.addUser = function (user, callback) {
  setTimeout(() => {
    this.users[user.id] = user;
    if (callback) {
      callback(null, user);
    }
  }, 1000); // 1 Sekunde Verzögerung
};


// Funktion zum Löschen eines Benutzers
UserDAO.prototype.deleteUser = function (userId, callback) {
  setTimeout(() => {
    if (this.users[userId]) {
      delete this.users[userId];
      if (callback) {
        callback(null, true);
      }
    } else {
      if (callback) {
        callback("Benutzer nicht gefunden.", null);
      }
    }
  }, 1000); // 1 Sekunde Verzögerung
};


// Funktion zum Senden von Benutzerdaten
UserDAO.prototype.sendUserData = function (callback) {
  setTimeout(() => {
    if (callback) {
      callback(null, this.users);
    }
  }, 1000); // 1 Sekunde Verzögerung
};


// Beispiel für die Verwendung des UserDAO
// Instanziieren des UserDAO
const userDao = new UserDAO();


// Beispiel: Hinzufügen eines Benutzers
const newUser = { id: 1, name: "John Doe" };
userDao.addUser(newUser, (error, user) => {
  if (error) {
    console.error("Fehler beim Hinzufügen des Benutzers:", error);
  } else {
    console.log("Benutzer hinzugefügt:", user);
  }
});


// Beispiel: Löschen eines Benutzers
const userIdToDelete = 1;
userDao.deleteUser(userIdToDelete, (error, success) => {
  if (error) {
    console.error("Fehler beim Löschen des Benutzers:", error);
  } else {
    console.log("Benutzer erfolgreich gelöscht:", success);
  }
});


// Beispiel: Senden von Benutzerdaten
userDao.sendUserData((error, users) => {
  if (error) {
    console.error("Fehler beim Senden von Benutzerdaten:", error);
  } else {
    console.log("Benutzerdaten gesendet:", users);
  }
});


/*
UserDAO.prototype.sendUserData = function (callback) {
  console.log("RegistryInformations is send!");
  console.log(user);
  loadDoc("post", this.baseUrl, user, callback);
  console.log(user);
};*/