<?php
include 'conexion.php'; // Asegúrate de que la ruta sea correcta
include '../seguridad/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar que se haya subido un archivo
    if (isset($_FILES['image']) && isset($_SESSION['usuario'])) {
        $userId = (int)$_SESSION['usuario']; // Obtener el ID de usuario de la sesión
        $targetDir = "../imgUser /"; // Asegúrate de que esta carpeta exista y tenga permisos de escritura
        $targetFile = $targetDir . basename($_FILES["image"]["name"]);
        
        // Mover el archivo a la carpeta de destino
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            // Actualizar la base de datos con la nueva ruta de la imagen
            $stmt = $conn->prepare("UPDATE Usuarios SET foto = ? WHERE ID_de_Usuario = ?");
            $stmt->bind_param("si", $targetFile, $userId); // "si" significa string y entero

            if ($stmt->execute()) {
                // Devuelve la ruta de la imagen como respuesta
                echo json_encode(['imagePath' => $targetFile]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Error al actualizar la base de datos: ' . $stmt->error]);
            }

            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al subir la imagen']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'No se ha subido ninguna imagen o falta el ID del usuario']);
    }
}

$conn->close();
?>