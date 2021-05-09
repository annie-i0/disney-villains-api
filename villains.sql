DROP TABLE IF EXISTS nfl.villains;
DROP DATABASE IF EXISTS villains;

CREATE USER IF NOT EXISTS 'villainsUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password123';
GRANT ALL ON villains. * TO 'villainsUser'@'localhost';

CREATE DATABASE villains;
USE villains;
CREATE TABLE villains (
id INT AUTO_INCREMENT,
name VARCHAR(255),
movie VARCHAR(255),
slug VARCHAR(255),
createdAt DATETIME DEFAULT NOW(),
updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
deletedAt DATETIME,
PRIMARY KEY (id)
);
SHOW TABLES;
SELECT * FROM villains;
INSERT INTO villains (name, movie, slug) VALUES
('Captain Hook','Peter Pan','captain-hook'),
('Cruella de Vil','One Hundred and One Dalmatians','cruella-de-vil'),
('Gaston','Beauty and the Beast','gaston'),
('Haded','Hercules','hades'),
('Horned King','The Black Cauldron','horned-king'),
('Jafar','Aladdin','jafar'),
('Lady Tremaine','Cinderella','lady-tremaine'),
('Madame Medusa','The Rescuers','madame-medusa'),
('Madam Mim','The Sword in the Stone','madam-mim'),
('Maleficent','Sleeping Beauty','maleficent'),
('Prince John','Robin Hood','prince-john'),
('Sir hiss','Robin Hood','sir-hiss'),
('Queen Grimhilde','Snow White and the Seven Dwarfs','queen-grimhilde'),
('Queen of Hearts','Alice in Wonderland','queen-of-hearts'),
('Scar','The Lion King','scar'),
('Shere Khan','The Jungle Book','shere-khan'),
('Ursula','The Little Mermaid','ursula');

SELECT * from villains.villains;


