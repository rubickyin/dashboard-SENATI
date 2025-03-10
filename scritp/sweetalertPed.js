// Agregar Pedido
async function realizarPedido() {
    // Consultar el nombre y apellido de quien hace los cambios
    let response = await fetch("../php/cargarNombreApellido.php");
    let data = await response.json();
    console.log("Datos recibidos para la Base de datos:", data);

    let ultimaActualizacion = "";
    if (data && data.Nombres && data.Apellidos) {
        let primerNombre = data.Nombres.split(" ")[0];
        let primerApellido = data.Apellidos.split(" ")[0];
        ultimaActualizacion = `${primerNombre} ${primerApellido}`;
        console.log("Última actualización por BD:", ultimaActualizacion);
    } else {
        console.log("No se encontraron datos del usuario.");
    }

    Swal.fire({
        title: 'Realizar Pedido',
        html: `
            <input type="text" id="dni" class="swal2-input" placeholder="DNI">
            <input type="text" id="celular" class="swal2-input" placeholder="Celular">
            <input type="text" id="nombres" class="swal2-input" placeholder="Nombres">
            <input type="text" id="apellidos" class="swal2-input" placeholder="Apellidos">
            <select id="tienda" class="swal2-input">
                <option value="">Elegir una opción</option>
                <option value="Al-Lima">Almacen, Lima</option>
                <option value="Ti-SMP">Tienda, S.M.P.</option>
                <option value="Ti-Olivos">Tienda, Los Olivos</option>
                <option value="Ti-Lince">Tienda, Lince</option>
                <option value="Al-Juliaca">Almacen, Juliaca</option>
                <option value="Ti-Juliaca">Tienda, Juliaca</option>
                <option value="Al-Iquitos">Almacen, Iquitos</option>
                <option value="Ti-Iquitos">Tienda, Iquitos</option>
            </select>
            <div style="text-align: left; margin-top: 10px;">
                <label><input type="checkbox" value="Kit Starlink" class="pedidoBD"> Kit Starlink <input type="number" min="0" class="cantidad" style="width: 60px;"></label><br>
                <label><input type="checkbox" value="Mouse" class="pedidoBD"> Mouse <input type="number" min="0" class="cantidad" style="width: 60px;"></label><br>
                <label><input type="checkbox" value="Router Wi-Fi 6" class="pedidoBD"> Router Wi-Fi 6 <input type="number" min="0" class="cantidad" style="width: 60px;"></label><br>
                <label><input type="checkbox" value="Teclado" class="pedidoBD"> Teclado <input type="number" min="0" class="cantidad" style="width: 60px;"></label><br>
                <label><input type="checkbox" value="Cable UTP" class="pedidoBD"> Cable UTP <input type="number" min="0" class="cantidad" style="width: 60px;"></label><br>
                <label><input type="checkbox" value="Monitor" class="pedidoBD"> Monitor <input type="number" min="0" class="cantidad" style="width: 60px;"></label><br>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Enviar Pedido',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const dni = document.getElementById("dni").value.trim();
            const celular = document.getElementById("celular").value.trim();
            const nombres = document.getElementById("nombres").value.trim();
            const apellidos = document.getElementById("apellidos").value.trim();
            const tienda = document.getElementById("tienda").value.trim();

            if (!dni || !celular || !nombres || !apellidos || !tienda) {
                Swal.showValidationMessage("Todos los campos son obligatorios.");
                return false;
            }

            const productos = [];
            document.querySelectorAll(".pedidoBD").forEach((checkbox, index) => {
                if (checkbox.checked) {
                    const cantidad = document.querySelectorAll(".cantidad")[index].value.trim();
                    if (cantidad && parseInt(cantidad) > 0) {
                        productos.push({
                            nombre: checkbox.value,
                            cantidad: parseInt(cantidad)
                        });
                    }
                }
            });

            if (productos.length === 0) {
                Swal.showValidationMessage("Debe seleccionar al menos un producto con cantidad válida.");
                return false;
            }

            return { dni, celular, nombres, apellidos, tienda, ultimaActualizacion, productos };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { dni, celular, nombres, apellidos, tienda, ultimaActualizacion, productos } = result.value;

            // Convertir los datos a formato URL-encoded
            const formData = new URLSearchParams();
            formData.append("dni", dni);
            formData.append("celular", celular);
            formData.append("nombres", nombres);
            formData.append("apellidos", apellidos);
            formData.append("tienda", tienda);
            formData.append("ultimaActualizacion", ultimaActualizacion);
            formData.append("productos", JSON.stringify(productos)); // Enviar productos como JSON

            fetch('../php/guardarPedido.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()  // Enviar los datos como string URL-encoded
            })
                .then(response => response.json())
                .then(data => {
                    if (data.exito) {
                        Swal.fire(
                            '¡Pedido enviado!',
                            data.mensaje,
                            'success'
                        ).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire(
                            'Error',
                            'No se pudo enviar el pedido. ' + (data.error || ''),
                            'error'
                        );
                    }
                })
                .catch(error => {
                    console.error('Detalle del error:', error.message);
                    Swal.fire(
                        'Error',
                        'Ocurrió un error en la solicitud.',
                        'error'
                    );
                });
        }
    });
}


//Buscar Pedido
async function buscarPedido() {
    const valorBuscado = document.getElementById('searchInput').value.trim();

    if (valorBuscado === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'Por favor ingrese un código de orden.',
        });
        return;
    }

    try {
        // Enviar el código de orden al servidor
        const response = await fetch('../php/buscarPedido.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `codigo_orden=${encodeURIComponent(valorBuscado)}`
        });

        const data = await response.json();

        if (data.exito) {
            // Mostrar los datos en un SweetAlert
            Swal.fire({
                title: 'Detalle del Pedido',
                width: '80%',
                html: `
                    <table style="width: 100%; border-collapse: collapse; text-align: left;">
                            <tr>
                                <th style="border: 1px solid #ddd; padding: 8px;">Código de Orden</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Estatus</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Cliente</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">DNI</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Celular</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Tienda/Almacén</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Fecha Emisión</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Acción</th>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.pedido.codigo_orden}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.pedido.estatus}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.pedido.nombres} ${data.pedido.apellidos}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.pedido.dni}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.pedido.celular}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.pedido.tienda_almacen}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${data.pedido.fecha_emision}</td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn" onclick="mostrarAccionesPedidoB(this,${data.pedido.id})">
                                            <i class="bi bi-three-dots"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                `,
                icon: 'info',
                confirmButtonText: 'Cerrar'
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Sin resultados',
                text: data.mensaje,
            });
        }
    } catch (error) {
        console.error('Error al buscar el pedido:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al buscar el pedido.',
        });
    }
}

function mostrarAccionesPedido(button, idpedido) {
    console.log("ID del pedido:", idpedido);

    Swal.fire({
        title: 'Acciones',
        html: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button onclick="descargarPDF(window.currentButton, ${idpedido})" class="swal2-confirm swal2-styled" style="background-color: #3498db;">PDF</button>
                <button onclick="cambiarEstado(${idpedido})" class="swal2-confirm swal2-styled" style="background-color:#128C7E;">Cambiar Estado de Pedido</button>
                <button onclick="eliminarPedido(window.currentButton, ${idpedido})" class="swal2-confirm swal2-styled" style="background-color: #e74c3c;">Eliminar</button>
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

function mostrarAccionesPedidoB(button, idpedido) {
    console.log("ID del pedido:", idpedido); 

    Swal.fire({
        title: 'Acciones',
        html: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button onclick="descargarPDF(window.currentButton, ${idpedido})" class="swal2-confirm swal2-styled" style="background-color: #3498db;">PDF</button>
                <button onclick="cambiarEstado(${idpedido})" class="swal2-confirm swal2-styled" style="background-color:#128C7E;">Cambiar Estado de Pedido</button>
                <button onclick="eliminarPedido(window.currentButton, ${idpedido})" class="swal2-confirm swal2-styled" style="background-color: #e74c3c;">Eliminar</button>
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

function eliminarPedido(button, idpedido) {
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
            fetch('../php/eliminarPedido.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${idpedido}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.exito) {
                        // Eliminar la fila solo si se eliminó de la base de datos
                        const fila = button.closest("tr");
                        fila.remove();
                        Swal.fire(
                            '¡Eliminado!',
                            'El Pedido ha sido Pedido.',
                            'success'
                        ).then(() => {
                            location.reload();  // Recarga la página
                        });
                    } else {
                        Swal.fire(
                            'Error',
                            'No se pudo eliminar el Pedido.',
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

function cambiarEstado(idpedido) {
    Swal.fire({
        title: 'Cambiar Estado de Pedido',
        input: 'select',
        inputOptions: {
            'Pe. Conf.': 'Pedido Confirmado',
            'Pre. Ped.': 'Preparando Pedido',
            'Pe. Env.': 'Pedido Enviado',
            'Pe. Entr.': 'Pedido Entregado'
        },
        inputPlaceholder: 'Selecciona el Estado',
        showCancelButton: true,
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3498db',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            // Petición AJAX para actualizar el rol en la base de datos
            const nuevoEstado = result.value;
            fetch('../php/cambiar_estado.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `idpedido=${idpedido}&rol=${nuevoEstado}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Estado actualizado',
                            text: 'El Estado ha sido cambiado correctamente.'
                        }).then(() => {
                            location.reload();  // Recargar la página para ver los cambios
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo cambiar el Estado. Intenta nuevamente.'
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


async function descargarPDF(button, idpedido) {
    try {
        // 🟢 Obtener datos del pedido desde PHP
        const response = await fetch(`../php/get_data_PDF.php?idpedido=${idpedido}`);
        const data = await response.json();

        if (!data || !data.contenido || data.contenido.length === 0) {
            alert("No se encontraron datos para el pedido.");
            return;
        }

        // 🟢 Configurar el PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',   // Vertical
            unit: 'cm',                // Usar centímetros
            format: [10, 100]          // 10 cm de ancho y largo dinámico
        });

        // 🟢 Estilos básicos
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);

        // 🟢 Título
        doc.text("Detalle del Pedido", 5, 1, { align: 'center' });

        // 🟢 Datos del pedido
        let y = 2;  // Coordenada Y inicial
        doc.text(`Código de Orden: ${data.codigo_orden}`, 1, y); y += 0.7;
        doc.text(`Fecha: ${data.fecha_emision}`, 1, y); y += 0.7;
        doc.text(`Cliente: ${data.nombres} ${data.apellidos}`, 1, y); y += 0.7;
        doc.text(`DNI: ${data.dni}`, 1, y); y += 0.7;
        doc.text(`Celular: ${data.celular}`, 1, y); y += 0.7;
        doc.text(`Estatus: ${data.estatus}`, 1, y); y += 0.7;
        doc.text(`Tienda/Almacén: ${data.tienda_almacen}`, 1, y); y += 1;

        // 🟢 Productos
        doc.text("Productos:", 1, y);
        y += 0.5;

        data.contenido.forEach((producto, index) => {
            doc.text(`${index + 1}. ${producto.nombre} - Cant: ${producto.cantidad} - Precio: S/ ${producto.precio}`, 1, y);
            y += 0.5;
        });

        // 🟢 Descargar el PDF
        doc.save(`Pedido_${data.codigo_orden}.pdf`, { returnPromise: true })
        .then(() => console.log("Descarga completa"))
        .catch(error => console.error("Error en la descarga:", error));

    } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Hubo un error al generar el PDF.");
    }
}
