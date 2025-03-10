<?php
// Incluir la conexión
require('conexion.php');  // Usar require para incluir conexión
include '../seguridad/auth.php';
// Usar la conexión global
global $conn;

// Obtener datos enviados desde JS
$dni = $_POST['dni'];
$nombres = $_POST['nombres'];
$apellidos = $_POST['apellidos'];
$numero = $_POST['numero'];
$correo = $_POST['correo'];
$contrasena = password_hash($_POST['contrasena'], PASSWORD_BCRYPT);  // Encriptar contraseña

// Consulta para insertar el nuevo usuario
$sql = "INSERT INTO usuarios (DNI, Nombres, Apellidos, Numero, Contraseña, email) 
        VALUES ('$dni', '$nombres', '$apellidos', '$numero',  '$contrasena', '$correo')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["exito" => true]);
} else {
    echo json_encode(["exito" => false, "error" => $conn->error]);
}

$conn->close();
?>


