<?php

$error = isset($_GET['error']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/favicon-logo (H).ico" type="image/x-icon">
    <title>Idhercon Cloud Management Platform</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="css/login.css">
</head>
<body>

    <main>
        <div class="login">
            <img src="img/logo-AzulOscuro.png" alt="logo_Oscuro" width="250px">
            <p class="textA">Ingrese su ID de Idhercon para acceder.</p>

            <form action="php/login.php" method="POST">
                <div class="textbox">
                    <input required type="text" name="id_usuario">
                    <label><i class="bi bi-person-fill"></i> ID - cuenta Idhercon</label>
                </div>

                <div class="textbox">
                    <input required type="password" name="contrasena" id="password">
                    <label><i class="bi bi-lock-fill"></i> Contraseña</label>
                    <i id="toggle-password" class="bi bi-eye-slash-fill toggle-password" onclick="togglePassword()"></i>
                </div>

                <button type="submit">Acceso</button>

            </form>
            <p class="password-update">
                <a href="php/recuperar_contrasena.php">¿Has olvidado tu contraseña?</a>
            </p>
        </div>
    </main>

    <!-- Notificación flotante -->
    <div id="notification" class="notification">
        <i class="bi bi-exclamation-circle"></i> Usuario y/o contraseña incorrectas
    </div>

    <script>
        <?php if ($error): ?>
            document.addEventListener("DOMContentLoaded", function() {
                const notification = document.getElementById("notification");
                notification.classList.add("show");
                
                setTimeout(() => {
                    notification.classList.remove("show");
                }, 5000);
            });
        <?php endif; ?>
    </script>

    <script>
        function togglePassword() {
        const passwordInput = document.getElementById("password");
        const toggleIcon = document.getElementById("toggle-password");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.classList.remove("bi-eye-slash-fill");
            toggleIcon.classList.add("bi-eye-fill");
        } else {
            passwordInput.type = "password";
            toggleIcon.classList.remove("bi-eye-fill");
            toggleIcon.classList.add("bi-eye-slash-fill");
        }
    }
    </script>
</body>
</html>
