CREATE TABLE `court_reservation` (
	`reservation_number` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL COMMENT 'BenutzerID',
	`court_id` INT(11) NOT NULL COMMENT 'PlatzID',
	`date_time_from` DATETIME NOT NULL COMMENT 'DatumZeitAb',
	`date_time_to` DATETIME NOT NULL COMMENT 'DatumZeitBis',
	`reservation_datetime` DATETIME NOT NULL DEFAULT current_timestamp() COMMENT 'Rerservierungszeit',
	`reservation_type_id` INT(11) NOT NULL COMMENT 'ReservierungsartID',
	`notice` VARCHAR(2000) NULL DEFAULT NULL COMMENT 'Bemerkung' COLLATE 'utf8mb4_general_ci',
	`cancel_datetime` DATETIME NULL DEFAULT NULL COMMENT 'Storniert als Datum und Zeit',
	PRIMARY KEY (`reservation_number`) USING BTREE,
	INDEX `FK_court_reservation_reservation_type` (`reservation_type_id`) USING BTREE,
	INDEX `FK_court_reservation_user` (`user_id`) USING BTREE,
	INDEX `FK_court_reservation_court` (`court_id`) USING BTREE,
	CONSTRAINT `FK_court_reservation_court` FOREIGN KEY (`court_id`) REFERENCES `court` (`court_id`) ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT `FK_court_reservation_reservation_type` FOREIGN KEY (`reservation_type_id`) REFERENCES `reservation_type` (`reservation_type_id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_court_reservation_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COMMENT='Platzereservierung'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
