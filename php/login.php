<?php
session_start();
require_once 'conexion.php';

$id_usuario = trim($_POST['id_usuario']);
$contrasena = trim($_POST['contrasena']);

$sql = "SELECT ID_de_Usuario, Contraseña FROM Usuarios WHERE ID_de_Usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hash_almacenado = $row['Contraseña'];

    if (password_verify($contrasena, $hash_almacenado)) {
        $_SESSION['usuario'] = $id_usuario;
        echo "Acceso concedido";
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

