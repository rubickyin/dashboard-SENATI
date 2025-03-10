<?php
session_start();
require_once 'conexion.php';

$id_usuario = trim($_POST['id_usuario']);
$contrasena = trim($_POST['contrasena']);

$sql = "SELECT ID_de_Usuario, Nombres, Contraseña, foto, Estatus FROM Usuarios WHERE ID_de_Usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hash_almacenado = $row['Contraseña'];

    // Verificamos la contraseña ingresada con el hash almacenado
    if (password_verify($contrasena, $hash_almacenado)) {
        $_SESSION['usuario'] = $id_usuario;
        $_SESSION['nombre_usuario'] = $row['Nombres']; // Guardar el nombre en sesión
        $_SESSION['foto'] = !empty($row['foto']) ? $row['foto'] : '../img/foto-none.png';
        $_SESSION['Estatus'] = $row['Estatus'];
        
        // Registrar inicio de sesión
        $ip_usuario = $_SERVER['REMOTE_ADDR'];  // Capturar IP del usuario
        $sql_log = "INSERT INTO Logins (id_usuario, ip) VALUES (?, ?)";
        $stmt_log = $conn->prepare($sql_log);
        $stmt_log->bind_param("ss", $id_usuario, $ip_usuario);
        $stmt_log->execute();

        header("Location: ../page/dashboard.php?bienvenido=1");
    } else {
        header("Location: ../index.php?error=1");
        exit();
    }
} else {
    header("Location: ../index.php?error=1");
    exit();
}

$stmt->close();
$conn->close();

?>