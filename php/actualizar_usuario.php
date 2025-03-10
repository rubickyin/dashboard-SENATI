<?php
require 'conexion.php';  // Tu archivo de conexión a la BD
include '../seguridad/auth.php';
// Obtener los datos enviados en formato JSON
$datos = json_decode(file_get_contents("php://input"), true);

if (isset($datos['id']) && isset($datos['nombre']) && isset($datos['apellido']) && isset($datos['numero']) && isset($datos['correo'])) {
    $id = $datos['id'];
    $nombre = $datos['nombre'];
    $apellido = $datos['apellido'];
    $numero = $datos['numero'];
    $correo = $datos['correo'];

    // Consulta para actualizar el usuario
    $sql = "UPDATE usuarios SET Nombres = ?, Apellidos = ?, Numero = ?, email = ? WHERE ID_de_Usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $nombre, $apellido, $numero, $correo, $id);

    if ($stmt->execute()) {
        echo json_encode(["exito" => true]);
    } else {
        echo json_encode(["exito" => false, "error" => $conn->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["exito" => false, "error" => "Datos incompletos"]);
}

$conn->close();
?>
