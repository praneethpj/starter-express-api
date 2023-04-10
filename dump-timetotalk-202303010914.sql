-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: timetotalk
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `call_schedules`
--

DROP TABLE IF EXISTS `call_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `call_schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `clientId` int(11) DEFAULT NULL,
  `dateval` datetime DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `starttime` varchar(26) DEFAULT NULL,
  `activate` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `call_schedules_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `call_schedules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_schedules`
--

LOCK TABLES `call_schedules` WRITE;
/*!40000 ALTER TABLE `call_schedules` DISABLE KEYS */;
INSERT INTO `call_schedules` VALUES (11,1,1,'2023-02-28 20:00:00','09:30-10:30','2023-02-28 10:00:00',1,'2023-02-28 04:19:28','2023-02-28 04:19:28',NULL),(12,1,1,'2023-02-28 20:00:00','09:30-10:30','2023-02-28 09:30:00',1,'2023-02-28 09:26:41','2023-02-28 09:26:41',NULL),(13,1,1,'2023-02-28 22:00:00','10:30-11:30','2023-02-28 10:30:00',1,'2023-02-28 09:28:07','2023-02-28 09:28:07',NULL),(14,1,1,'2023-02-28 20:00:00','09:30-10:30','2023-02-28 09:30:00',1,'2023-02-28 09:38:12','2023-02-28 09:38:12',NULL),(15,1,1,'2023-03-05 18:00:00','08:30-09:30','2023-03-05 08:30:00',1,'2023-02-28 09:45:12','2023-02-28 09:45:12',NULL),(16,1,1,'2023-02-28 20:00:00','09:30-10:30','2023-02-28 09:30:00',1,'2023-02-28 11:00:03','2023-02-28 11:00:03',NULL);
/*!40000 ALTER TABLE `call_schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documets`
--

DROP TABLE IF EXISTS `documets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `documentname` varchar(255) DEFAULT NULL,
  `documentpath` varchar(255) DEFAULT NULL,
  `activate` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documets`
--

LOCK TABLES `documets` WRITE;
/*!40000 ALTER TABLE `documets` DISABLE KEYS */;
/*!40000 ALTER TABLE `documets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_user`
--

DROP TABLE IF EXISTS `notification_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_user` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `notificationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`notificationId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `notification_user_ibfk_1` FOREIGN KEY (`notificationId`) REFERENCES `notifications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notification_user_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_user`
--

LOCK TABLES `notification_user` WRITE;
/*!40000 ALTER TABLE `notification_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `calldate` varchar(26) DEFAULT NULL,
  `calltime` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'You have a call with praneethpj',1,'2023-03-01 09:10:00','09:30-10:30',1,'2023-02-28 11:00:03','2023-03-01 03:38:15'),(2,'You have a call with Mr.Praneeth',1,'2023-02-28 09:30:00','09:30-10:30',0,'2023-02-28 11:00:03','2023-02-28 11:00:03');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `clientId` int(11) DEFAULT NULL,
  `paypaltoken` varchar(255) DEFAULT NULL,
  `dateval` datetime DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `userfee` double DEFAULT NULL,
  `taxfee` double DEFAULT NULL,
  `platformfee` double DEFAULT NULL,
  `totalfee` double DEFAULT NULL,
  `paymentstatus` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,1,NULL,'2023-02-27 18:00:00','08:30-09:30',NULL,NULL,NULL,NULL,0,'2023-02-27 10:15:09','2023-02-27 10:15:09'),(2,1,1,NULL,'2023-02-27 18:00:00','08:30-09:30',NULL,NULL,NULL,NULL,0,'2023-02-27 10:28:31','2023-02-27 10:28:31'),(3,1,1,NULL,'2023-02-28 20:00:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 02:39:36','2023-02-28 02:39:36'),(4,1,1,'098','2023-02-27 00:00:00','09:30',100,5,5,5,0,'2023-02-28 02:43:53','2023-02-28 02:43:53'),(5,1,1,NULL,'2023-02-28 22:00:00','10:30-11:30',NULL,NULL,NULL,NULL,0,'2023-02-28 02:46:08','2023-02-28 02:46:08'),(6,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 03:04:25','2023-02-28 03:04:25'),(7,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 03:06:50','2023-02-28 03:06:50'),(8,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 03:10:58','2023-02-28 03:10:58'),(9,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 03:11:59','2023-02-28 03:11:59'),(10,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 03:17:11','2023-02-28 03:17:11'),(11,1,1,'098','2023-02-28 00:00:00','09:30-10:30',100,5,5,5,0,'2023-02-28 04:00:11','2023-02-28 04:00:11'),(12,1,1,'098','2023-02-28 00:00:00','09:30-10:30',100,5,5,5,0,'2023-02-28 04:04:02','2023-02-28 04:04:02'),(13,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 04:19:28','2023-02-28 04:19:28'),(14,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 09:26:41','2023-02-28 09:26:41'),(15,1,1,NULL,'2023-02-27 18:30:00','10:30-11:30',NULL,NULL,NULL,NULL,0,'2023-02-28 09:28:07','2023-02-28 09:28:07'),(16,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 09:38:12','2023-02-28 09:38:12'),(17,1,1,NULL,'2023-03-04 18:30:00','08:30-09:30',NULL,NULL,NULL,NULL,0,'2023-02-28 09:45:12','2023-02-28 09:45:12'),(18,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 10:51:41','2023-02-28 10:51:41'),(19,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 10:53:20','2023-02-28 10:53:20'),(20,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 10:54:41','2023-02-28 10:54:41'),(21,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 10:55:41','2023-02-28 10:55:41'),(22,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 10:56:43','2023-02-28 10:56:43'),(23,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 10:57:37','2023-02-28 10:57:37'),(24,1,1,NULL,'2023-02-27 18:30:00','09:30-10:30',NULL,NULL,NULL,NULL,0,'2023-02-28 11:00:03','2023-02-28 11:00:03');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `activate` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (32,1,'0','09:30-10:30',0,'2023-02-25 16:19:38','2023-02-28 11:00:03'),(33,1,'1','08:30-09:30',1,'2023-02-25 16:19:38','2023-02-25 16:19:51'),(34,1,'1','09:30-10:30',1,'2023-02-25 16:19:38','2023-02-25 16:19:51'),(35,1,'0','08:30-09:30',0,'2023-02-25 16:19:38','2023-02-28 09:45:12'),(36,1,'0','10:30-11:30',0,'2023-02-25 16:19:38','2023-02-28 09:28:07'),(37,1,'1','12:30-01:30',0,'2023-02-25 16:19:38','2023-02-25 16:19:51');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `activate` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'doctor',1,'2023-02-05 15:38:22','2023-02-05 15:38:22'),(4,'lowyer',1,'2023-02-05 15:40:09','2023-02-05 15:40:09'),(6,'teachers',1,'2023-02-05 15:42:03','2023-02-05 15:42:03');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_call_schedule`
--

DROP TABLE IF EXISTS `user_call_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_call_schedule` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`scheduleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_call_schedule_ibfk_1` FOREIGN KEY (`scheduleId`) REFERENCES `call_schedules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_call_schedule_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_call_schedule`
--

LOCK TABLES `user_call_schedule` WRITE;
/*!40000 ALTER TABLE `user_call_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_call_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_documents`
--

DROP TABLE IF EXISTS `user_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_documents` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`scheduleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_documents_ibfk_1` FOREIGN KEY (`scheduleId`) REFERENCES `documets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_documents_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_documents`
--

LOCK TABLES `user_documents` WRITE;
/*!40000 ALTER TABLE `user_documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_payment`
--

DROP TABLE IF EXISTS `user_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_payment` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`paymentId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_payment_ibfk_1` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_payment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_payment`
--

