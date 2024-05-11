-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               11.4.0-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Exportiere Datenbank Struktur für rfv
CREATE DATABASE IF NOT EXISTS `rfv` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `rfv`;

-- Exportiere Struktur von Tabelle rfv.address_lookup
CREATE TABLE IF NOT EXISTS `address_lookup` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `street` varchar(100) NOT NULL COMMENT 'Straße',
  `zip_code` int(8) NOT NULL COMMENT 'Postleitzahl',
  `city` varchar(100) NOT NULL COMMENT 'Ort',
  `country` varchar(100) NOT NULL COMMENT 'Land',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='AdresseLookup';

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von View rfv.booked_hours
-- Erstelle temporäre Tabelle um View Abhängigkeiten zuvorzukommen
CREATE TABLE `booked_hours` (
	`user_id` INT(11) NOT NULL COMMENT 'BenutzerID',
	`year` INT(4) NULL,
	`week_of_year` INT(2) NULL,
	`hours` DECIMAL(42,0) NULL
) ENGINE=MyISAM;

-- Exportiere Struktur von Tabelle rfv.club_data
CREATE TABLE IF NOT EXISTS `club_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID - primary key',
  `significance` varchar(100) NOT NULL COMMENT 'Bedeutung',
  `characteristic` varchar(100) NOT NULL COMMENT 'AusprÃ¤gung',
  PRIMARY KEY (`id`),
  UNIQUE KEY `significance` (`significance`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Vereinsdaten';

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle rfv.court
CREATE TABLE IF NOT EXISTS `court` (
  `court_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PlatzID - primary key',
  `court` varchar(50) NOT NULL COMMENT 'Platz',
  PRIMARY KEY (`court_id`),
  UNIQUE KEY `court` (`court`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Platz';

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle rfv.court_reservation
CREATE TABLE IF NOT EXISTS `court_reservation` (
  `reservation_number` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Reservierungsnummer',
  `user_id` int(11) NOT NULL COMMENT 'BenutzerID',
  `court_id` int(11) NOT NULL COMMENT 'PlatzID',
  `date_time_from` datetime NOT NULL COMMENT 'DatumZeitAb',
  `date_time_to` datetime NOT NULL COMMENT 'DatumZeitBis',
  `reservation_type_id` int(11) NOT NULL COMMENT 'ReservierungsartID',
  `notice` varchar(2000) DEFAULT NULL COMMENT 'Bemerkung',
  `cancele_datetime` datetime DEFAULT NULL COMMENT 'Storniert als Datum und Zeit',
  PRIMARY KEY (`reservation_number`),
  KEY `FK_court_reservation_court` (`court_id`),
  KEY `FK_court_reservation_user` (`user_id`),
  KEY `FK_court_reservation_reservation_type` (`reservation_type_id`),
  CONSTRAINT `FK_court_reservation_court` FOREIGN KEY (`court_id`) REFERENCES `court` (`court_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_court_reservation_reservation_type` FOREIGN KEY (`reservation_type_id`) REFERENCES `reservation_type` (`reservation_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_court_reservation_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Platzereservierung';

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle rfv.reservation_type
CREATE TABLE IF NOT EXISTS `reservation_type` (
  `reservation_type_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ReservierungsartID',
  `reservation_type` varchar(50) NOT NULL COMMENT 'ReservierungsartID',
  `admin_rights` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Adminberechtigung - J/N-Abfrage',
  PRIMARY KEY (`reservation_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Reservierungsart';

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle rfv.role
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'RollenID',
  `role` varchar(50) NOT NULL COMMENT 'Rolle',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Rolle';

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle rfv.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'BenutzerID',
  `email_address` varchar(100) NOT NULL COMMENT 'Mailadresse',
  `first_name` varchar(50) NOT NULL COMMENT 'Vorname',
  `last_name` varchar(50) NOT NULL COMMENT 'Nachname',
  `password` varchar(50) NOT NULL COMMENT 'Passwort',
  `count_of_false_logins` int(11) NOT NULL DEFAULT 0 COMMENT 'Anzahl Falschanmeldungen',
  `blocked_date` datetime DEFAULT NULL COMMENT 'Gesperrtdatum',
  `member_date` date DEFAULT NULL COMMENT 'MitgliedSeit (Null = kein Mitglied)',
  `telephone_number` varchar(50) NOT NULL COMMENT 'Telefonnummer',
  `role_id` int(11) NOT NULL COMMENT 'RollenID',
  `street` varchar(100) NOT NULL COMMENT 'Straße',
  `house_number` varchar(10) NOT NULL COMMENT 'Hausnummer',
  `zip_code` int(8) NOT NULL COMMENT 'Postleitzahl',
  `city` varchar(100) NOT NULL COMMENT 'Ort',
  `country` varchar(100) NOT NULL COMMENT 'Land',
  PRIMARY KEY (`user_id`)
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Benutzer';

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Trigger rfv.court_reservation_before_insert_trigger
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER court_reservation_before_insert_trigger
   BEFORE INSERT 
   ON court_reservation 
   FOR EACH ROW
BEGIN
   DECLARE v_booked_minutes INT;
   DECLARE v_new_minutes INT;
    DECLARE v_max_minutes INT;

   
    -- Lese Anz. Minuten von der aktuellen INSERT-Anweisung
   SELECT TIMESTAMPDIFF(MINUTE, NEW.date_time_from, NEW.date_time_to) INTO v_new_minutes;

    -- FEHLER, wenn Anzahl Minuten kleiner oder gleich 0 ist
    IF (v_new_minutes <= 0) THEN
      SIGNAL SQLSTATE '02100' SET MESSAGE_TEXT = 'Ungueltige Zeitangabe. Bitte pruefen Sie Start- und Endzeit.';
   END IF;


   -- Lese maximale Anzahl der Minuten aus Tabelle club_data
   SELECT CAST(characteristic AS INT) 
       INTO v_max_minutes 
      FROM club_data 
        WHERE significance = 'max_reservierungs_minuten';
 
    -- FEHLER, wenn mehr Minuten im INSERT angegeben als maximal erlaubt
    IF (v_new_minutes > v_max_minutes) THEN
      SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT = 'Maximale Reservierungszeit der Woche ueberschritten.';
   END IF;


 
    -- Lese bereits reservierte (in der DB gespeicherte) Minuten
   SELECT IFNULL(SUM(TIMESTAMPDIFF(MINUTE, date_time_from, date_time_to)), 0)
       INTO v_booked_minutes 
    FROM court_reservation
       WHERE user_id = NEW.user_id 
       AND YEAR(date_time_from) = YEAR(NEW.date_time_from)
       AND WEEKOFYEAR(date_time_from) = WEEKOFYEAR(NEW.date_time_from);

    -- FEHLER, wenn bereits reservierte Minuten kleiner 0 ist
    IF (v_booked_minutes < 0) THEN
      SIGNAL SQLSTATE '02100' SET MESSAGE_TEXT = 'Fehler bei den bereits gespeicherten Reservierungen. Bitte kontaktieren Sie den Administrator.';
   END IF;
    
    -- FEHLER, wenn Summe bereits reservierte Minuten und neue Minuten größer als Max 
    IF ((v_booked_minutes + v_new_minutes) > v_max_minutes) THEN
      SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT = 'Maximale Reservierungszeit der Woche ueberschritten';
   END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Exportiere Struktur von View rfv.booked_hours
-- Entferne temporäre Tabelle und erstelle die eigentliche View
DROP TABLE IF EXISTS `booked_hours`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `booked_hours` AS SELECT  
    user_id, 
    YEAR(date_time_from) AS year, 
    WEEKOFYEAR(date_time_from) AS week_of_year, 
    SUM(TIMESTAMPDIFF(HOUR, date_time_from, date_time_to))AS hours
FROM court_reservation
GROUP BY user_id, YEAR(date_time_from), WEEKOFYEAR(date_time_from) ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
