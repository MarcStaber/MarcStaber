1. Empfohlene Programme für die Entwicklung
===========================================

- vscode: https://code.visualstudio.com/
- node.js: https://nodejs.org/en/download
- mariadb: https://mariadb.org/download/
- postman: https://www.postman.com/downloads/


Weiters werden Sie die Konsole brauchen
---------------------------------------
Unter Windows heisst die Konsole "Eingabeaufforderung" und wird mit [Win] "cmd" gestartet.
Unter macOs heisst die Konsole "Terminal" und wird mit [cmd]+[space] "terminal.app" gestartet.



2. Erste Schritte im Prpojekt
=============================

2.1 Projekt laden
-----------------
Laden Sie das Projekt aus der Konsole in dem Sie im Ordner "source" folgenden Befehl eingeben:
    > code .
Oder öffnen Sie Visual Studio Code (VSCode) und über das Menü "File"->"Open Folder...".



2.2 Abhängigkeiten laden
------------------------
Um dieses Projekt zu laden laden, müssen Sie nur in der Eingabeaufforderung im Terminal mit 
    > npm install
die vorhandenen Abhängigkeiten (Dependencies) laden.

NPM in VSCode
=============
- npm install nodejs
- npm install express
- npm install -g express-generator
- npm install mariadb
- npm install dotenv
- npm install ejs

2.3 .env Konfigurations-Datei erstellen
---------------------------------------
Erstllen Sie im Root-Verzeichnis eine Datei ".env" mit folgendem Inhalt:

#SERVER CONFIG
NODE_ENV = "development"
PORT = 3000

#MARIADB CONFIG
DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PASS = "***T*o*p*S*e*c*r*e*t***"
DB_NAME = "rfv"



2.4 Server Starten
------------------
Debug-Mode: 
    > nodemon server.js

Normal:
    > node server.js

Sie können den Server mit [Strg]+[C] (oder in macOS mit [cmd]+[C]) beenden.



2.5 Webseite öffnen
-------------------
Nach dem Starten des Servers laden Sie die Webseite mit http://localhost:3000














Hier ein paar gute Links zum Starten
====================================

https://github.com/mariadb-developers/nodejs-quickstart
https://code.visualstudio.com/docs/nodejs/nodejs-tutorial
https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application#step-3-adding-the-ejs-partials-to-views


youtube

https://www.youtube.com/watch?v=344Zv2m9TYI











NPM in VSCode
=============
- npm install nodejs
- npm install express
- npm install mariadb
- npm install dotenv
- npm install nodemon
- npm install ejs

