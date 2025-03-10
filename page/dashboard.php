<?php
include '../php/conexion.php';
include '../seguridad/auth.php';

$bienvenido = isset($_GET['bienvenido']);
$id_usuario = isset($_SESSION['usuario']);
$nombre_usuario = isset($_SESSION['nombre_usuario']) ? $_SESSION['nombre_usuario'] : '';
$foto_perfil = isset($_SESSION['foto']) && !empty($_SESSION['foto']) ? $_SESSION['foto'] : '../img/foto-none.png';
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../img/favicon-logo (H).ico" type="image/x-icon">
    <title>Dashboard Idhercon</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="../css/dash-Ini.css">
    <link rel="stylesheet" href="../css/gest-user.css">
    <link rel="stylesheet" href="../css/adm-ped.css">
    <link rel="stylesheet" href="../css/dashboard.css">

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns"></script>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

</head>

<body>

    <main>
        <div class="container">
            <div class="navigation">
                <ul>
                    <li>
                        <a href="#">
                            <img src="../img/logoWhite.png" alt="logo_D" width="200px">
                        </a>
                    </li>
                    <li class="nav-item active" data-content="dashboard">
                        <a href="#" onclick="loadDashboard()">
                            <i class="bi bi-bar-chart-line"></i>
                            <span class="list">Dashboard - Inicio</span>
                        </a>
                    </li>
                    <!-- Gestión de Cuentas (solo visible para admin) -->
                    <?php if ($_SESSION['Estatus'] === 'Admin'): ?>
                    <li class="nav-item" data-content="gestion-cuentas">
                        <a href="#">
                            <i class="bi bi-person-plus-fill"></i>
                            <span class="list">Gestión de Cuentas</span>
                        </a>
                    </li>
                    <?php else: ?>
                    <li class="nav-item" data-content="gestion-cuentas" style="pointer-events: none; opacity: 0.5;">
                        <a href="javascript:void(0)">
                            <i class="bi bi-person-plus-fill"></i>
                            <span class="list">Gestión de Cuentas</span>
                        </a>
                    </li>
                    <?php endif; ?>

                    <li class="nav-item" data-content="administracion-pedidos">
                        <a href="#">
                            <i class="bi bi-box-seam"></i>
                            <span class="list">Administración de Pedidos</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="../php/logout.php">
                            <i class="bi bi-lock-fill"></i>
                            <span class="list">Cerrar Sesión</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Contenedor de contenido dinámico -->
        <div id="content">
            
            
        </div>
    </main>

    <div id="notification" class="notification">
    <?php if ($bienvenido): ?>
        ¡Bienvenido, <?php echo htmlspecialchars($nombre_usuario); ?>!
    <?php elseif ($error): ?>
        Usuario o contraseña incorrectos
    <?php endif; ?>
    </div>

    <?php if (isset($_GET['error']) && $_GET['error'] === 'acceso-denegado'): ?>
    <div class="alert alert-danger notification" id="notification">
    No tienes permiso para acceder a esa sección.
    </div>
    <?php endif; ?>


    <script src="../scritp/dash-in.js"></script>
    <script src="../scritp/sweetalert.js"></script>
    <script src="../scritp/sweetalertPed.js"></script>
    <script>
    <?php if ($bienvenido): ?>
        document.addEventListener("DOMContentLoaded", function() {
            const notification = document.getElementById("notification");
            notification.classList.add("show");
            
            setTimeout(() => {
                notification.classList.remove("show");
            }, 2000);
        });

        // Elimina el parámetro de la URL después de mostrar el mensaje
        history.replaceState(null, null, window.location.pathname);
    <?php endif; ?>
    </script>


    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>

</html>




<!-- <div class="gestU">
                <section class="header">
                    <div class="head1">
                        <h2 class="title">Administración de Pedidos</h2>
                    </div>

                    <div class="btn-img">
                        <img src="../img/foto-none.png" alt="foto-none" style="border-radius: 50%;" width="50px">
                        <p class="name">Hauyin</p>
                    </div>
                </section>
                <section class="btn-add-search">
                    <div class="add">
                        <a href=""><i class="bi bi-plus"></i> Agregar Pedidos</a>
                    </div>
                    <div class="search">
                        <form action="">
                            <div class="textbox">
                                <input required type="text" name="id_usuario" id="searchInput">
                                <label for="searchInput"><i class="bi bi-search search-icon"></i> Buscar</label>
                            </div>
                        </form>
                    </div>

                </section>
                <section class="dates">
                    <table>
                        <thead>
                            <tr>
                                <th>Código de Orden</th>
                                <th>DNI</th>
                                <th>Estatus</th>
                                <th>Tienda - Almacén</th>
                                <th>Fecha - Actualización</th>
                                <th>Hora - Actualización</th>
                                <th>Ultima - Actualización</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ORD-233451</td>
                                <td>74598715</td>
                                <td><span class="badge Pe-Conf">Pe. Conf.</span></td>
                                <td>Almacen, Lince</td>
                                <td>15 - 06 - 25</td>
                                <td>03 : 12 pm</td>
                                <td>Hauyin</td>
                                <td>
                                    <button class="btn"><i class="bi bi-three-dots"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>ORD-233452</td>
                                <td>74593715</td>
                                <td><span class="badge Pre-Ped">Pre. Ped.</span></td>
                                <td>Almacen, Lince</td>
                                <td>16 - 06 - 25</td>
                                <td>03 : 22 pm</td>
                                <td>Cesar</td>
                                <td>
                                    <button class="btn"><i class="bi bi-three-dots"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>ORD-233453</td>
                                <td>74595715</td>
                                <td><span class="badge Pe-Env">Pe. Env.</span></td>
                                <td>Almacen, Lince</td>
                                <td>17 - 06 - 25</td>
                                <td>05 : 12 pm</td>
                                <td>Klever</td>
                                <td>
                                    <button class="btn"><i class="bi bi-three-dots"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>ORD-233454</td>
                                <td>74596715</td>
                                <td><span class="badge Pe-Entr">Pe. Entr.</span></td>
                                <td>Almacen, Lince</td>
                                <td>18 - 06 - 25</td>
                                <td>10 : 12 pm</td>
                                <td>David</td>
                                <td>
                                    <button class="btn"><i class="bi bi-three-dots"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div> -->