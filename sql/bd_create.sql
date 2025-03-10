CREATE DATABASE DashboarIdhercon;
USE DashboarIdhercon;


CREATE TABLE Usuarios (
    ID_de_Usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    DNI VARCHAR(20) NOT NULL,
    Estatus VARCHAR(50),
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Numero VARCHAR(15),
    Contraseña VARCHAR(255) NOT NULL
) AUTO_INCREMENT = 1435545;


ALTER TABLE Usuarios ADD COLUMN email VARCHAR(100) NOT NULL;

ADD COLUMN token_recuperacion VARCHAR(64) DEFAULT NULL,
ADD COLUMN token_expiracion DATETIME DEFAULT NULL;

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_orden VARCHAR(50) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    estatus VARCHAR(20) NOT NULL,
    tienda_almacen VARCHAR(100) NOT NULL,
    fecha_actualizacion DATE NOT NULL,
    hora_actualizacion TIME NOT NULL,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


ALTER TABLE pedidos
ADD COLUMN fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN apellidos VARCHAR(100),
ADD COLUMN nombres VARCHAR(100),
ADD COLUMN contenido VARCHAR(500);

DELIMITER //

CREATE TRIGGER generar_codigo_orden
BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    DECLARE inicio INT DEFAULT 41303800;  -- Número inicial para el código

    -- Obtener el último número usado en codigo_orden
    DECLARE ultimo_numero INT;

    SELECT IFNULL(MAX(CAST(SUBSTRING(codigo_orden, 5) AS UNSIGNED)), inicio - 1) INTO ultimo_numero FROM pedidos;

    -- Asignar el nuevo codigo_orden
    SET NEW.codigo_orden = CONCAT('ORD-', ultimo_numero + 1);
END //

DELIMITER ;

ALTER TABLE pedidos
ADD COLUMN celular VARCHAR(9) NOT NULL;

ALTER TABLE pedidos MODIFY COLUMN ultima_actualizacion VARCHAR(30);


CREATE TABLE Logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha DATETIME DEFAULT NOW(),
    ip VARCHAR(45),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(ID_de_Usuario)
);