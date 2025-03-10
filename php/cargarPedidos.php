<?php
// Incluir la conexión
require('conexion.php');
include '../seguridad/auth.php';  
global $conn;

// Consulta para obtener todos los pedidos
$sql = "SELECT * FROM pedidos";
$result = $conn->query($sql);

$pedidos = [];

if ($result && $result->num_rows > 0) {
    while ($fila = $result->fetch_assoc()) {
        $pedidos[] = $fila;
    }
}

echo json_encode($pedidos);
$conn->close();
?>