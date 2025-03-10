<?php
// Incluir la conexión
require('conexion.php');
include '../seguridad/auth.php';  
global $conn;

// Obtener el código de orden enviado por POST
$codigoOrden = isset($_POST['codigo_orden']) ? $conn->real_escape_string($_POST['codigo_orden']) : '';

if ($codigoOrden === '') {
    echo json_encode(['exito' => false, 'mensaje' => 'Código de orden no proporcionado.']);
    exit;
}

// Consulta para buscar el pedido
$sql = "SELECT * FROM pedidos WHERE codigo_orden = '$codigoOrden'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $pedido = $result->fetch_assoc();
    echo json_encode(['exito' => true, 'pedido' => $pedido]);
} else {
    echo json_encode(['exito' => false, 'mensaje' => 'No se encontró ningún pedido con ese código de orden.']);
}

$conn->close();
?>