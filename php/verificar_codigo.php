<?php

require_once 'conexion.php';
include '../seguridad/auth.php';
global $conn;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_SESSION['email_recuperacion'];
    $codigo_ingresado = trim($_POST['codigo']);

    if (empty($codigo_ingresado)) {
        $_SESSION['error'] = "Por favor, ingresa el código de verificación.";
        header("Location: verificar_codigo.php");
        exit();
    }

    // Verificar si el código ingresado coincide con el de la base de datos
    $sql = "SELECT token_recuperacion, token_expiracion FROM Usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        $token_db = $row['token_recuperacion'];
        $expira = $row['token_expiracion'];

        if ($token_db === $codigo_ingresado && strtotime($expira) > time()) {
            $_SESSION['codigo_verificado'] = true;
            header("Location: nueva_contrasena.php");
            exit();
        } else {
            $_SESSION['error'] = "Código incorrecto o expirado.";
        }
    } else {
        $_SESSION['error'] = "Correo no encontrado.";
    }

    header("Location: verificar_codigo.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../img/favicon-logo (H).ico" type="image/x-icon">
    <title>Verificar Código</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../css/login.css">
</head>
<body>
    <!-- Notificación -->
    <div id="notification" class="notification"></div>

    <main>
        <div class="login" style="padding-top: 3.5em">
            <img src="../img/logo-AzulOscuro.png" alt="logo_Oscuro" width="250px" style="padding-bottom: 1em;">
            <h2 style="color:var(--color-primary); font-size: 1.3em;">Verificación de Código</h2>
            <p class="textA" >Ingresa el código que enviamos a tu correo electrónico.</p>
            <form action="verificar_codigo.php" method="POST">
                <div class="textbox">
                    <input required type="text" name="codigo">
                    <label><i class="bi bi-key-fill"></i> Código de verificación</label>
                </div>
                <button type="submit">Verificar</button>
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


