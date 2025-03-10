<?php
// Incluir la conexión
require('conexion.php');  // Usar require para incluir conexión
include '../seguridad/auth.php';
// Usar la conexión global
global $conn;


// Obtener los datos enviados por POST
$dniBD = $_POST['dni'];
$estatusBD = 'Pe. Conf.';
$celularBD = $_POST['celular'];
$nombresBD = $_POST['nombres'];
$apellidosBD = $_POST['apellidos'];
$tienda_almacenBD = $_POST['tienda'];
$contenidoBD = $_POST['productos'];  
$ultima_actualizacionBD = $_POST['ultimaActualizacion'];

// Escapar los datos para evitar inyección SQL
$dni = $conn->real_escape_string($dniBD);
$celular = $conn->real_escape_string($celularBD);
$nombres = $conn->real_escape_string($nombresBD);
$apellidos = $conn->real_escape_string($apellidosBD);
$tienda_almacen = $conn->real_escape_string($tienda_almacenBD);
$contenido = $conn->real_escape_string($contenidoBD);
$ultima_actualizacion = $conn->real_escape_string($ultima_actualizacionBD);

date_default_timezone_set('America/Lima');
// Obtener fecha y hora actuales
$fecha_actualizacion = date('Y-m-d');
$hora_actualizacion = date('H:i:s');
$fecha_emision = date('Y-m-d H:i:s');

// Consulta para insertar el pedido
$sql = "INSERT INTO pedidos (dni, estatus, tienda_almacen, fecha_actualizacion, hora_actualizacion, ultima_actualizacion, fecha_emision, apellidos, nombres, contenido, celular) 
        VALUES ('$dni', '$estatusBD', '$tienda_almacen', '$fecha_actualizacion', '$hora_actualizacion', '$ultima_actualizacion', '$fecha_emision', '$apellidos', '$nombres', '$contenido', '$celular')";

if ($conn->query($sql)) {
    echo json_encode(["exito" => true, "mensaje" => "Pedido guardado exitosamente."]);
} else {
    echo json_encode(["exito" => false, "error" => "Error en la consulta: " . $conn->error]);
}

$conn->close();

?>

