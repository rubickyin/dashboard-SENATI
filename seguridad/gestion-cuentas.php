<?php
include 'auth.php';
if ($_SESSION['Estatus'] !== 'Admin') {
    header("Location: ../page/dashboard.php?error=acceso-denegado");
    exit();
}
?>