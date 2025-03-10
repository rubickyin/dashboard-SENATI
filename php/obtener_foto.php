<?php
include 'conexion.php'; // Asegúrate de que la ruta sea correcta
include '../seguridad/auth.php';

if (isset($_SESSION['usuario'])) {
    $id_usuario = $_SESSION['usuario'];

    // Consulta para obtener la ruta de la imagen
    $query = "SELECT foto FROM Usuarios WHERE ID_de_Usuario = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $id_usuario);
    $stmt->execute();
    $stmt->bind_result($rutaFoto);
    $stmt->fetch();
    $stmt->close();

    // Cerrar la conexión
    $conn->close();

    // Devolver la ruta de la imagen como JSON
    echo json_encode(['foto' => $rutaFoto]);
} else {
    echo json_encode(['error' => 'Usuario no autenticado']);
}
?>