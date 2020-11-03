-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: lagom_datenbank
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `eintrag`
--

DROP TABLE IF EXISTS `eintrag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eintrag` (
  `EintragID` int DEFAULT NULL,
  `Datum` text,
  `Titel` text,
  `Untertitel` text,
  `Text` text,
  `Notiz` text,
  `Anmerkung` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eintrag`
--

LOCK TABLES `eintrag` WRITE;
/*!40000 ALTER TABLE `eintrag` DISABLE KEYS */;
INSERT INTO `eintrag` VALUES (3001,'2020/05/01','Tag 1: MySQL Start','Schritt 1:','Zuerst muss man sich MySQL runterladen.','Beim Mac gibt es Sonderheiten.','Es macht Spaß!'),(3002,'2020/05/12','Meeting','Besprechung mit der Crew',NULL,'Auf Discord.','Pünktlich sein!'),(3003,'2020/05/11','Abgabe','Datenbanken',NULL,NULL,'Vorzeitig hochladen!'),(3004,'2022/03/01','Bachelorarbeit Abgeben','Bald durch!!!',NULL,'Bald ist es zu ende!','Durchhalten... '),(3005,'2020/05/31','Auslandsbewerbungsdeadline',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `eintrag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-06 15:26:29
