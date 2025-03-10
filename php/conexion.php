<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "DashboarIdhercon";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
// Retornar la conexión
global $conn;
?>