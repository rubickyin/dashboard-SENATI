<?php
include 'conexion.php';
include '../seguridad/auth.php'; // Conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idpedido = intval($_POST['idpedido']);
    $rol = $_POST['rol'];

    // Validar que el rol sea uno de los permitidos
    $rolesPermitidos = ['Pe. Conf.', 'Pre. Ped.', 'Pe. Env.', 'Pe. Entr.'];
    if (!in_array($rol, $rolesPermitidos)) {
        echo json_encode(['success' => false]);
        exit;
    }

    // Obtener el nombre del usuario desde la sesión
    $ultima_actualizacionBD = $_SESSION['nombre_usuario']; 

    // Configurar la zona horaria
    date_default_timezone_set('America/Lima');
    $fecha_actualizacion = date('Y-m-d');  // Fecha actual
    $hora_actualizacion = date('H:i:s');   // Hora actual

    // Preparar la consulta para actualizar el rol y los nuevos campos
    $stmt = $conn->prepare("UPDATE pedidos SET estatus = ?, fecha_actualizacion = ?, hora_actualizacion = ?, ultima_actualizacion = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $rol, $fecha_actualizacion, $hora_actualizacion, $ultima_actualizacionBD, $idpedido);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }

    $stmt->close();
    $conn->close();
}

?>