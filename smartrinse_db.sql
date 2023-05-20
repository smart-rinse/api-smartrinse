-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2023 at 06:04 AM
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
-- Database: `smartrinse_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `laundry`
--

CREATE TABLE `laundry` (
  `id` varchar(255) NOT NULL,
  `nama_laundry` varchar(255) DEFAULT NULL,
  `tanggal_berdiri` date DEFAULT NULL,
  `kota` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `jam_operasional` varchar(255) DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry`
--

INSERT INTO `laundry` (`id`, `nama_laundry`, `tanggal_berdiri`, `kota`, `latitude`, `longitude`, `jam_operasional`, `photo`, `userId`) VALUES
('laundry-a0co9b2tqd', 'Sahabat Laundry', '2020-01-01', 'Garut', '-7.227906', '107.908699', '08.00 - 22.00', '', 'user-dnF-f8IhIJ'),
('laundry-di7f6AVjem', 'Cuy Laundry', '2020-01-01', 'Garut', '-7.227906', '107.908699', '08.00 - 22.00', '', 'user-vCBUdyOJao');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `isLaundry` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `telephone`, `gender`, `city`, `isLaundry`) VALUES
('user-dnF-f8IhIJ', 'Aqilla', 'aqilla@gmail.com', '$2b$10$mohqr3s2tuJrQx5GUY0Jf.A9ht3eEyxnGSmokIEb40ryFo7dFAgIO', NULL, NULL, NULL, NULL, 1),
('user-U9KlNX7jCz', 'Awan', 'awan@gmail.com', '$2b$10$Xcw.hhhSEPNrmeWIPijWcuPvNPCjThoFoR/tcPiHhfTjXqfNKzNYi', NULL, NULL, NULL, NULL, 0),
('user-vCBUdyOJao', 'Irfan', 'irfan@gmail.com', '$2b$10$klL64O/rcafpMiujYA.e3uXKVLVTb0GuOqwsMwianMLvBR34b36s.', NULL, '08977644236', 'Laki - Laki', 'Garut', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `laundry`
--
ALTER TABLE `laundry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `laundry`
--
ALTER TABLE `laundry`
  ADD CONSTRAINT `laundry_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
