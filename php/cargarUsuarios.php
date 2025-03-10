<?php
include 'conexion.php';
include '../seguridad/auth.php';
header('Content-Type: application/json');

$query = "SELECT ID_de_Usuario, DNI, Estatus, Nombres, Apellidos, Numero, Contraseña, email FROM usuarios";
$result = $conn->query($query);

$usuarios = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

echo json_encode($usuarios);
$conn->close();
?>