LOCK TABLES `user_payment` WRITE;
/*!40000 ALTER TABLE `user_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_professionals`
--

DROP TABLE IF EXISTS `user_professionals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_professionals` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userProfessionalId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`userProfessionalId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_professionals_ibfk_1` FOREIGN KEY (`userProfessionalId`) REFERENCES `userprofessionals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_professionals_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_professionals`
--

LOCK TABLES `user_professionals` WRITE;
/*!40000 ALTER TABLE `user_professionals` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_professionals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_schedule`
--

DROP TABLE IF EXISTS `user_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_schedule_ibfk_1` FOREIGN KEY (`id`) REFERENCES `schedules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_schedule_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_schedule`
--

LOCK TABLES `user_schedule` WRITE;
/*!40000 ALTER TABLE `user_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_urls`
--

DROP TABLE IF EXISTS `user_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `videoId` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `playonstart` tinyint(1) DEFAULT NULL,
  `playonmid` tinyint(1) DEFAULT NULL,
  `playonend` tinyint(1) DEFAULT NULL,
  `playonperiod` double DEFAULT NULL,
  `activate` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_urls`
--

LOCK TABLES `user_urls` WRITE;
/*!40000 ALTER TABLE `user_urls` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofessionals`
--

DROP TABLE IF EXISTS `userprofessionals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userprofessionals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `profileimage` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `scheduleId` int(11) DEFAULT NULL,
  `documentId` int(11) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `totalhours` double DEFAULT NULL,
  `talkcount` double DEFAULT NULL,
  `costperhour` double NOT NULL,
  `approve` int(11) DEFAULT NULL,
  `activate` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofessionals`
--

LOCK TABLES `userprofessionals` WRITE;
/*!40000 ALTER TABLE `userprofessionals` DISABLE KEYS */;
INSERT INTO `userprofessionals` VALUES (1,1,'Praneeth','https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500','Mr','Sri Lanka',1,NULL,1,0,0,0,5,1,1,'2023-02-23 15:53:52','2023-02-23 15:53:52');
/*!40000 ALTER TABLE `userprofessionals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `subscriptionkey` varchar(255) DEFAULT NULL,
  `useractive` int(11) DEFAULT NULL,
  `paymentactive` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'praneethpj','pubudupraneeth@gmail.com','$2a$08$1I3RZD1NgexHLHyw11qPLOOe.0/0GlhtADGKuqAARUH9HfMs4OJdy','a4a13edd-7cb2-4b92-81a2-95020f3e08d6',1,0,'2023-02-05 14:46:25','2023-02-05 14:46:25');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'timetotalk'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-01  9:14:07
