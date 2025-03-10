<?php
session_start(); // Inicia la sesión

// Verifica si el usuario ha iniciado sesión
if (!isset($_SESSION['usuario'])) {
    // Redirecciona a la página de login si no ha iniciado sesión
    header("Location: ../index.php?error=1");
    exit();
}

// Función para verificar el rol
function verificarRol($rolesPermitidos) {
    if (!in_array($_SESSION['Estatus'], $rolesPermitidos)) {
        header("Location: ../index.php?error=1");  // Redirecciona si no tiene permiso
        exit();
    }
}

?>