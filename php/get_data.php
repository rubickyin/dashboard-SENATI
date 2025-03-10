<?php
require_once 'conexion.php';

// Consultar datos para el pieChart y barChart (pedidos entregados y demás)
$sql_pedidos = "
    SELECT estatus, COUNT(*) AS cantidad 
    FROM pedidos 
    GROUP BY estatus";
$result_pedidos = $conn->query($sql_pedidos);

$pedidos = [];
while ($row = $result_pedidos->fetch_assoc()) {
    $pedidos[] = [
        'estado' => $row['estatus'],
        'cantidad' => (int)$row['cantidad']
    ];
}

// Consultar datos para el bubbleChart (inicios de sesión)
$sql_logins = "
    SELECT id_usuario, COUNT(*) as logins, DATE(fecha) as fecha 
    FROM logins 
    GROUP BY id_usuario, DATE(fecha)";
$result_logins = $conn->query($sql_logins);

$logins = [];
while ($row = $result_logins->fetch_assoc()) {
    $logins[] = [
        'id_usuario' => $row['id_usuario'],
        'logins' => $row['logins'],
        'fecha' => $row['fecha']
    ];
}

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode([
    'pedidos' => $pedidos,
    'logins' => $logins
]);

$conn->close();
?>