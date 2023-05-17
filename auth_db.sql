-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2023 at 03:40 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `laundry`
--

CREATE TABLE `laundry` (
  `id` varchar(255) NOT NULL,
  `nama_laundry` varchar(255) DEFAULT NULL,
  `tanggal_berdiri` datetime DEFAULT NULL,
  `kota` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry`
--

INSERT INTO `laundry` (`id`, `nama_laundry`, `tanggal_berdiri`, `kota`, `latitude`, `longitude`, `photo`, `createdAt`, `updatedAt`) VALUES
('laundry-ebNANpOoI5', 'LaundryKuy', '2010-02-02 00:00:00', 'Garut', '-7.227906', '107.908699', NULL, '2023-05-14 13:39:18', '2023-05-14 13:39:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
('user-cRvuOHg1Qc', 'irfan', 'irfan@gmail.com', '$2b$10$0m4ShnUulqGVi3ACwPmVzO2IjxXSRK8NwT6.rX4rITFnaXHTptHh2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLWNSdnVPSGcxUWMiLCJuYW1lIjoiaXJmYW4iLCJlbWFpbCI6ImlyZmFuQGdtYWlsLmNvbSIsImlhdCI6MTY4NDA2ODQ4OSwiZXhwIjoxNjg0MTU0ODg5fQ._YD4ogv3910yvmIJ64qBFESpKe4RCEmlmSutbCzU8yU', '2023-05-14 04:10:04', '2023-05-14 12:48:09'),
('user-oIaaIah00q', 'awan', 'awan@gmail.com', '$2b$10$dXF8ZdA39Ep8YuOxuttvKeF8EHiN558X1oBalIOBaCf3bkBk1T07S', NULL, '2023-05-14 04:09:40', '2023-05-14 04:09:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `laundry`
--
ALTER TABLE `laundry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
