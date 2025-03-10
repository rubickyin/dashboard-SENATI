//Buscar Usuario
function buscarUsuario() {
    const valorBuscado = document.getElementById('searchInput').value.trim();

    if (valorBuscado) {
        // Envía la solicitud AJAX al archivo PHP
        fetch('../php/buscarBD.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'ID_de_Usuario=' + encodeURIComponent(valorBuscado)
        })
            .then(response => response.json())
            .then(data => {
                if (data.encontrado) {
                    // Muestra los datos en una tabla con SweetAlert2
                    Swal.fire({
                        title: 'Usuario Encontrado',
                        width: '80%',
                        html: `
                        <table style="width: 100%; border-collapse: collapse; text-align: left;">
                            <tr>
                                <th style="border: 1px solid #ddd; padding: 8px;">ID</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Nombre</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Apellidos</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Número</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Correo</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Acción</th>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.usuario.ID_de_Usuario}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.usuario.Nombres}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.usuario.Apellidos}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.usuario.Numero}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.usuario.email}</td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn" onclick="mostrarAccionesB(this,${data.usuario.ID_de_Usuario})">
                                            <i class="bi bi-three-dots"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    `,
                        icon: 'success',
                        didOpen: () => {
                            // Guardar el botón actual para usar en las funciones internas
                            window.currentButton = button;
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Usuario No Encontrado',
                        text: 'No se encontró ningún usuario con ese ID o DNI.',
                        icon: 'error'
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al buscar el usuario.',
                    icon: 'error'
                });
            });
    } else {
        Swal.fire({
            title: 'Campo Vacío',
            text: 'Por favor, ingresa un ID o DNI.',
            icon: 'warning'
        });
    }
}


//Agregar Usuarios
function agregarUsuario() {
    Swal.fire({
        title: 'Agregar Nuevo Usuario',
        html: `
            <input id="dni" class="swal2-input" placeholder="DNI">
            <input id="nombres" class="swal2-input" placeholder="Nombres">
            <input id="apellidos" class="swal2-input" placeholder="Apellidos">
            <input id="numero" class="swal2-input" placeholder="Número">
            <input id="correo" type="email" class="swal2-input" placeholder="Correo">
            <input id="contrasena" type="password" class="swal2-input" placeholder="Contraseña">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const dni = document.getElementById("dni").value.trim();
            const nombres = document.getElementById("nombres").value.trim();
            const apellidos = document.getElementById("apellidos").value.trim();
            const numero = document.getElementById("numero").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const contrasena = document.getElementById("contrasena").value.trim();

            if (!dni || !nombres || !apellidos || !numero || !correo || !contrasena) {
                Swal.showValidationMessage("Todos los campos son obligatorios");
                return false;
            }

            return { dni, nombres, apellidos, numero, correo, contrasena };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { dni, nombres, apellidos, numero, correo, contrasena } = result.value;

            // Enviar los datos a PHP
            fetch('../php/agregarUsuario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    dni,
                    nombres,
                    apellidos,
                    numero,
                    correo,
                    contrasena
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.exito) {
                        // Recargar la página si se agregó exitosamente
                        Swal.fire(
                            '¡Usuario Agregado!',
                            'El usuario ha sido registrado correctamente.',
                            'success'
                        ).then(() => {
                            location.reload();  // Recarga la página
                        });
                    } else {
                        Swal.fire(
                            'Error',
                            'No se pudo registrar el usuario. ' + (data.error || ''),
                            'error'
                        );
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire(
                        'Error',
                        'Ocurrió un error en la solicitud.',
                        'error'
                    );
                });
        }
    });
}



//Mostrar Acciones
function mostrarAcciones(button, idUsuario) {
    console.log("ID del Usuario:", idUsuario);  //  Verifica si se muestra el ID correcto en la consola

    Swal.fire({
        title: 'Acciones',
        html: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button onclick="mostrarPopover(window.currentButton, ${idUsuario})" class="swal2-confirm swal2-styled" style="background-color: #3498db;">Actualizar</button>
                <button onclick="cambiarRol(${idUsuario})" class="swal2-confirm swal2-styled" style="background-color:rgb(52, 219, 94);">Cambiar Rol</button>
                <button onclick="eliminarFila(window.currentButton, ${idUsuario})" class="swal2-confirm swal2-styled" style="background-color: #e74c3c;">Eliminar</button>
            </div>
        `,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Cerrar',
        didOpen: () => {
            window.currentButton = button;  // Guardar el botón actual
        }
    });
}

function mostrarAccionesB(button, idUsuario) {
    console.log("ID del Usuario:", idUsuario);  //  Verifica si se muestra el ID correcto en la consola

    Swal.fire({
        title: 'Acciones',
        html: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button onclick="mostrarPopoverB(window.currentButton, ${idUsuario})" class="swal2-confirm swal2-styled" style="background-color: #3498db;">Actualizar</button>
                <button onclick="cambiarRol(${idUsuario})" class="swal2-confirm swal2-styled" style="background-color:rgb(52, 219, 94);">Cambiar Rol</button>
                <button onclick="eliminarFila(window.currentButton, ${idUsuario})" class="swal2-confirm swal2-styled" style="background-color: #e74c3c;">Eliminar</button>
            </div>
        `,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Cerrar',
        didOpen: () => {
            window.currentButton = button;  // Guardar el botón actual
        }
    });
}



// Eliminar la fila con SweetAlert2
function eliminarFila(button, idUsuario) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Realizar la solicitud AJAX para eliminar en la base de datos
            fetch('../php/eliminarUsuario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${idUsuario}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.exito) {
                        // Eliminar la fila solo si se eliminó de la base de datos
                        const fila = button.closest("tr");
                        fila.remove();
                        Swal.fire(
                            '¡Eliminado!',
                            'El usuario ha sido eliminado.',
                            'success'
                        ).then(() => {
                            location.reload();  // Recarga la página
                        });
                    } else {
                        Swal.fire(
                            'Error',
                            'No se pudo eliminar el usuario.',
                            'error'
                        );
                    }
                })
                .catch(error => {
                    Swal.fire(
                        'Error',
                        'Hubo un problema con la solicitud.',
                        'error'
                    );
                    console.error(error);
                });
        }
    });
}



// Mostrar SweetAlert2 para actualizar datos
function mostrarPopover(button, idUsuario) {
    const fila = button.closest("tr");
    const datos = Array.from(fila.children).map(td => td.innerText);

    // 🔵 Comprobar si el ID se captura correctamente
    console.log("ID del Usuario:", idUsuario);

    Swal.fire({
        title: 'Actualizar Usuario',
        html: `
            <input id="nombre" class="swal2-input" value="${datos[3]}" placeholder="Nombre">
            <input id="apellido" class="swal2-input" value="${datos[4]}" placeholder="Apellido">
            <input id="numero" class="swal2-input" value="${datos[5]}" placeholder="Número">
            <input id="correo" type="email" class="swal2-input" value="${datos[6]}" placeholder="Correo">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const numero = document.getElementById("numero").value;
            const correo = document.getElementById("correo").value;

            if (!nombre || !apellido || !numero || !correo) {
                Swal.showValidationMessage("Todos los campos son obligatorios");
            }

            return { nombre, apellido, numero, correo };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombre, apellido, numero, correo } = result.value;

            // 🟢 Enviar los datos actualizados al servidor con AJAX
            fetch("../php/actualizar_usuario.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: idUsuario,           // Pasar el ID del usuario
                    nombre: nombre,
                    apellido: apellido,
                    numero: numero,
                    correo: correo
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.exito) {
                        // Actualizar la tabla solo si la actualización fue exitosa
                        fila.children[3].innerText = nombre;
                        fila.children[4].innerText = apellido;
                        fila.children[5].innerText = numero;
                        fila.children[6].innerText = correo;

                        Swal.fire(
                            '¡Actualizado!',
                            'El usuario ha sido actualizado correctamente.',
                            'success'
                        ).then(() => {
                            location.reload();  // Recargar la página para ver los cambios
                        });
                    } else {
                        Swal.fire(
                            'Error',
                            'No se pudo actualizar el usuario.',
                            'error'
                        );
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    Swal.fire(
                        'Error',
                        'Ocurrió un error al conectar con el servidor.',
                        'error'
                    );
                });
        }
    });
}


