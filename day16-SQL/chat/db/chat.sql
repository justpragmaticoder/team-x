-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 31 2018 г., 16:11
-- Версия сервера: 5.6.38
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `chat`
--

-- --------------------------------------------------------

--
-- Структура таблицы `mhistory`
--

CREATE TABLE `mhistory` (
  `id` int(11) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `mhistory`
--

INSERT INTO `mhistory` (`id`, `nickname`, `text`) VALUES
(1, 'Fred', 'blablabla1'),
(2, 'Nick', 'blablabla3'),
(3, 'Vasyan', 'asd'),
(4, 'Vasyan', 'adasdsadasd'),
(5, 'Petya', '123'),
(6, 'Petya', 'heeeeeeey'),
(7, 'Ivan', 'nice to meet you))'),
(8, 'Petya', 'how are you here?'),
(9, 'Ivan', 'рун'),
(10, 'Ivan', 'Hello)'),
(11, 'Gary', 'hi'),
(12, 'Vasya', 'hi)'),
(13, 'Ivan', 'hello)'),
(14, 'Vasyan', 'asd'),
(15, 'Vasyan', 'asd'),
(16, 'Vasyan', 'asd'),
(17, 'Vasyan', 'asd'),
(18, 'Vasya', 'asdas'),
(19, 'Vasya', 'asd'),
(20, 'Vasya', 'asd'),
(21, 'Vasya', 'asd'),
(22, 'Bro', 'hello)'),
(23, 'Bro', 'heeeeeeeeeeeeey'),
(24, 'Bro', 'asada'),
(25, 'Bro', 'sas'),
(26, 'Bro', 'das'),
(27, 'Bro', 'das'),
(28, 'Bro', 'das'),
(29, 'Bro', 'd'),
(30, 'Bro', 'asd'),
(31, 'Ivan', 'adasd'),
(32, 'Ivan', 'as'),
(33, 'Ivan', 'das'),
(34, 'Ivan', 'd'),
(35, 'Ivan', 'asd'),
(36, 'Ivan', 'asd'),
(37, 'Ivan', 'as'),
(38, 'Ivan', 'das'),
(39, 'Ivan', 'da'),
(40, 'Ivan', 'asd'),
(41, 'Ivan', 'asd'),
(42, 'Ivan', 'as'),
(43, 'Peter', 'asdasd'),
(44, 'Peter', 'ads'),
(45, 'Peter', 'asd'),
(46, 'Peter', 'asd'),
(47, 'Peter', 'as'),
(48, 'Peter', 'das'),
(49, 'Peter', 'das'),
(50, 'Peter', 'da'),
(51, 'Peter', 'sdas'),
(52, 'Peter', 'd'),
(53, 'Peter', 'asdas'),
(54, 'Gary', 'hi'),
(55, 'Ivan', 'hiiiiiiiiiiiiiiii'),
(56, 'Gary', 'how are you'),
(57, 'Ivan', 'fine'),
(58, 'Ivan', 'and yoy'),
(59, 'Ivan', 'oops you'),
(60, 'Gary', 'fine too, thank  you)))'),
(61, 'Gary', 'asdasd'),
(62, 'Ivan', 'adsassdasdas'),
(63, 'Gary', 'asdasd'),
(64, 'Vasya', 'ivan');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `mhistory`
--
ALTER TABLE `mhistory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `mhistory`
--
ALTER TABLE `mhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
