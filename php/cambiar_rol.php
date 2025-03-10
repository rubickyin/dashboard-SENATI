<?php
include 'conexion.php';
include '../seguridad/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idUsuario = intval($_POST['idUsuario']);
    $rol = $_POST['rol'];

    // Validar que el rol sea uno de los permitidos
    $rolesPermitidos = ['Admin', 'Ad. Ped.'];
    if (!in_array($rol, $rolesPermitidos)) {
        echo json_encode(['success' => false]);
        exit;
    }

    // Preparar la consulta para actualizar el rol
    $stmt = $conn->prepare("UPDATE usuarios SET Estatus = ? WHERE ID_de_Usuario = ?");
    $stmt->bind_param("si", $rol, $idUsuario);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }

    $stmt->close();
    $conn->close();
}

?>