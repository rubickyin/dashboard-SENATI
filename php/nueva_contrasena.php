<?php
require_once 'conexion.php';
include '../seguridad/auth.php';
global $conn;

if (!isset($_SESSION['codigo_verificado']) || !$_SESSION['codigo_verificado']) {
    $_SESSION['error'] = "Acceso denegado.";
    header("Location: recuperar_contrasena.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_SESSION['email_recuperacion'];
    $nueva_contrasena = trim($_POST['password']);
    $confirmar_contrasena = trim($_POST['confirm_password']);

    if (empty($nueva_contrasena) || empty($confirmar_contrasena)) {
        $_SESSION['error'] = "Ambos campos son obligatorios.";
        header("Location: nueva_contrasena.php");
        exit();
    }

    if ($nueva_contrasena !== $confirmar_contrasena) {
        $_SESSION['error'] = "Las contraseñas no coinciden.";
        header("Location: nueva_contrasena.php");
        exit();
    }

    if (strlen($nueva_contrasena) < 6) {
        $_SESSION['error'] = "La contraseña debe tener al menos 6 caracteres.";
        header("Location: nueva_contrasena.php");
        exit();
    }

    $hashed_password = password_hash($nueva_contrasena, PASSWORD_DEFAULT);

    // Actualizar contraseña en la base de datos
    $sql = "UPDATE Usuarios SET Contraseña = ?, token_recuperacion = NULL, token_expiracion = NULL WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $hashed_password, $email);
    $stmt->execute();

    session_destroy(); // Eliminar variables de sesión
    session_start(); // Iniciar nueva sesión para mostrar éxito
    $_SESSION['exito'] = "Contraseña actualizada con éxito.";
    header("Location: ../index.php");
    exit();
}
?>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../img/favicon-logo (H).ico" type="image/x-icon">
    <title>Restablecer Contraseña</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../css/login.css">
</head>
<body>
    <!-- Notificación -->
    <div id="notification" class="notification"></div>

    <main>
        <div class="login" style="padding-top: 3em">
            <img src="../img/logo-AzulOscuro.png" alt="logo_Oscuro" width="250px" style="padding-bottom: 1em;">
            <h2 style="color:var(--color-primary); font-size: 1.3em;">Restablecer Contraseña</h2>
            <p class="textA" >Ingresa tu nueva contraseña</p>

            <form action="nueva_contrasena.php" method="POST">
                <div class="textbox">
                    <input required type="password" name="password" minlength="6">
                    <label><i class="bi bi-lock-fill"></i> Nueva Contraseña</label>
                </div>

                <div class="textbox">
                    <input required type="password" name="confirm_password" minlength="6">
                    <label><i class="bi bi-lock-fill"></i> Confirmar Contraseña</label>
                </div>

                <button type="submit">Actualizar Contraseña</button>
            </form>
        </div>
    </main>

    <script>
        function showNotification(message, type) {
            const notification = document.getElementById("notification");
            notification.textContent = message;
            notification.classList.add(type);
            notification.classList.add("show");
            notification.style.display = "block";

            setTimeout(() => {
                notification.style.opacity = "0";
                setTimeout(() => {
                    notification.style.display = "none";
                    notification.style.opacity = "1";
                    notification.classList.remove("show");
                    notification.classList.remove(type);
                }, 500);
            }, 4000);
        }

        <?php if (isset($_SESSION['error'])): ?>
            showNotification("<?php echo htmlspecialchars($_SESSION['error']); ?>", "error-message");
            <?php unset($_SESSION['error']); ?>
        <?php endif; ?>

        <?php if (isset($_SESSION['exito'])): ?>
            showNotification("<?php echo htmlspecialchars($_SESSION['exito']); ?>", "success-message");
            <?php unset($_SESSION['exito']); ?>
        <?php endif; ?>
    </script>
</body>
</html>
