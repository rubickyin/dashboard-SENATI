<?php

session_start();
require_once 'conexion.php';
global $conn;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']); 

    
    if (empty($email)) {
        $_SESSION['error'] = "Por favor, ingresa tu correo electrónico.";
        header("Location: recuperar_contrasena.php");
        exit();
    }

   
    $sql = "SELECT ID_de_Usuario FROM Usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        $_SESSION['error'] = "Error en la base de datos: " . $conn->error;
        header("Location: recuperar_contrasena.php");
        exit();
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        $_SESSION['error'] = "El correo electrónico no está registrado.";
        header("Location: recuperar_contrasena.php");
        exit();
    }

    // Para poder generar un Token unico
    $token = bin2hex(random_bytes(3));
    $expira = date("Y-m-d H:i:s", strtotime("+1 hour"));

    
    $sql = "UPDATE Usuarios SET token_recuperacion = ?, token_expiracion = ? WHERE email = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        $_SESSION['error'] = "Error al actualizar el token: " . $conn->error;
        header("Location: recuperar_contrasena.php");
        exit();
    }
    
    $stmt->bind_param("sss", $token, $expira, $email);
    $stmt->execute();

    // Cargar PHPMailer
    require '../PHPMailer/vendor/autoload.php';

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'monteroemer8@gmail.com';
        $mail->Password = 'ttji jyrf ledc xghd'; // Usa una contraseña de aplicación, NO tu contraseña real
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('no-reply@tudominio.com', 'Soporte Idhercon');
        $mail->addAddress($email);
        $mail->Subject = 'Recuperación de contraseña';
        $mail->Body = "Este el es código para recuperar contraseña:";
        $mail->Body .= "$token";

        $mail->send();
        $_SESSION['email_recuperacion'] = $email;
        header("Location: verificar_codigo.php");
        exit();
    } catch (Exception $e) {
        $_SESSION['error'] = "Error al enviar el correo: " . $mail->ErrorInfo;
        header("Location: recuperar_contrasena.php");
        exit();
    }

    header("Location: recuperar_contrasena.php");
    exit();
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/favicon-logo (H).ico" type="image/x-icon">
    <title>Idhercon Cloud Management Platform</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../css/login.css">
    
</head>
<body>

    <!-- Notificación -->
    <div id="notification" class="notification"></div>

    <main>
        <div class="login" style="padding-top: 5em">
            <img src="../img/logo-AzulOscuro.png" alt="logo_Oscuro" width="250px">
            <p class="textA">Ingresa tu correo electrónico para recuperar tu contraseña.</p>

            <form action="recuperar_contrasena.php" method="POST">
                <div class="textbox">
                    <input required type="email" name="email">
                    <label><i class="bi bi-envelope-fill"></i> Correo electrónico</label>
                </div>

                <button type="submit">Enviar</button>
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
            showNotification("<?php echo $_SESSION['error']; ?>", "error-message");
            <?php unset($_SESSION['error']); ?>
        <?php endif; ?>

        <?php if (isset($_SESSION['exito'])): ?>
            showNotification("<?php echo $_SESSION['exito']; ?>", "success-message");
            <?php unset($_SESSION['exito']); ?>
        <?php endif; ?>
    </script>
</body>
</html>
