<?php
require_once 'conexion.php'; // Ajusta la ruta si es necesario
include '../seguridad/auth.php';
// Verifica si se envió el dato por POST
if (isset($_POST['ID_de_Usuario'])) {
    $ID_de_Usuario = trim($_POST['ID_de_Usuario']);

    // Consulta a la base de datos
    $sql = "SELECT ID_de_Usuario, Nombres, Apellidos, Numero, email FROM usuarios WHERE ID_de_Usuario = ? OR DNI = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $ID_de_Usuario, $ID_de_Usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        echo json_encode(['encontrado' => true, 'usuario' => $usuario]);
    } else {
        echo json_encode(['encontrado' => false]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'No se recibió ningún dato']);
}

?>