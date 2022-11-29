-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2022 at 01:10 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ayfn`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Economy', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(2, 'Environment', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(3, 'Health', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(4, 'Politic', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(5, 'Other', '2022-11-14 18:24:41', '2022-11-14 18:24:41');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Brunei Darussalam', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(2, 'Cambodia', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(3, 'Indonesia', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(4, 'Laos', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(5, 'Malaysia', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(6, 'Myanmar', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(7, 'Philippines', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(8, 'Singapore', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(9, 'Thailand', '2022-11-14 18:24:41', '2022-11-14 18:24:41'),
(10, 'Vietnam', '2022-11-14 18:24:41', '2022-11-14 18:24:41');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isPublished` tinyint(1) DEFAULT NULL,
  `total_like` int(11) DEFAULT NULL,
  `countryId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `summary`, `image`, `isPublished`, `total_like`, `countryId`, `categoryId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Berita Baru', 'Konten dari berita baru', 'Ini berita baru', 'https://i.ibb.co/YNjLcCw/Blue-Simple-Course-Certificate-1668496727020.png', 0, 0, 3, 3, 3, '2022-11-15 07:19:57', '2022-11-15 09:19:03'),
(2, 'Berita Baru 2', 'Konten dari berita baru 2', 'Ini berita baru 2', 'https://i.ibb.co/c39NMFB/KTP-1668510828213.jpg', 1, 4, 3, 3, 2, '2022-11-15 11:13:53', '2022-11-15 11:51:59'),
(3, 'Berita Baru 3', 'Konten dari berita baru 3', 'Ini berita baru 3', 'https://i.ibb.co/8bg1KJv/vestrahorn-mountain-black-sand-beach-iceland-wallpaper-1920x1200-1668510856081.jpg', 1, 3, 3, 3, 2, '2022-11-15 11:14:22', '2022-11-15 11:46:57');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE `userdetails` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `countryId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`id`, `fullName`, `image`, `countryId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin ASEAN Youth Forum News', 'https://i.ibb.co/37c1FJH/logo-large.png', 3, 1, '2022-11-14 18:24:42', '2022-11-14 18:24:42'),
(2, 'Fabyan Ihsan Sayiq', 'https://i.ibb.co/vk6PhTf/gas-station.jpg', 3, 2, '2022-11-14 18:24:42', '2022-11-14 18:24:42'),
(3, 'Kindarya Fabyan', 'https://i.ibb.co/dK42RcC/Foto-3x4-1668450085771.png', 3, 3, '2022-11-14 18:31:53', '2022-11-15 06:42:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@ayfn.com', '$2b$10$FNpdBk4AOXBhQQHTFdJ3zuZVUSN8TAlswfY5bAgJRkHJI/kHaY3Ve', 1, '2022-11-14 18:24:42', '2022-11-14 18:24:42'),
(2, 'anggota@ayfn.com', '$2b$10$RMJX0XjRa/ok.vGyliPDduSq5K82dNbO04t2HakdHhKhIcs4G0PaS', 0, '2022-11-14 18:24:42', '2022-11-14 18:24:42'),
(3, 'fabyanknd@gmail.com', '$2b$10$KPtHjzJEX4JZqdWce3oKCOXrlWIqh9ukgpXKIa6q35XNu9XtZgX3S', 0, '2022-11-14 18:31:53', '2022-11-15 06:42:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
