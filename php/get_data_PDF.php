<?php
require_once 'conexion.php';

$idpedido = isset($_GET['idpedido']) ? (int)$_GET['idpedido'] : 0;

// 🟢 Consultar los datos del pedido
$sql_pedido = "
    SELECT id,codigo_orden, dni, estatus, tienda_almacen, fecha_emision, apellidos, nombres, contenido, celular
    FROM pedidos
    WHERE id = $idpedido";
$result = $conn->query($sql_pedido);

$pedido = [];

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // 🟢 Formato JSON para JavaScript
    $pedido = [
        'codigo_orden' => $row['codigo_orden'],
        'dni' => $row['dni'],
        'estatus' => $row['estatus'],
        'tienda_almacen' => $row['tienda_almacen'],
        'fecha_emision' => $row['fecha_emision'],
        'apellidos' => $row['apellidos'],
        'nombres' => $row['nombres'],
        'contenido' => json_decode($row['contenido'], true),  // Suponiendo que 'contenido' es un JSON
        'celular' => $row['celular']
    ];
}

header('Content-Type: application/json');
echo json_encode($pedido);
$conn->close();
?>