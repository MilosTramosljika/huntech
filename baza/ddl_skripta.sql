-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema HUNTECH_BP
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema HUNTECH_BP
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `HUNTECH_BP` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema chat_system
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema chat_system
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chat_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `HUNTECH_BP` ;

-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`GRUPA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`GRUPA` (
  `IdGrupe` INT NOT NULL AUTO_INCREMENT,
  `NazivGrupe` VARCHAR(100) NOT NULL,
  `Opis` VARCHAR(500) NOT NULL,
  `Slika` BLOB NOT NULL,
  PRIMARY KEY (`IdGrupe`),
  UNIQUE INDEX `NazivGrupe_UNIQUE` (`NazivGrupe` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`KORISNIK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`KORISNIK` (
  `IdKorisnika` INT NOT NULL AUTO_INCREMENT,
  `Ime` VARCHAR(45) NOT NULL,
  `Prezime` VARCHAR(45) NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  `Mail` VARCHAR(45) NOT NULL,
  `Lozinka` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`IdKorisnika`),
  UNIQUE INDEX `Nickname_UNIQUE` (`Username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`OBJAVA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`OBJAVA` (
  `IdObjave` INT NOT NULL AUTO_INCREMENT,
  `IdGrupe` INT NOT NULL,
  `IdKorisnika` INT NOT NULL,
  `TipObjave` ENUM('OBICNA', 'DOGADJAJ', 'SPECDOGADJAJ') NOT NULL,
  `DatumObjavljivanja` DATE NOT NULL,
  `Lajk` INT NOT NULL,
  `Dislajk` INT NOT NULL,
  PRIMARY KEY (`IdObjave`),
  INDEX `fk_OBJAVA_GRUPA1_idx` (`IdGrupe` ASC) VISIBLE,
  INDEX `fk_OBJAVA_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  CONSTRAINT `fk_OBJAVA_GRUPA1`
    FOREIGN KEY (`IdGrupe`)
    REFERENCES `HUNTECH_BP`.`GRUPA` (`IdGrupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OBJAVA_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`KORISNIK_HAS_GRUPA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`KORISNIK_HAS_GRUPA` (
  `IdKHG` INT NOT NULL AUTO_INCREMENT,
  `IdKorisnika` INT NOT NULL,
  `IdGrupe` INT NOT NULL,
  `StatusZaClanstvo` ENUM('poslat', 'prihvacen', 'odbijen') NOT NULL,
  `DatumUclanjivanja` DATE NULL,
  `TipZahtjeva` ENUM('pristup', 'poziv') NOT NULL,
  PRIMARY KEY (`IdKHG`),
  INDEX `fk_KORISNIK_has_GRUPA_GRUPA1_idx` (`IdGrupe` ASC) VISIBLE,
  INDEX `fk_KORISNIK_has_GRUPA_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  CONSTRAINT `fk_KORISNIK_has_GRUPA_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KORISNIK_has_GRUPA_GRUPA1`
    FOREIGN KEY (`IdGrupe`)
    REFERENCES `HUNTECH_BP`.`GRUPA` (`IdGrupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`ULOGA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`ULOGA` (
  `IdUloge` INT NOT NULL AUTO_INCREMENT,
  `NazivUloge` ENUM('LOVAC', 'DLU', 'DMZ', 'ADMIN') NOT NULL,
  PRIMARY KEY (`IdUloge`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`KORISNIK_HAS_ULOGA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`KORISNIK_HAS_ULOGA` (
  `KORISNIK_HAS_ULOGAcol` INT NOT NULL AUTO_INCREMENT,
  `IdKorisnika` INT NOT NULL,
  `IdUloge` INT NOT NULL,
  `DatumDobijanjaUloge` DATE NOT NULL,
  `IdKHU` VARCHAR(45) NULL,
  INDEX `fk_KORISNIK_has_ULOGA_ULOGA1_idx` (`IdUloge` ASC) VISIBLE,
  INDEX `fk_KORISNIK_has_ULOGA_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  PRIMARY KEY (`KORISNIK_HAS_ULOGAcol`),
  CONSTRAINT `fk_KORISNIK_has_ULOGA_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KORISNIK_has_ULOGA_ULOGA1`
    FOREIGN KEY (`IdUloge`)
    REFERENCES `HUNTECH_BP`.`ULOGA` (`IdUloge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`ZAHTJEV_ZA_REGISTRACIJU`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`ZAHTJEV_ZA_REGISTRACIJU` (
  `IdZahtjeva` INT NOT NULL AUTO_INCREMENT,
  `urlPdfDokumenta` VARCHAR(45) NULL,
  PRIMARY KEY (`IdZahtjeva`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`KOMENTAR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`KOMENTAR` (
  `IdKomentara` INT NOT NULL AUTO_INCREMENT,
  `IdObjave` INT NOT NULL,
  `Sadrzaj` VARCHAR(400) NULL,
  `IdKorisnika` INT NOT NULL,
  PRIMARY KEY (`IdKomentara`),
  INDEX `fk_KOMENTAR_OBJAVA1_idx` (`IdObjave` ASC) VISIBLE,
  INDEX `fk_KOMENTAR_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  CONSTRAINT `fk_KOMENTAR_OBJAVA1`
    FOREIGN KEY (`IdObjave`)
    REFERENCES `HUNTECH_BP`.`OBJAVA` (`IdObjave`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KOMENTAR_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`PODKOMENTAR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`PODKOMENTAR` (
  `IdPodkomentara` INT NOT NULL AUTO_INCREMENT,
  `Sadrzaj` VARCHAR(400) NOT NULL,
  `IdKomentara` INT NOT NULL,
  PRIMARY KEY (`IdPodkomentara`),
  CONSTRAINT `fk_PODKOMENTAR_KOMENTAR1`
    FOREIGN KEY (`IdKomentara`)
    REFERENCES `HUNTECH_BP`.`KOMENTAR` (`IdKomentara`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`LOKACIJA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`LOKACIJA` (
  `IdLokacije` INT NOT NULL AUTO_INCREMENT,
  `IdGrupe` INT NOT NULL,
  `GeografskaSirina` DOUBLE NOT NULL,
  `GeografskaDuzina` DOUBLE NOT NULL,
  PRIMARY KEY (`IdLokacije`),
  CONSTRAINT `fk_LOKACIJA_GRUPA1`
    FOREIGN KEY (`IdGrupe`)
    REFERENCES `HUNTECH_BP`.`GRUPA` (`IdGrupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`AKTIVNOST_DIVLJACI`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`AKTIVNOST_DIVLJACI` (
  `IdAktivnostiDivljaci` INT NOT NULL AUTO_INCREMENT,
  `IdGrupe` INT NOT NULL,
  `Tip` ENUM('slika', 'video') NOT NULL,
  `Putanja` VARCHAR(400) NOT NULL,
  INDEX `fk_AKTIVNOST_DIVLJACI_GRUPA1_idx` (`IdGrupe` ASC) VISIBLE,
  PRIMARY KEY (`IdAktivnostiDivljaci`),
  CONSTRAINT `fk_AKTIVNOST_DIVLJACI_GRUPA1`
    FOREIGN KEY (`IdGrupe`)
    REFERENCES `HUNTECH_BP`.`GRUPA` (`IdGrupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`SLIKA_ZA_OBJAVU`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`SLIKA_ZA_OBJAVU` (
  `IdSlikeZaObjavu` INT NOT NULL AUTO_INCREMENT,
  `IdObjave` INT NOT NULL,
  `Slika` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`IdSlikeZaObjavu`),
  CONSTRAINT `fk_SLIKA_ZA_OBJAVU_OBJAVA1`
    FOREIGN KEY (`IdObjave`)
    REFERENCES `HUNTECH_BP`.`OBJAVA` (`IdObjave`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`K_has_ZAR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`K_has_ZAR` (
  `IdKHZAR` INT NOT NULL AUTO_INCREMENT,
  `IdKorisnika` INT NOT NULL,
  `IdZahtjeva` INT NOT NULL,
  INDEX `fk_KORISNIK_has_ZAHTJEV_ZA_REGISTRACIJU_ZAHTJEV_ZA_REGISTRA_idx` (`IdZahtjeva` ASC) VISIBLE,
  INDEX `fk_KORISNIK_has_ZAHTJEV_ZA_REGISTRACIJU_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  PRIMARY KEY (`IdKHZAR`),
  CONSTRAINT `fk_KORISNIK_has_ZAHTJEV_ZA_REGISTRACIJU_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KORISNIK_has_ZAHTJEV_ZA_REGISTRACIJU_ZAHTJEV_ZA_REGISTRACI1`
    FOREIGN KEY (`IdZahtjeva`)
    REFERENCES `HUNTECH_BP`.`ZAHTJEV_ZA_REGISTRACIJU` (`IdZahtjeva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`OBAVJESTENJA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`OBAVJESTENJA` (
  `IdObavjestenja` INT NOT NULL,
  `IdKorisnika` INT NOT NULL,
  `TipObavjestenja` ENUM('sistemskePromjene', 'prihvatanjeZahtjeva', 'prihvatanjePrijave', 'specijalniDogadjaj') NULL,
  `Sadrzaj` VARCHAR(500) NULL,
  INDEX `fk_OBAVJESTENJA_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  PRIMARY KEY (`IdObavjestenja`),
  CONSTRAINT `fk_OBAVJESTENJA_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`OBJAVA_NA_LOVACKI_DNEVNIK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`OBJAVA_NA_LOVACKI_DNEVNIK` (
  `IdObjaveNaLD` INT NOT NULL AUTO_INCREMENT,
  `Datum` DATETIME NOT NULL,
  `Sadrzaj` VARCHAR(400) NOT NULL,
  `IdKorisnika` INT NOT NULL,
  PRIMARY KEY (`IdObjaveNaLD`),
  INDEX `fk_OBJAVA_NA_LOVACKI_DNEVNIK_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  CONSTRAINT `fk_OBJAVA_NA_LOVACKI_DNEVNIK_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`PRIJAVA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`PRIJAVA` (
  `IdPrijave` INT NOT NULL AUTO_INCREMENT,
  `IdKorisnikaKojiPrijavljuje` INT NOT NULL,
  `DatumPrijave` TIMESTAMP NOT NULL,
  `Obrazlozenje` VARCHAR(500) NOT NULL,
  `TipPrijave` ENUM('grupa', 'objava', 'korisnik', 'komentar') NULL,
  PRIMARY KEY (`IdPrijave`),
  INDEX `fk_PRIJAVA_KORISNIK1_idx` (`IdKorisnikaKojiPrijavljuje` ASC) VISIBLE,
  CONSTRAINT `fk_PRIJAVA_KORISNIK1`
    FOREIGN KEY (`IdKorisnikaKojiPrijavljuje`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`SLIKA_ZA_OBJAVU_NA_LD`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`SLIKA_ZA_OBJAVU_NA_LD` (
  `IdSlikeZaObjavuNaLD` INT NOT NULL AUTO_INCREMENT,
  `Datum` DATETIME NOT NULL,
  `Slika` VARCHAR(500) NOT NULL,
  `IdObjaveNaLD` INT NOT NULL,
  PRIMARY KEY (`IdSlikeZaObjavuNaLD`),
  INDEX `fk_SLIKA_ZA_OBJAVU_NA_LD_OBJAVA_NA_LOVACKI_DNEVNIK1_idx` (`IdObjaveNaLD` ASC) VISIBLE,
  CONSTRAINT `fk_SLIKA_ZA_OBJAVU_NA_LD_OBJAVA_NA_LOVACKI_DNEVNIK1`
    FOREIGN KEY (`IdObjaveNaLD`)
    REFERENCES `HUNTECH_BP`.`OBJAVA_NA_LOVACKI_DNEVNIK` (`IdObjaveNaLD`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`ZAHTJEV_ZA_PROMJENU_STATUSA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`ZAHTJEV_ZA_PROMJENU_STATUSA` (
  `IdZahtjevaZaPromjenuStatusa` INT NOT NULL AUTO_INCREMENT,
  `KORISNIK_IdKorisnika` INT NOT NULL,
  `Obrazlozenje` VARCHAR(400) NULL,
  `DatumPodnosenja` DATE NOT NULL,
  PRIMARY KEY (`IdZahtjevaZaPromjenuStatusa`),
  INDEX `fk_ZAHTJEV_ZA_PROMJENU_STATUSA_KORISNIK1_idx` (`KORISNIK_IdKorisnika` ASC) VISIBLE,
  CONSTRAINT `fk_ZAHTJEV_ZA_PROMJENU_STATUSA_KORISNIK1`
    FOREIGN KEY (`KORISNIK_IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`K_has_ZZPS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`K_has_ZZPS` (
  `IdKorisnika` INT NOT NULL,
  `IdZahtjevaZaPromjenuStatusa` INT NOT NULL,
  `DatumObrade` DATE NULL,
  `IdKHasZZPS` INT NOT NULL AUTO_INCREMENT,
  INDEX `fk_KORISNIK_has_ZAHTJEV_ZA_PROMJENU_STATUSA_ZAHTJEV_ZA_PROM_idx` (`IdZahtjevaZaPromjenuStatusa` ASC) VISIBLE,
  INDEX `fk_KORISNIK_has_ZAHTJEV_ZA_PROMJENU_STATUSA_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  PRIMARY KEY (`IdKHasZZPS`),
  CONSTRAINT `fk_KORISNIK_has_ZAHTJEV_ZA_PROMJENU_STATUSA_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KORISNIK_has_ZAHTJEV_ZA_PROMJENU_STATUSA_ZAHTJEV_ZA_PROMJE1`
    FOREIGN KEY (`IdZahtjevaZaPromjenuStatusa`)
    REFERENCES `HUNTECH_BP`.`ZAHTJEV_ZA_PROMJENU_STATUSA` (`IdZahtjevaZaPromjenuStatusa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`KORISNIK_has_PRIJAVA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`KORISNIK_has_PRIJAVA` (
  `IdKHP` INT NOT NULL AUTO_INCREMENT,
  `IdKorisnika` INT NOT NULL,
  `IdPrijave` INT NOT NULL,
  INDEX `fk_KORISNIK_has_PRIJAVA_PRIJAVA1_idx` (`IdPrijave` ASC) VISIBLE,
  INDEX `fk_KORISNIK_has_PRIJAVA_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  PRIMARY KEY (`IdKHP`),
  CONSTRAINT `fk_KORISNIK_has_PRIJAVA_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KORISNIK_has_PRIJAVA_PRIJAVA1`
    FOREIGN KEY (`IdPrijave`)
    REFERENCES `HUNTECH_BP`.`PRIJAVA` (`IdPrijave`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`KONVERZACIJA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`KONVERZACIJA` (
  `IdKonverzacije` INT NOT NULL AUTO_INCREMENT,
  `NazivKonverzacije` VARCHAR(500) NOT NULL,
  `DatumKreiranja` DATETIME NOT NULL,
  PRIMARY KEY (`IdKonverzacije`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`PORUKA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`PORUKA` (
  `IdPoruke` INT NOT NULL AUTO_INCREMENT,
  `Sadrzaj` VARCHAR(500) NOT NULL,
  `DatumSlanja` DATETIME NOT NULL,
  `IdKorisnika` INT NOT NULL,
  `IdKonverzacije` INT NOT NULL,
  PRIMARY KEY (`IdPoruke`),
  INDEX `fk_PORUKA_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  INDEX `fk_PORUKA_KONVERZACIJA1_idx` (`IdKonverzacije` ASC) VISIBLE,
  CONSTRAINT `fk_PORUKA_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PORUKA_KONVERZACIJA1`
    FOREIGN KEY (`IdKonverzacije`)
    REFERENCES `HUNTECH_BP`.`KONVERZACIJA` (`IdKonverzacije`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HUNTECH_BP`.`KORISNIK_has_KONVERZACIJA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HUNTECH_BP`.`KORISNIK_has_KONVERZACIJA` (
  `IdKorisnika` INT NOT NULL,
  `IdKonverzacije` INT NOT NULL,
  `IdKHK` INT NOT NULL AUTO_INCREMENT,
  INDEX `fk_KORISNIK_has_KONVERZACIJA_KONVERZACIJA1_idx` (`IdKonverzacije` ASC) VISIBLE,
  INDEX `fk_KORISNIK_has_KONVERZACIJA_KORISNIK1_idx` (`IdKorisnika` ASC) VISIBLE,
  PRIMARY KEY (`IdKHK`),
  CONSTRAINT `fk_KORISNIK_has_KONVERZACIJA_KORISNIK1`
    FOREIGN KEY (`IdKorisnika`)
    REFERENCES `HUNTECH_BP`.`KORISNIK` (`IdKorisnika`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KORISNIK_has_KONVERZACIJA_KONVERZACIJA1`
    FOREIGN KEY (`IdKonverzacije`)
    REFERENCES `HUNTECH_BP`.`KONVERZACIJA` (`IdKonverzacije`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `chat_system` ;

-- -----------------------------------------------------
-- Table `chat_system`.`conversations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat_system`.`conversations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chat_system`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat_system`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chat_system`.`conversation_participants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat_system`.`conversation_participants` (
  `conversation_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`conversation_id`, `user_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `conversation_participants_ibfk_1`
    FOREIGN KEY (`conversation_id`)
    REFERENCES `chat_system`.`conversations` (`id`),
  CONSTRAINT `conversation_participants_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `chat_system`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chat_system`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat_system`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `conversation_id` INT NOT NULL,
  `sender_id` INT NOT NULL,
  `body` TEXT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `conversation_id` (`conversation_id` ASC) VISIBLE,
  INDEX `sender_id` (`sender_id` ASC) VISIBLE,
  CONSTRAINT `messages_ibfk_1`
    FOREIGN KEY (`conversation_id`)
    REFERENCES `chat_system`.`conversations` (`id`),
  CONSTRAINT `messages_ibfk_2`
    FOREIGN KEY (`sender_id`)
    REFERENCES `chat_system`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
