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
-- Table structure for table `bild`
--

DROP TABLE IF EXISTS `bild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bild` (
  `BildID` int DEFAULT NULL,
  `Pfad` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bild`
--

LOCK TABLES `bild` WRITE;
/*!40000 ALTER TABLE `bild` DISABLE KEYS */;
INSERT INTO `bild` VALUES (9001,'https://upload.wikimedia.org/wikipedia/commons/6/65/Will_Smith_by_Gage_Skidmore.jpg'),(9002,'https://image.gala.de/22024550/3x2-940-627/cdd9fd2c0e86266d7f0860b8429239ed/MO/jlo-teaser.jpg'),(9003,'https://i.pinimg.com/originals/8d/f9/c4/8df9c44fb51f97f337a1eb672ef70908.jpg'),(9004,'https://www.sueddeutsche.de/image/sz.1.3239614/640x360?v=1509699954'),(9005,'https://www.tvmovie.de/assets/2019/10/01/73149-fast-furious-star-dwayne-the-rock-johnson-zurueck-im-wwe-ring.jpg'),(9006,'https://i.pinimg.com/originals/16/f2/7a/16f27adc46c8f51b221568a1b77c3d55.jpg'),(9007,'https://s.yimg.com/ny/api/res/1.2/gnVXhalMYcLReQgHR3CQmw--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2020-03/0418e0c0-5fb5-11ea-94e7-74c63b3329a1'),(9008,'https://i.insider.com/5a9056c2c169952e008b45e2?width=600&format=jpeg&auto=webp');
/*!40000 ALTER TABLE `bild` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-06 15:26:28
