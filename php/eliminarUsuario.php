<?php
include 'conexion.php';
include '../seguridad/auth.php';

// Obtener el ID enviado por AJAX
$idUsuario = $_POST['id'];

// Consulta para eliminar el usuario
$sql = "DELETE FROM usuarios WHERE ID_de_Usuario = $idUsuario";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["exito" => true]);
} else {
    echo json_encode(["exito" => false, "error" => $conn->error]);
}

$conn->close();
?>
