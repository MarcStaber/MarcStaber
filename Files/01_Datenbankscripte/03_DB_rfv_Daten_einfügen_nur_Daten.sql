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

-- Exportiere Daten aus Tabelle rfv.address_lookup: ~0 rows (ungefähr)

-- Exportiere Daten aus Tabelle rfv.club_data: ~9 rows (ungefähr)
INSERT INTO `club_data` (`id`, `significance`, `characteristic`) VALUES
	(1, 'Vereinsname', 'TC Neudauberg'),
	(2, 'Postleitzahl', '7574'),
	(3, 'Ort', 'Neudauberg'),
	(4, 'Straße', 'Thermenstraße'),
	(5, 'Hausnummer', '36'),
	(6, 'Telefonnummer', '06641251195'),
	(7, 'E-Mail', 'vorstand@tc-neudauberg.at'),
	(8, 'Webseite', 'www.tc-neudauberg.at'),
	(9, 'max_reservierungs_minuten', '120');

-- Exportiere Daten aus Tabelle rfv.court: ~2 rows (ungefähr)
INSERT INTO `court` (`court_id`, `court`) VALUES
	(1, 'Platz 1'),
	(2, 'Platz 2');

-- Exportiere Daten aus Tabelle rfv.court_reservation: ~3 rows (ungefähr)
INSERT INTO `court_reservation` (`reservation_number`, `user_id`, `court_id`, `date_time_from`, `date_time_to`, `reservation_type_id`, `notice`, `cancele_datetime`) VALUES
	(7, 1, 1, '2024-03-17 15:00:00', '2024-03-17 16:00:00', 1, NULL, NULL),
	(11, 1, 1, '2024-03-20 14:00:00', '2024-03-20 15:00:00', 1, NULL, NULL),
	(12, 1, 1, '2024-03-21 10:00:00', '2024-03-21 11:00:00', 1, NULL, NULL);

-- Exportiere Daten aus Tabelle rfv.reservation_type: ~5 rows (ungefähr)
INSERT INTO `reservation_type` (`reservation_type_id`, `reservation_type`, `admin_rights`) VALUES
	(1, 'Training', 1),
	(2, 'Normale Reserverierung', 0),
	(3, 'Turnier', 1),
	(4, 'Freundschaftsspiel', 1),
	(5, 'Gesperrt', 1);

-- Exportiere Daten aus Tabelle rfv.role: ~5 rows (ungefähr)
INSERT INTO `role` (`role_id`, `role`) VALUES
	(1, 'Administrator'),
	(2, 'Platzwart'),
	(3, 'Mitglied'),
	(4, 'Gast'),
	(5, 'Neuer Benutzer');

-- Exportiere Daten aus Tabelle rfv.user: ~3 rows (ungefähr)
INSERT INTO `user` (`user_id`, `email_address`, `first_name`, `last_name`, `password`, `count_of_false_logins`, `blocked_date`, `member_date`, `telephone_number`, `role_id`, `street`, `house_number`, `zip_code`, `city`, `country`) VALUES
	(1, 'max.mustermann@mustermail.com', 'Max', 'Mustermann', 'muster123', 0, NULL, NULL, '66412345678', 3, 'Musterstraße', '1', 1234, 'Musterstadt', 'Musterland'),
	(2, 'maxima.mustermann@mustermail.com', 'Maxima', 'Mustermann', 'muster456', 0, NULL, NULL, '66423456789', 3, 'Mustergasse', '2', 4567, 'Musterstadt', 'Musterland'),
	(3, 'marc.staber@htlpinkafeld.at', 'Marc', 'Staber', 'password', 0, NULL, NULL, '68012345678', 2, 'Musterplatz', '1', 4321, 'Musterdorf', 'Österreich');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
