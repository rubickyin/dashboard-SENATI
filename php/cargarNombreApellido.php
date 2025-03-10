<?php


include 'conexion.php';
include '../seguridad/auth.php';
// Comprobar si el ID de usuario está en la sesión
if (isset($_SESSION['usuario'])) {
    $idUsuario = $_SESSION['usuario'];
    $query = "SELECT Nombres, Apellidos FROM Usuarios WHERE ID_de_Usuario = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        echo json_encode($usuario);  // Aquí se envía el JSON correctamente
    } else {
        echo json_encode([]);  // JSON vacío si no encuentra datos
    }

    $stmt->close();
} else {
    echo json_encode([]);  // JSON vacío si no hay sesión
}

$conn->close();

?>