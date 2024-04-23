CREATE DATABASE IF NOT EXISTS consentimientos;
USE consentimientos;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  ultima_visita_id INT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(250) NOT NULL,
  password VARCHAR(128) NOT NULL,
  role ENUM('admin', 'reader') NULL DEFAULT 'reader',
  image VARCHAR(255) NULL DEFAULT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NULL DEFAULT NULL,
  verificationCode VARCHAR(64) NULL DEFAULT NULL,
  verifiedAt DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (Ultima_visita_id) REFERENCES lastVisit(id)
);
CREATE TABLE IF NOT EXISTS lastVisit (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    Ultima_visita DATE NOT NULL,
    PRIMARY KEY (id),
    
);
CREATE TABLE IF NOT EXISTS pestanias (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    last_visit_id int unsigned not null,
	fechaUltimoRetoque date,
    datos_medicos BOOLEAN,
    firma BOOLEAN NOT NULL,
    DATE_BIRTH DATE NOT NULL, 
    telefono VARCHAR(9) NOT NULL,
    aplicacion VARCHAR(125) NOT NULL,
    estilo VARCHAR(125) NOT NULL,
    curva ENUM('L', 'B', 'C', 'D', 'LC', 'CC', 'DD', 'LM', 'LU'),
    largor ENUM('4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'),
    grosor ENUM('0.03', '0.05', '0.07', '7', '8', '9', '10', '11', '12', '13', '14', '15'),
    tipo_pestanias VARCHAR(125) NOT NULL,
    adhesivo VARCHAR(125) NOT NULL,
    notas VARCHAR(800),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS extensiones_de_pelo (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    fechaDelServicio DATE NOT NULL,
    otrosCampos VARCHAR(255), -- Aquí añade los campos adicionales que necesites
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS microblading (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    fechaDelServicio DATE NOT NULL,
    otrosCampos VARCHAR(255), 
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS limpiezas_faciales (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    fechaDelServicio DATE NOT NULL,
    otrosCampos VARCHAR(255), 
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS firmas (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL, -- ID del usuario al que pertenece la firma
    firma_encriptada TEXT NOT NULL, -- Datos de la firma encriptados
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación de la firma
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) -- Relación con la tabla de usuarios
);