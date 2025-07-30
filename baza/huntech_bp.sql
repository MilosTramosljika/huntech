-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: huntech_bp
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aktivnost_divljaci`
--

DROP TABLE IF EXISTS `aktivnost_divljaci`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aktivnost_divljaci` (
  `IdAktivnostiDivljaci` int NOT NULL AUTO_INCREMENT,
  `IdGrupe` int NOT NULL,
  `tip` tinytext NOT NULL,
  `Putanja` varchar(400) NOT NULL,
  PRIMARY KEY (`IdAktivnostiDivljaci`),
  KEY `fk_AKTIVNOST_DIVLJACI_GRUPA1_idx` (`IdGrupe`),
  CONSTRAINT `fk_AKTIVNOST_DIVLJACI_GRUPA1` FOREIGN KEY (`IdGrupe`) REFERENCES `grupa` (`IdGrupe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aktivnost_divljaci`
--

LOCK TABLES `aktivnost_divljaci` WRITE;
/*!40000 ALTER TABLE `aktivnost_divljaci` DISABLE KEYS */;
/*!40000 ALTER TABLE `aktivnost_divljaci` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupa`
--

DROP TABLE IF EXISTS `grupa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupa` (
  `IdGrupe` int NOT NULL AUTO_INCREMENT,
  `NazivGrupe` varchar(100) NOT NULL,
  `Opis` varchar(500) NOT NULL,
  `slika` varbinary(255) NOT NULL,
  PRIMARY KEY (`IdGrupe`),
  UNIQUE KEY `NazivGrupe_UNIQUE` (`NazivGrupe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupa`
--

LOCK TABLES `grupa` WRITE;
/*!40000 ALTER TABLE `grupa` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `k_has_zar`
--

DROP TABLE IF EXISTS `k_has_zar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `k_has_zar` (
  `IdKHZAR` int NOT NULL AUTO_INCREMENT,
  `IdKorisnika` int NOT NULL,
  `IdZahtjeva` int NOT NULL,
  PRIMARY KEY (`IdKHZAR`),
  KEY `fk_KORISNIK_has_ZAHTJEV_ZA_REGISTRACIJU_ZAHTJEV_ZA_REGISTRA_idx` (`IdZahtjeva`),
  KEY `fk_KORISNIK_has_ZAHTJEV_ZA_REGISTRACIJU_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_ZAHTJEV_ZA_REGISTRACIJU_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_ZAHTJEV_ZA_REGISTRACIJU_ZAHTJEV_ZA_REGISTRACI1` FOREIGN KEY (`IdZahtjeva`) REFERENCES `zahtjev_za_registraciju` (`IdZahtjeva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `k_has_zar`
--

LOCK TABLES `k_has_zar` WRITE;
/*!40000 ALTER TABLE `k_has_zar` DISABLE KEYS */;
/*!40000 ALTER TABLE `k_has_zar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `k_has_zzps`
--

DROP TABLE IF EXISTS `k_has_zzps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `k_has_zzps` (
  `IdKorisnika` int NOT NULL,
  `IdZahtjevaZaPromjenuStatusa` int NOT NULL,
  `DatumObrade` date DEFAULT NULL,
  `IdKHasZZPS` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`IdKHasZZPS`),
  KEY `fk_KORISNIK_has_ZAHTJEV_ZA_PROMJENU_STATUSA_ZAHTJEV_ZA_PROM_idx` (`IdZahtjevaZaPromjenuStatusa`),
  KEY `fk_KORISNIK_has_ZAHTJEV_ZA_PROMJENU_STATUSA_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_ZAHTJEV_ZA_PROMJENU_STATUSA_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_ZAHTJEV_ZA_PROMJENU_STATUSA_ZAHTJEV_ZA_PROMJE1` FOREIGN KEY (`IdZahtjevaZaPromjenuStatusa`) REFERENCES `zahtjev_za_promjenu_statusa` (`IdZahtjevaZaPromjenuStatusa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `k_has_zzps`
--

LOCK TABLES `k_has_zzps` WRITE;
/*!40000 ALTER TABLE `k_has_zzps` DISABLE KEYS */;
/*!40000 ALTER TABLE `k_has_zzps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `komentar`
--

DROP TABLE IF EXISTS `komentar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `komentar` (
  `IdKomentara` int NOT NULL AUTO_INCREMENT,
  `IdObjave` int NOT NULL,
  `Sadrzaj` varchar(400) DEFAULT NULL,
  `IdKorisnika` int NOT NULL,
  PRIMARY KEY (`IdKomentara`),
  KEY `fk_KOMENTAR_OBJAVA1_idx` (`IdObjave`),
  KEY `fk_KOMENTAR_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_KOMENTAR_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`),
  CONSTRAINT `fk_KOMENTAR_OBJAVA1` FOREIGN KEY (`IdObjave`) REFERENCES `objava` (`IdObjave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `komentar`
--

LOCK TABLES `komentar` WRITE;
/*!40000 ALTER TABLE `komentar` DISABLE KEYS */;
/*!40000 ALTER TABLE `komentar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `konverzacija`
--

DROP TABLE IF EXISTS `konverzacija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `konverzacija` (
  `IdKonverzacije` int NOT NULL AUTO_INCREMENT,
  `NazivKonverzacije` varchar(500) NOT NULL,
  `DatumKreiranja` datetime NOT NULL,
  PRIMARY KEY (`IdKonverzacije`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `konverzacija`
--

LOCK TABLES `konverzacija` WRITE;
/*!40000 ALTER TABLE `konverzacija` DISABLE KEYS */;
INSERT INTO `konverzacija` VALUES (1,'Konv1','2025-07-22 22:30:00');
/*!40000 ALTER TABLE `konverzacija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik` (
  `IdKorisnika` int NOT NULL AUTO_INCREMENT,
  `Ime` varchar(45) NOT NULL,
  `Prezime` varchar(45) NOT NULL,
  `Username` varchar(45) NOT NULL,
  `Mail` varchar(45) NOT NULL,
  `Lozinka` varchar(45) NOT NULL,
  `profilna_slika_putanja` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdKorisnika`),
  UNIQUE KEY `Nickname_UNIQUE` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (1,'Marko','Marković','marko123','marko@mail.com','markolozinka','/uploads/profilne/korisnik_1.jpg');
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik_has_grupa`
--

DROP TABLE IF EXISTS `korisnik_has_grupa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik_has_grupa` (
  `IdKHG` int NOT NULL AUTO_INCREMENT,
  `IdKorisnika` int NOT NULL,
  `IdGrupe` int NOT NULL,
  `StatusZaClanstvo` tinytext NOT NULL,
  `DatumUclanjivanja` date DEFAULT NULL,
  `TipZahtjeva` tinytext NOT NULL,
  PRIMARY KEY (`IdKHG`),
  KEY `fk_KORISNIK_has_GRUPA_GRUPA1_idx` (`IdGrupe`),
  KEY `fk_KORISNIK_has_GRUPA_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_GRUPA_GRUPA1` FOREIGN KEY (`IdGrupe`) REFERENCES `grupa` (`IdGrupe`),
  CONSTRAINT `fk_KORISNIK_has_GRUPA_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik_has_grupa`
--

LOCK TABLES `korisnik_has_grupa` WRITE;
/*!40000 ALTER TABLE `korisnik_has_grupa` DISABLE KEYS */;
/*!40000 ALTER TABLE `korisnik_has_grupa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik_has_konverzacija`
--

DROP TABLE IF EXISTS `korisnik_has_konverzacija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik_has_konverzacija` (
  `IdKorisnika` int NOT NULL,
  `IdKonverzacije` int NOT NULL,
  `IdKHK` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`IdKHK`),
  KEY `fk_KORISNIK_has_KONVERZACIJA_KONVERZACIJA1_idx` (`IdKonverzacije`),
  KEY `fk_KORISNIK_has_KONVERZACIJA_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_KONVERZACIJA_KONVERZACIJA1` FOREIGN KEY (`IdKonverzacije`) REFERENCES `konverzacija` (`IdKonverzacije`),
  CONSTRAINT `fk_KORISNIK_has_KONVERZACIJA_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik_has_konverzacija`
--

LOCK TABLES `korisnik_has_konverzacija` WRITE;
/*!40000 ALTER TABLE `korisnik_has_konverzacija` DISABLE KEYS */;
/*!40000 ALTER TABLE `korisnik_has_konverzacija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik_has_prijava`
--

DROP TABLE IF EXISTS `korisnik_has_prijava`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik_has_prijava` (
  `IdKHP` int NOT NULL AUTO_INCREMENT,
  `IdKorisnika` int NOT NULL,
  `IdPrijave` int NOT NULL,
  PRIMARY KEY (`IdKHP`),
  KEY `fk_KORISNIK_has_PRIJAVA_PRIJAVA1_idx` (`IdPrijave`),
  KEY `fk_KORISNIK_has_PRIJAVA_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_PRIJAVA_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_PRIJAVA_PRIJAVA1` FOREIGN KEY (`IdPrijave`) REFERENCES `prijava` (`IdPrijave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik_has_prijava`
--

LOCK TABLES `korisnik_has_prijava` WRITE;
/*!40000 ALTER TABLE `korisnik_has_prijava` DISABLE KEYS */;
/*!40000 ALTER TABLE `korisnik_has_prijava` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik_has_uloga`
--

DROP TABLE IF EXISTS `korisnik_has_uloga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik_has_uloga` (
  `IdKHU` int NOT NULL AUTO_INCREMENT,
  `IdKorisnika` int NOT NULL,
  `IdUloge` int NOT NULL,
  `DatumDobijanjaUloge` date NOT NULL,
  PRIMARY KEY (`IdKHU`),
  KEY `fk_KORISNIK_has_ULOGA_ULOGA1_idx` (`IdUloge`),
  KEY `fk_KORISNIK_has_ULOGA_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_ULOGA_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`),
  CONSTRAINT `fk_KORISNIK_has_ULOGA_ULOGA1` FOREIGN KEY (`IdUloge`) REFERENCES `uloga` (`IdUloge`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik_has_uloga`
--

LOCK TABLES `korisnik_has_uloga` WRITE;
/*!40000 ALTER TABLE `korisnik_has_uloga` DISABLE KEYS */;
/*!40000 ALTER TABLE `korisnik_has_uloga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lokacija`
--

DROP TABLE IF EXISTS `lokacija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lokacija` (
  `IdLokacije` int NOT NULL AUTO_INCREMENT,
  `IdGrupe` int NOT NULL,
  `GeografskaSirina` double NOT NULL,
  `GeografskaDuzina` double NOT NULL,
  PRIMARY KEY (`IdLokacije`),
  KEY `fk_LOKACIJA_GRUPA1` (`IdGrupe`),
  CONSTRAINT `fk_LOKACIJA_GRUPA1` FOREIGN KEY (`IdGrupe`) REFERENCES `grupa` (`IdGrupe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lokacija`
--

LOCK TABLES `lokacija` WRITE;
/*!40000 ALTER TABLE `lokacija` DISABLE KEYS */;
/*!40000 ALTER TABLE `lokacija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obavjestenja`
--

DROP TABLE IF EXISTS `obavjestenja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obavjestenja` (
  `IdObavjestenja` int NOT NULL AUTO_INCREMENT,
  `IdKorisnika` int NOT NULL,
  `Sadrzaj` varchar(500) DEFAULT NULL,
  `TipObavjestenja` enum('sistemskePromjene','prihvatanjeZahtjeva','prihvatanjePrijave','specijalniDogadjaj') DEFAULT NULL,
  PRIMARY KEY (`IdObavjestenja`),
  KEY `fk_OBAVJESTENJA_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_OBAVJESTENJA_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obavjestenja`
--

LOCK TABLES `obavjestenja` WRITE;
/*!40000 ALTER TABLE `obavjestenja` DISABLE KEYS */;
INSERT INTO `obavjestenja` VALUES (3,1,'Novo obavještenje','prihvatanjeZahtjeva'),(4,1,'Kolegino obavještenje','prihvatanjeZahtjeva'),(5,1,'Kolegino2 obavjestenje','prihvatanjePrijave');
/*!40000 ALTER TABLE `obavjestenja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objava`
--

DROP TABLE IF EXISTS `objava`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objava` (
  `IdObjave` int NOT NULL AUTO_INCREMENT,
  `IdGrupe` int NOT NULL,
  `IdKorisnika` int NOT NULL,
  `TipObjave` tinytext NOT NULL,
  `DatumObjavljivanja` date NOT NULL,
  `Lajk` int NOT NULL,
  `Dislajk` int NOT NULL,
  PRIMARY KEY (`IdObjave`),
  KEY `fk_OBJAVA_GRUPA1_idx` (`IdGrupe`),
  KEY `fk_OBJAVA_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_OBJAVA_GRUPA1` FOREIGN KEY (`IdGrupe`) REFERENCES `grupa` (`IdGrupe`),
  CONSTRAINT `fk_OBJAVA_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objava`
--

LOCK TABLES `objava` WRITE;
/*!40000 ALTER TABLE `objava` DISABLE KEYS */;
/*!40000 ALTER TABLE `objava` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objava_na_lovacki_dnevnik`
--

DROP TABLE IF EXISTS `objava_na_lovacki_dnevnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objava_na_lovacki_dnevnik` (
  `IdObjaveNaLD` int NOT NULL AUTO_INCREMENT,
  `Datum` datetime NOT NULL,
  `Sadrzaj` varchar(400) NOT NULL,
  `IdKorisnika` int NOT NULL,
  PRIMARY KEY (`IdObjaveNaLD`),
  KEY `fk_OBJAVA_NA_LOVACKI_DNEVNIK_KORISNIK1_idx` (`IdKorisnika`),
  CONSTRAINT `fk_OBJAVA_NA_LOVACKI_DNEVNIK_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objava_na_lovacki_dnevnik`
--

LOCK TABLES `objava_na_lovacki_dnevnik` WRITE;
/*!40000 ALTER TABLE `objava_na_lovacki_dnevnik` DISABLE KEYS */;
/*!40000 ALTER TABLE `objava_na_lovacki_dnevnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `podkomentar`
--

DROP TABLE IF EXISTS `podkomentar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `podkomentar` (
  `IdPodkomentara` int NOT NULL AUTO_INCREMENT,
  `Sadrzaj` varchar(400) NOT NULL,
  `IdKomentara` int NOT NULL,
  PRIMARY KEY (`IdPodkomentara`),
  KEY `fk_PODKOMENTAR_KOMENTAR1` (`IdKomentara`),
  CONSTRAINT `fk_PODKOMENTAR_KOMENTAR1` FOREIGN KEY (`IdKomentara`) REFERENCES `komentar` (`IdKomentara`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `podkomentar`
--

LOCK TABLES `podkomentar` WRITE;
/*!40000 ALTER TABLE `podkomentar` DISABLE KEYS */;
/*!40000 ALTER TABLE `podkomentar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poruka`
--

DROP TABLE IF EXISTS `poruka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poruka` (
  `IdPoruke` int NOT NULL AUTO_INCREMENT,
  `Sadrzaj` varchar(500) NOT NULL,
  `DatumSlanja` datetime NOT NULL,
  `IdKorisnika` int NOT NULL,
  `IdKonverzacije` int NOT NULL,
  PRIMARY KEY (`IdPoruke`),
  KEY `fk_PORUKA_KORISNIK1_idx` (`IdKorisnika`),
  KEY `fk_PORUKA_KONVERZACIJA1_idx` (`IdKonverzacije`),
  CONSTRAINT `fk_PORUKA_KONVERZACIJA1` FOREIGN KEY (`IdKonverzacije`) REFERENCES `konverzacija` (`IdKonverzacije`),
  CONSTRAINT `fk_PORUKA_KORISNIK1` FOREIGN KEY (`IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poruka`
--

LOCK TABLES `poruka` WRITE;
/*!40000 ALTER TABLE `poruka` DISABLE KEYS */;
INSERT INTO `poruka` VALUES (3,'Test poruka','2025-07-22 22:30:00',1,1);
/*!40000 ALTER TABLE `poruka` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prijava`
--

DROP TABLE IF EXISTS `prijava`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prijava` (
  `IdPrijave` int NOT NULL AUTO_INCREMENT,
  `IdKorisnikaKojiPrijavljuje` int NOT NULL,
  `DatumPrijave` timestamp NOT NULL,
  `Obrazlozenje` varchar(500) NOT NULL,
  `TipPrijave` tinytext,
  PRIMARY KEY (`IdPrijave`),
  KEY `fk_PRIJAVA_KORISNIK1_idx` (`IdKorisnikaKojiPrijavljuje`),
  CONSTRAINT `fk_PRIJAVA_KORISNIK1` FOREIGN KEY (`IdKorisnikaKojiPrijavljuje`) REFERENCES `korisnik` (`IdKorisnika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prijava`
--

LOCK TABLES `prijava` WRITE;
/*!40000 ALTER TABLE `prijava` DISABLE KEYS */;
/*!40000 ALTER TABLE `prijava` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slika_za_objavu`
--

DROP TABLE IF EXISTS `slika_za_objavu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slika_za_objavu` (
  `IdSlikeZaObjavu` int NOT NULL AUTO_INCREMENT,
  `IdObjave` int NOT NULL,
  `Slika` varchar(500) NOT NULL,
  PRIMARY KEY (`IdSlikeZaObjavu`),
  KEY `fk_SLIKA_ZA_OBJAVU_OBJAVA1` (`IdObjave`),
  CONSTRAINT `fk_SLIKA_ZA_OBJAVU_OBJAVA1` FOREIGN KEY (`IdObjave`) REFERENCES `objava` (`IdObjave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slika_za_objavu`
--

LOCK TABLES `slika_za_objavu` WRITE;
/*!40000 ALTER TABLE `slika_za_objavu` DISABLE KEYS */;
/*!40000 ALTER TABLE `slika_za_objavu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slika_za_objavu_na_ld`
--

DROP TABLE IF EXISTS `slika_za_objavu_na_ld`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slika_za_objavu_na_ld` (
  `IdSlikeZaObjavuNaLD` int NOT NULL AUTO_INCREMENT,
  `Datum` datetime NOT NULL,
  `Slika` varchar(500) NOT NULL,
  `IdObjaveNaLD` int NOT NULL,
  PRIMARY KEY (`IdSlikeZaObjavuNaLD`),
  KEY `fk_SLIKA_ZA_OBJAVU_NA_LD_OBJAVA_NA_LOVACKI_DNEVNIK1_idx` (`IdObjaveNaLD`),
  CONSTRAINT `fk_SLIKA_ZA_OBJAVU_NA_LD_OBJAVA_NA_LOVACKI_DNEVNIK1` FOREIGN KEY (`IdObjaveNaLD`) REFERENCES `objava_na_lovacki_dnevnik` (`IdObjaveNaLD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slika_za_objavu_na_ld`
--

LOCK TABLES `slika_za_objavu_na_ld` WRITE;
/*!40000 ALTER TABLE `slika_za_objavu_na_ld` DISABLE KEYS */;
/*!40000 ALTER TABLE `slika_za_objavu_na_ld` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uloga`
--

DROP TABLE IF EXISTS `uloga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uloga` (
  `IdUloge` int NOT NULL AUTO_INCREMENT,
  `NazivUloge` tinytext NOT NULL,
  PRIMARY KEY (`IdUloge`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uloga`
--

LOCK TABLES `uloga` WRITE;
/*!40000 ALTER TABLE `uloga` DISABLE KEYS */;
/*!40000 ALTER TABLE `uloga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zahtjev_za_promjenu_statusa`
--

DROP TABLE IF EXISTS `zahtjev_za_promjenu_statusa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zahtjev_za_promjenu_statusa` (
  `IdZahtjevaZaPromjenuStatusa` int NOT NULL AUTO_INCREMENT,
  `KORISNIK_IdKorisnika` int NOT NULL,
  `Obrazlozenje` varchar(400) DEFAULT NULL,
  `DatumPodnosenja` date NOT NULL,
  PRIMARY KEY (`IdZahtjevaZaPromjenuStatusa`),
  KEY `fk_ZAHTJEV_ZA_PROMJENU_STATUSA_KORISNIK1_idx` (`KORISNIK_IdKorisnika`),
  CONSTRAINT `fk_ZAHTJEV_ZA_PROMJENU_STATUSA_KORISNIK1` FOREIGN KEY (`KORISNIK_IdKorisnika`) REFERENCES `korisnik` (`IdKorisnika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zahtjev_za_promjenu_statusa`
--

LOCK TABLES `zahtjev_za_promjenu_statusa` WRITE;
/*!40000 ALTER TABLE `zahtjev_za_promjenu_statusa` DISABLE KEYS */;
/*!40000 ALTER TABLE `zahtjev_za_promjenu_statusa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zahtjev_za_registraciju`
--

DROP TABLE IF EXISTS `zahtjev_za_registraciju`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zahtjev_za_registraciju` (
  `IdZahtjeva` int NOT NULL AUTO_INCREMENT,
  `urlPdfDokumenta` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`IdZahtjeva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zahtjev_za_registraciju`
--

LOCK TABLES `zahtjev_za_registraciju` WRITE;
/*!40000 ALTER TABLE `zahtjev_za_registraciju` DISABLE KEYS */;
/*!40000 ALTER TABLE `zahtjev_za_registraciju` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-30 19:00:04