function mostrarPopoverB(button, idUsuario) {
    const fila = button.closest("tr");
    const datos = Array.from(fila.children).map(td => td.innerText);

    // 🔵 Comprobar si el ID se captura correctamente
    console.log("ID del Usuario:", idUsuario);

    Swal.fire({
        title: 'Actualizar Usuario',
        html: `
            <input id="nombre" class="swal2-input" value="${datos[1]}" placeholder="Nombre">
            <input id="apellido" class="swal2-input" value="${datos[2]}" placeholder="Apellido">
            <input id="numero" class="swal2-input" value="${datos[3]}" placeholder="Número">
            <input id="correo" type="email" class="swal2-input" value="${datos[4]}" placeholder="Correo">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const numero = document.getElementById("numero").value;
            const correo = document.getElementById("correo").value;

            if (!nombre || !apellido || !numero || !correo) {
                Swal.showValidationMessage("Todos los campos son obligatorios");
            }

            return { nombre, apellido, numero, correo };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombre, apellido, numero, correo } = result.value;

            // 🟢 Enviar los datos actualizados al servidor con AJAX
            fetch("../php/actualizar_usuario.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: idUsuario,           // Pasar el ID del usuario
                    nombre: nombre,
                    apellido: apellido,
                    numero: numero,
                    correo: correo
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.exito) {
                        // Actualizar la tabla solo si la actualización fue exitosa
                        fila.children[1].innerText = nombre;
                        fila.children[2].innerText = apellido;
                        fila.children[3].innerText = numero;
                        fila.children[4].innerText = correo;

                        Swal.fire(
                            '¡Actualizado!',
                            'El usuario ha sido actualizado correctamente.',
                            'success'
                        ).then(() => {
                            location.reload();  // Recargar la página para ver los cambios
                        });
                    } else {
                        Swal.fire(
                            'Error',
                            'No se pudo actualizar el usuario.',
                            'error'
                        );
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    Swal.fire(
                        'Error',
                        'Ocurrió un error al conectar con el servidor.',
                        'error'
                    );
                });
        }
    });
}

//Cambiar Rol
function cambiarRol(idUsuario) {
    Swal.fire({
        title: 'Cambiar rol de usuario',
        input: 'select',
        inputOptions: {
            'Admin': 'Admin',
            'Ad. Ped.': 'Administrador de Pedidos'
        },
        inputPlaceholder: 'Selecciona un rol',
        showCancelButton: true,
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3498db',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            // Petición AJAX para actualizar el rol en la base de datos
            const nuevoRol = result.value;
            fetch('../php/cambiar_rol.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `idUsuario=${idUsuario}&rol=${nuevoRol}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Rol actualizado',
                            text: 'El rol ha sido cambiado correctamente.'
                        }).then(() => {
                            location.reload();  // Recargar la página para ver los cambios
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo cambiar el rol. Intenta nuevamente.'
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema con la solicitud.'
                    });
                });
        }
    });
}



