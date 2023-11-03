-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2023 at 05:32 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `academy_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `paymentMethod` varchar(50) NOT NULL,
  `total` int(11) NOT NULL,
  `productDetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`productDetails`)),
  `createdBy` varchar(255) NOT NULL,
  `creationDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id`, `uuid`, `name`, `email`, `mobile`, `paymentMethod`, `total`, `productDetails`, `createdBy`, `creationDate`) VALUES
(18, '15469ec0-785f-11ee-b1b2-2f6538106dbd', 'Avik', 'avik@gmail.com', '7896663322', 'Cash', 8000, '[{\"id\":5,\"name\":\"Advanced Java\",\"course_fee\":8000,\"total\":8000}]', 'arijit.ng@gmail.com', '2023-11-01');

-- --------------------------------------------------------

--
-- Table structure for table `course_master`
--

CREATE TABLE `course_master` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `course_fee` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_master`
--

INSERT INTO `course_master` (`course_id`, `course_name`, `description`, `course_fee`, `status`) VALUES
(4, 'Core Java', 'Java Beginners level', 6000, 'true'),
(5, 'Advanced Java', 'Advance level java jsp,j2ee,servlet etc', 8000, 'true'),
(6, 'python', 'basic python', 3000, 'true'),
(7, 'javascript', 'begginer javascript', 3000, 'true'),
(8, 'React Js', 'basic react', 5000, 'true'),
(9, 'Next Js', 'Javascript library', 4000, 'true'),
(10, 'HTML and CSS', 'html', 2000, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `name`, `address`, `mobile`, `email`, `password`, `role`) VALUES
(2, 'Arijit', 'Lake Town', '9038060439', 'abcd@gmail.com', '123', 'admin'),
(3, 'Arjun', 'palamou', '8888888888', 'arjun@gmail.com', '1234', 'user'),
(4, 'Avijit', 'Jalpaiguri', '9885663355', 'avijit@gmail.com', '1234', 'user'),
(5, 'Pamela', 'Darjeeling', '7885969633', 'pamela@gmail.com', '1234', 'user'),
(8, 'Tarun', 'jadavpur', '9999999999', 'tarun@gmail.com', '12345', 'user'),
(9, 'arun', 'bardhaman', '7894561230', 'arun@gmail.com', '123', 'user'),
(10, 'Avishek', 'Assam', '9876543210', 'avishek@gmail.com', '1234', 'user'),
(11, 'Mridul', 'Bankura', '8999123123', 'mridul@gmail.com', '123', 'user'),
(12, 'Kamal', 'Ultadanga', '7896663322', 'kamal@gmail.com', '123', 'user'),
(13, 'vivek', 'tangra', '8889999999', 'vivek@gmail.com', '1234', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_master`
--
ALTER TABLE `course_master`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `course_master`
--
ALTER TABLE `course_master`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
