-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2023 at 04:14 AM
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
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `laundryId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `createdAt`, `updatedAt`, `userId`, `laundryId`) VALUES
(2, '2023-06-01 04:37:54', '2023-06-01 04:37:54', 'user-5_3ucWmYxd', 'laundry-D5jj-_pwDY'),
(4, '2023-06-01 05:10:28', '2023-06-01 05:10:28', 'user-5_3ucWmYxd', 'laundry-HjGvFEfO_1'),
(5, '2023-06-01 08:33:02', '2023-06-01 08:33:02', 'user-5_3ucWmYxd', 'laundry-JPVZay30x1');

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
  `userId` varchar(255) DEFAULT NULL,
  `average_rating` float DEFAULT NULL,
  `average_sentiment` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry`
--

INSERT INTO `laundry` (`id`, `nama_laundry`, `tanggal_berdiri`, `kota`, `latitude`, `longitude`, `jam_operasional`, `photo`, `userId`, `average_rating`, `average_sentiment`) VALUES
('laundry-bFU4PB2JOt', 'Sobat Laundry', '2020-10-10', 'Garut', '-12.9323', '17.9743', '07.00 - 22.00', 'https://storage.googleapis.com/image-upload-27/20230523-143356', 'user-o07qirMhHQ', 4.4, 0.39984),
('laundry-D5jj-_pwDY', 'Amanah Laundry', '2022-02-02', 'Garut', '10.000', '-17.29292', '07.00 - 20.00', '', 'user-5_3ucWmYxd', 4.5, 0.999297),
('laundry-ew5eNjjB2e', 'Cuy Laundry', '2020-10-10', 'Garut', '-12.9323', '17.9743', '07.00 - 22.00', 'https://storage.googleapis.com/image-upload-27/20230523-173656', 'user-o07qirMhHQ', 3, 0.295635),
('laundry-HjGvFEfO_1', 'ABC Laundry', '2022-02-02', 'Garut', '10.000', '-17.29292', '07.00 - 20.00', '', 'user-5_3ucWmYxd', 4.5, 0.999116),
('laundry-JPVZay30x1', 'Chuax Laundry', '2022-02-02', 'Garut', '10.000', '-17.29292', '07.00 - 20.00', '', 'user-5_3ucWmYxd', 4, 0.876711),
('laundry-l2RYhSeRv5', 'XYZ Laundry', '2022-02-02', 'Garut', '10.000', '-17.29292', '07.00 - 20.00', '', 'user-5_3ucWmYxd', 3, 0.999005),
('laundry-y7eXrl9d4E', 'Chuax Laundry', '2022-02-02', 'Garut', '10.000', '-17.29292', '07.00 - 20.00', '', 'user-5_3ucWmYxd', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `laundryId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `sentiment` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE laundry
CHANGE kota alamat varchar(255) DEFAULT NULL,




--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `content`, `rating`, `laundryId`, `userId`, `sentiment`) VALUES
(1, 'Bagus sekali', 5, 'laundry-bFU4PB2JOt', 'user-5_3ucWmYxd', NULL),
(2, 'Keren servicenya', 5, 'laundry-bFU4PB2JOt', 'user-f_fbqoa6hR', NULL),
(3, 'Biasa aja si', 3, 'laundry-bFU4PB2JOt', 'user-f_fbqoa6hR', NULL),
(4, 'Cepat banget pokonya', 5, 'laundry-ew5eNjjB2e', 'user-5_3ucWmYxd', NULL),
(5, 'Bagus', 4, 'laundry-ew5eNjjB2e', 'user-5_3ucWmYxd', NULL),
(6, 'Cukup', 3, 'laundry-ew5eNjjB2e', 'user-5_3ucWmYxd', NULL),
(7, 'Cukup', 3, 'laundry-ew5eNjjB2e', 'user-5_3ucWmYxd', NULL),
(8, 'Cukup', 3, 'laundry-ew5eNjjB2e', 'user-5_3ucWmYxd', NULL),
(9, 'Baju saya bersih', 5, 'laundry-ew5eNjjB2e', 'user-5_3ucWmYxd', NULL),
(10, 'Jelek', 1, 'laundry-ew5eNjjB2e', 'user-5_3ucWmYxd', NULL),
(11, 'jelek', 0, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', NULL),
(12, 'bagus', 0, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.383878),
(13, 'bagus banget sumpah', 5, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.0207688),
(14, 'cukup', 3, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.364407),
(15, 'cukup', 3, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.364407),
(16, 'cukup', 3, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.364407),
(17, 'cukup', 3, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.364407),
(18, 'bagus', 5, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.967961),
(19, 'baju saya jadi bersih dan wangi', 5, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.933227),
(20, 'jelek banget', 1, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.604939),
(21, 'bagus banget', 5, 'laundry-ew5eNjjB2e', 'user-5_3ucWmYxd', 0.999448),
(22, 'jelek banget', 1, 'laundry-ew5eNjjB2e', 'user-5_3ucWmYxd', 0.00636319),
(23, 'Bagus banget', 5, 'laundry-l2RYhSeRv5', 'user-5_3ucWmYxd', 0.999448),
(24, 'Bagus banget', 5, 'laundry-JPVZay30x1', 'user-5_3ucWmYxd', 0.999448),
(25, 'Bagus banget', 5, 'laundry-HjGvFEfO_1', 'user-5_3ucWmYxd', 0.999448),
(26, 'Bagus banget', 5, 'laundry-D5jj-_pwDY', 'user-5_3ucWmYxd', 0.999448),
(27, 'Bagus banget', 5, 'laundry-bFU4PB2JOt', 'user-5_3ucWmYxd', 0.999448),
(28, 'laundrynya lumayan memuaskan', 4, 'laundry-bFU4PB2JOt', 'user-5_3ucWmYxd', 0.999752),
(29, 'cukup bagus laundrynya', 4, 'laundry-D5jj-_pwDY', 'user-5_3ucWmYxd', 0.999147),
(30, 'Bagus', 4, 'laundry-HjGvFEfO_1', 'user-5_3ucWmYxd', 0.998784),
(31, 'cukup', 3, 'laundry-JPVZay30x1', 'user-5_3ucWmYxd', 0.753974),
(32, 'Bagus', 3, 'laundry-l2RYhSeRv5', 'user-5_3ucWmYxd', 0.998784),
(33, 'Bagus', 1, 'laundry-l2RYhSeRv5', 'user-5_3ucWmYxd', 0.998784),
(34, 'jelek banget', NULL, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.00636319),
(35, 'jelek banget', 1, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.00636319),
(36, 'jelek banget', 1, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.00636319),
(37, 'bagus', 5, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0),
(38, 'bagus', 5, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.998784),
(39, 'bagus', 5, 'laundry-ew5eNjjB2e', 'user-o07qirMhHQ', 0.998784);

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
  `photo` text DEFAULT NULL,
  `isLaundry` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `telephone`, `gender`, `city`, `photo`, `isLaundry`) VALUES
('user-5_3ucWmYxd', 'Pengguna 2', 'pengguna2@gmail.com', '$2b$10$F1xYaqPMZO68r9Mkhgg/lufovThsIUfSgr5SIltlIRqHo3OX7MOzO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLTVfM3VjV21ZeGQiLCJuYW1lIjoiUGVuZ2d1bmEgMiIsImVtYWlsSWQiOiJwZW5nZ3VuYTJAZ21haWwuY29tIiwiaWF0IjoxNjg1NTg5OTYzfQ.nOccUyg_D_clTE31SlpgA_5ZEQwLywSQ8kZ4l9-Hkkk', NULL, NULL, NULL, NULL, 1),
('user-f_fbqoa6hR', 'Pengguna 3', 'pengguna3@gmail.com', '$2b$10$pjlfQjYbqbsPQnW.EHQRW.bZyH8cVOWKpwtUM31kKkbe7LfuGCVLm', NULL, NULL, NULL, NULL, NULL, 0),
('user-o07qirMhHQ', 'Pengguna 1', 'pengguna1@gmail.com', '$2b$10$5s4Brig.ocXUYF5kmYryb.6XJv9IYVwlH32StVd0RE.71Z86NM0wK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLW8wN3Fpck1oSFEiLCJuYW1lIjoiUGVuZ2d1bmEgMSIsImVtYWlsSWQiOiJwZW5nZ3VuYTFAZ21haWwuY29tIiwiaWF0IjoxNjg1NjExMjYzfQ.7GMNausekXlg7-G1PSgdKX4KXHElJUbFoGAfUt2872o', '08943428472', 'Laki -Laki', 'Garut', 'https://storage.googleapis.com/image-upload-27/20230523-143009', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `laundryId` (`laundryId`);

--
-- Indexes for table `laundry`
--
ALTER TABLE `laundry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `laundryId` (`laundryId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`laundryId`) REFERENCES `laundry` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `laundry`
--
ALTER TABLE `laundry`
  ADD CONSTRAINT `laundry_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`laundryId`) REFERENCES `laundry` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
