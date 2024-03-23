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


-- Exportiere Datenbank Struktur fÃ¼r rfv
/*CREATE DATABASE IF NOT EXISTS `rfv` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
/*USE `rfv`;*/

-- Exportiere Struktur von Tabelle rfv.address_lookup
CREATE TABLE IF NOT EXISTS `address_lookup` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `street` varchar(100) NOT NULL COMMENT 'StraÃŸe',
  `zip_code` int(8) NOT NULL COMMENT 'Postleitzahl',
  `town` varchar(100) NOT NULL COMMENT 'Ort',
  `country` varchar(100) NOT NULL COMMENT 'Land',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='AdresseLookup';

-- Exportiere Daten aus Tabelle rfv.address_lookup: ~0 rows (ungefÃ¤hr)
DELETE FROM `address_lookup`;

-- Exportiere Struktur von Tabelle rfv.club_data
CREATE TABLE IF NOT EXISTS `club_data` (
  `club_data_id` int(11) NOT NULL AUTO_INCREMENT, 
  `club_main_title_type` varchar(100) NULL, 
  `club_paragraph1_title_type` varchar(100) NULL, 
  `club_address` varchar(100) NULL,
  `club_email` varchar(100) NULL,
  `club_phonenumber` varchar(50) NULL,
  `club_courts` int(11) NULL,
  PRIMARY KEY (`club_data_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;  

-- Exportiere Daten aus Tabelle rfv.reservation_type: ~0 rows (ungefÃ¤hr)

-- Exportiere Daten aus Tabelle rfv.club_data: ~0 rows (ungefÃ¤hr)
DELETE FROM `club_data`;

-- Exportiere Struktur von Tabelle rfv.court
CREATE TABLE IF NOT EXISTS `court` (
  `court_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PlatzID - primary key',
  `court` varchar(50) NOT NULL COMMENT 'Platz',
  PRIMARY KEY (`court_id`),
  UNIQUE KEY `court` (`court`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Platz';

-- Exportiere Daten aus Tabelle rfv.court: ~0 rows (ungefÃ¤hr)
DELETE FROM `court`;

-- Exportiere Struktur von Tabelle rfv.court_reservation
CREATE TABLE IF NOT EXISTS `court_reservation` (
  `court_id` int(11) NOT NULL COMMENT 'PlatzID',
  `date_time_from` datetime NOT NULL COMMENT 'DatumZeitAb',
  `date_time_to` datetime NOT NULL COMMENT 'DatumZeitBis',
  `reservation_number` int(11) NOT NULL COMMENT 'Reservierungsnummer',
 -- `reservation_datetime` datetime NOT NULL COMMENT 'Rerservierungszeit', --> Wird voraussichtlich gelÃ¶scht
  `user_id` int(11) NOT NULL COMMENT 'BenutzerID',
  `reservation_type_id` int(11) NOT NULL COMMENT 'ReservierungsartID',
  `notice` varchar(2000) NOT NULL COMMENT 'Bemerkung',
  `cancele_datetime` datetime DEFAULT NULL COMMENT 'Storniert als Datum und Zeit',
  PRIMARY KEY (`court_id`,`date_time_from`,`date_time_to`,`reservation_number`),
  KEY `FK_court_reservation_reservation_type` (`reservation_type_id`),
  KEY `FK_court_reservation_user` (`user_id`),
  CONSTRAINT `FK_court_reservation_court` FOREIGN KEY (`court_id`) REFERENCES `court` (`court_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_court_reservation_reservation_type` FOREIGN KEY (`reservation_type_id`) REFERENCES `reservation_type` (`reservation_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_court_reservation_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Platzereservierung';

-- Exportiere Daten aus Tabelle rfv.court_reservation: ~0 rows (ungefÃ¤hr)
DELETE FROM `court_reservation`;

-- Exportiere Struktur von Tabelle rfv.reservation_type
CREATE TABLE IF NOT EXISTS `reservation_type` (
  `reservation_type_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ReservierungsartID',
  `reservation_type` varchar(50) NOT NULL COMMENT 'ReservierungsartID',
  `admin_rights` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Adminberechtigung - J/N-Abfrage',
  PRIMARY KEY (`reservation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Reservierungsart';

 

-- Exportiere Daten aus Tabelle rfv.reservation_type: ~0 rows (ungefÃ¤hr)
DELETE FROM `reservation_type`;

-- Exportiere Struktur von Tabelle rfv.role
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'RollenID',
  `role` varchar(50) NOT NULL COMMENT 'Rolle',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Rolle';

-- Exportiere Daten aus Tabelle rfv.role: ~0 rows (ungefÃ¤hr)
DELETE FROM `role`;

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
  `telephone_number` varchar(50) DEFAULT NULL COMMENT 'Telefonnummer',
  `role_id` int(11) DEFAULT NULL COMMENT 'RollenID',
  `street` varchar(100) DEFAULT NULL COMMENT 'StraÃŸe',
  `house_number` varchar(10) DEFAULT NULL COMMENT 'Hausnummer',
  `zip_code` int(8) DEFAULT NULL COMMENT 'Postleitzahl',
  `town` varchar(100) DEFAULT NULL COMMENT 'Ort',
  `country` varchar(100) DEFAULT NULL COMMENT 'Land',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Benutzer';

-- Exportiere Daten aus Tabelle rfv.user: ~0 rows (ungefÃ¤hr)
DELETE FROM `user`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
