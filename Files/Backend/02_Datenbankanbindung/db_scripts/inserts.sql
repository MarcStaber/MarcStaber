
INSERT INTO role (role_id, role) VALUES (1, 'Administrator');
INSERT INTO role (role_id, role) VALUES (2, 'Platzwart');
INSERT INTO role (role_id, role) VALUES (3, 'Mitglied');
INSERT INTO role (role_id, role) VALUES (4, 'Gast');
INSERT INTO role (role_id, role) VALUES (5, 'Neuer Benutzer');
SELECT * FROM role;



INSERT INTO court (court_id, court) VALUES (1, 'Platz 1');
INSERT INTO court (court_id, court) VALUES (2, 'Platz 2');
SELECT * FROM court;



INSERT INTO reservation_type (reservation_type_id, reservation_type, admin_rights) VALUES (1, 'Training', 1);
INSERT INTO reservation_type (reservation_type_id, reservation_type, admin_rights) VALUES (2, 'Normale Reservierung', 0);
INSERT INTO reservation_type (reservation_type_id, reservation_type, admin_rights) VALUES (3, 'Tournier', 1);
INSERT INTO reservation_type (reservation_type_id, reservation_type, admin_rights) VALUES (4, 'Freundschaftsspiel', 1);
INSERT INTO reservation_type (reservation_type_id, reservation_type, admin_rights) VALUES (5, 'Gesperrt', 1);
SELECT * FROM reservation_type;


