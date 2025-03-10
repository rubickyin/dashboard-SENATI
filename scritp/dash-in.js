document.addEventListener("DOMContentLoaded", function () {
    let list = document.querySelectorAll('.nav-item');

    function activateItem(item) {
        let currentActive = document.querySelector('.nav-item.active');

        // Si ya está activa, no hacer nada para evitar reaparición abrupta
        if (currentActive === item) return;

        // Removemos la clase de todos
        list.forEach((el) => el.classList.remove('active'));

        // Agregamos la clase al seleccionado con un pequeño retraso para suavizar
        setTimeout(() => {
            item.classList.add('active');
        }, 100);
    }

    // Activa la primera opción al inicio
    let firstItem = document.querySelector('.nav-item');
    if (firstItem) {
        activateItem(firstItem);
    }

    // Evento de click para cambiar la opción activa
    list.forEach((item) => {
        item.addEventListener('click', function () {
            activateItem(this);
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    let list = document.querySelectorAll('.nav-item');
    let content = document.getElementById("content");

    // Contenido de cada opción
    const pages = {
        "dashboard": `
            <h2  class="titleI">Dashboard - Inicio</h2>
            <div class="grafic-content">
                <div class="grafic">
                    <div class="chart-box">
                        <h2 class="titG">Gráfico de pedidos</h2>
                        <canvas id="pieChart"></canvas>
                    </div>
                    <div class="chart-box">
                        <h2 class="titG">Estadística de pedidos</h2>
                        <canvas id="barChart"></canvas>
                    </div>
                </div>
                <h2 class="titG">Inicios de sesión</h2>
                <div class="full-width">
                    <canvas id="bubbleChart"></canvas>
                </div>
            </div>`,
        "gestion-cuentas": `
        <div class="gestU">
            <section class="header">
                <div class="head1">
                    <h2 class="title">Gestión de Cuentas</h2>
                </div>
                <div class="btn-imgUser">
                    <a href="javascript:void(0);" class="btn-img" onclick="openModal()" style="text-decoration: none;">
                        <img src="../img/foto-none.png" alt="Foto de Perfil" id="profilePhoto" style="border-radius: 50%;" width="50px">
                        <p class="name" id="nameNA"></p>
                    </a>
                </div>
            </section>
            <section class="btn-add-search">
                <div class="add">
                    <a href="javascript:void(0);" onclick="agregarUsuario()"><i class="bi bi-plus"></i> Agregar Usuario</a>
                </div>
                <div class="search">
                    <form action="javascript:void(0);" onsubmit="buscarUsuario()" >
                        <div class="textbox">
                            <input required type="text" name="id_usuario" id="searchInput">
                            <label for="searchInput"><i class="bi bi-search search-icon"></i> Buscar por ID o DNI</label>
                        </div>
                    </form>
                </div>
            </section>
            <section class="dates">
                <table>
                    <thead>
                        <tr>
                            <th style="width: 7%;">ID</th>
                            <th style="width: 8%;">DNI</th>
                            <th style="width: 10%;">Estatus</th>
                            <th style="width: 13%;">Nombres</th>
                            <th style="width: 15%;">Apellidos</th>
                            <th style="width: 9%;">Número</th>
                            <th style="width: 20%;">Correo</th>
                            <th style="width: 12%;">Contraseña</th>
                            <th style="width: 6%;">Acción</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-usuarios">
                    
                    </tbody>
                </table>
            </section>
        </div>
    `,
        "administracion-pedidos": `
        <div class="gestU">
                <section class="header">
                    <div class="head1">
                        <h2 class="title">Administración de Pedidos</h2>
                    </div>
                    <div class="btn-imgUser">
                        <a href="javascript:void(0);" class="btn-img" onclick="openModal()" style="text-decoration: none;">
                            <img src="../img/foto-none.png" alt="Foto de Perfil" id="profilePhoto" style="border-radius: 50%;" width="50px">
                            <p class="name" id="nameNA"></p>
                        </a>
                    </div>
                </section>
                <section class="btn-add-search">
                    <div class="add">
                        <a href="javascript:void(0);" onclick="realizarPedido()"><i class="bi bi-plus"></i> Agregar Pedidos</a>
                    </div>
                    <div class="search">
                        <form action="javascript:void(0);" onsubmit="buscarPedido()">
                            <div class="textbox">
                                <input required type="text" name="id_pedido" id="searchInput">
                            <label for="searchInput"><i class="bi bi-search search-icon"></i> Buscar por ORD-....</label>
                            </div>
                        </form>
                    </div>

                </section>
                <section class="dates">
                    <table>
                        <thead>
                            <tr>
                                <th>Cod de Orden</th>
                                <th>DNI</th>
                                <th>Estatus</th>
                                <th>Tienda - Almacén</th>
                                <th>Fecha - Actualización</th>
                                <th>Hora - Actualización</th>
                                <th>Ultima - Actualización</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody id="tabla-pedidos">
                            
                        </tbody>
                    </table>
                </section>
            </div>`
    };

    function activateItem(item) {
        list.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');

        // Obtener el contenido de la opción seleccionada
        let page = item.getAttribute("data-content");
        content.innerHTML = pages[page] || "<h2>Página no encontrada</h2>";

        // Si la opción es "dashboard", inicializamos los gráficos
        if (page === "dashboard") {
            initializeCharts();
        }
        if (page === "gestion-cuentas") {
            cargarUsuarios();
            cargarNombreApellido();
            cargarFotoUsuario();
        }
        if (page == "administracion-pedidos") {
            cargarPedidos();
            cargarNombreApellido();
            cargarFotoUsuario();
        }

    }

    // Activa la primera opción al inicio
    let firstItem = document.querySelector('.nav-item');
    if (firstItem) {
        activateItem(firstItem);
    }

    // Evento de click para cambiar la opción activa y el contenido
    list.forEach((item) => {
        item.addEventListener('click', function () {
            activateItem(this);
        });
    });
});



async function cargarUsuarios() {
    try {
        let response = await fetch("../php/cargarUsuarios.php");
        let data = await response.json();
        let tabla = document.getElementById("tabla-usuarios");

        if (Array.isArray(data) && data.length > 0) {
            tabla.innerHTML = ""; // Limpiar antes de agregar datos
            data.forEach(usuario => {
                let fila = `
                <tr data-idusuario="<?= $fila['ID_de_Usuario'] ?>">
                    <td>${usuario.ID_de_Usuario}</td>
                    <td>${usuario.DNI}</td>
                    <td>
                        <span class="badge ${usuario.Estatus === 'Admin' ? 'admin' : 'ad-ped'}">
                            ${usuario.Estatus}
                        </span>
                    </td>
                    <td>${usuario.Nombres}</td>
                    <td>${usuario.Apellidos}</td>
                    <td>${usuario.Numero}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.Contraseña}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn" onclick="mostrarAcciones(this,${usuario.ID_de_Usuario})">
                                <i class="bi bi-three-dots"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                `;
                tabla.innerHTML += fila;
            });
        } else {
            tabla.innerHTML = "<tr><td colspan='9'>No hay usuarios disponibles</td></tr>";
        }
    } catch (error) {
        console.error("Error al cargar los usuarios:", error);
    }
}

//Cagar Pedidos 
async function cargarPedidos() {
    try {
        let response = await fetch("../php/cargarPedidos.php");
        let data = await response.json();
        let tabla = document.getElementById("tabla-pedidos");

        if (Array.isArray(data) && data.length > 0) {
            tabla.innerHTML = ""; // Limpiar antes de agregar datos
            data.forEach(pedido => {
                let fila = `
                <tr data-idpedido="${pedido.id}">
                    <td>${pedido.codigo_orden}</td>
                    <td>${pedido.dni}</td>
                    <td>
                        <span class="badge ${getClassForEstatus(pedido.estatus)}">
                        ${pedido.estatus}
                        </span>
                    </td>
                    <td>${pedido.tienda_almacen}</td>
                    <td>${pedido.fecha_actualizacion}</td>
                    <td>${pedido.hora_actualizacion}</td>
                    <td>${pedido.ultima_actualizacion}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn" onclick="mostrarAccionesPedido(this, ${pedido.id})">
                                <i class="bi bi-three-dots"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                `;
                tabla.innerHTML += fila;
            });
        } else {
            tabla.innerHTML = "<tr><td colspan='10'>No hay pedidos disponibles</td></tr>";
        }
    } catch (error) {
        console.error("Error al cargar los pedidos:", error);
    }
}

function getClassForEstatus(estatus) {
    switch (estatus) {
        case 'Pe. Conf.':
            return 'badge-confirmado';  // Clase para pedidos confirmados
        case 'Pre. Ped.':
            return 'badge-preparacion'; // Clase para pedidos en preparación
        case 'Pe. Env.':
            return 'badge-enviado';     // Clase para pedidos enviados
        case 'Pe. Entr.':
            return 'badge-entregado';   // Clase para pedidos entregados
        default:
            return 'badge-pendiente';   // Clase por defecto para otros estatus
    }
}



// Ejecuta la función automáticamente al cargar la página
async function cargarNombreApellido() {
    try {
        let response = await fetch("../php/cargarNombreApellido.php");
        let data = await response.json();
        console.log("Datos recibidos:", data);  // 👈 Muestra los datos recibidos

        let nombreElemento = document.getElementById("nameNA");
        console.log("Elemento encontrado:", nombreElemento);  // 👈 Verifica el elemento

        if (data && data.Nombres && data.Apellidos) {
            // Tomar solo el primer nombre y el primer apellido
            let primerNombre = data.Nombres.split(" ")[0];
            let primerApellido = data.Apellidos.split(" ")[0];

            nombreElemento.textContent = `${primerNombre} ${primerApellido}`;
            console.log("Nombre colocado:", nombreElemento.textContent);  // 👈 Verifica el resultado
        } else {
            console.log("No se encontraron datos del usuario.");
        }
    } catch (error) {
        console.error("Error al cargar el nombre y apellido:", error);
    }
}

function cargarFotoUsuario() {
    fetch('../php/obtener_foto.php') // Cambia esto a la ruta correcta
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la foto');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            // Cambiar el src de la imagen
            document.getElementById('profilePhoto').src = data.foto || '../img/foto-none.png';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function openModal() {
    Swal.fire({
        title: 'Cambiar Imagen de Perfil',
        html: `
            <input type="file" id="imageInput" accept="image/*" />
            <img id="previewImage" style="margin-top: 10px; display: none; border-radius: 50%;" width="100px" />
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const fileInput = document.getElementById('imageInput');
            const file = fileInput.files[0];
            if (!file) {
                Swal.showValidationMessage('Por favor, selecciona una imagen.');
                return false;
            }
            return new Promise((resolve) => {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('userId', 'ID_de_Usuario'); // Cambia esto por el ID real del usuario

                // Realiza la solicitud AJAX para subir la imagen
                fetch('../php/upload_photo.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al subir la imagen');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Aquí puedes manejar la respuesta del servidor
                        // Por ejemplo, actualizar la imagen de perfil en la interfaz
                        document.getElementById('profilePhoto').src = data.imagePath; // Asegúrate de que el servidor devuelva la ruta de la imagen
                        resolve();
                        // Recargar la página para reflejar los cambios
                        location.reload(); // Recarga la página
                    })
                    .catch(error => {
                        Swal.showValidationMessage(`Error: ${error}`);
                    });
            });
        }
    });

    // Manejador de eventos para mostrar la vista previa de la imagen
    document.getElementById('imageInput').addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const previewImage = document.getElementById('previewImage');
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}


function initializeCharts() {
    setTimeout(() => {
        let pieChart = document.getElementById("pieChart");
        let barChart = document.getElementById("barChart");
        let bubbleChart = document.getElementById("bubbleChart");

        if (pieChart && barChart && bubbleChart) {
            // Petición AJAX para obtener los datos de la base de datos
            fetch("../php/get_data.php")
                .then(response => response.json())
                .then(data => {
                    // 🥧 Pie Chart: Pedidos entregados y demás
                    const estados = data.pedidos.map(p => p.estado);
                    const cantidades = data.pedidos.map(p => p.cantidad);

                    new Chart(pieChart, {
                        type: "pie",
                        data: {
                            labels: estados,
                            datasets: [{
                                data: cantidades,
                                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
                            }]
                        },
                        options: {
                            responsive: true,
                        }
                    });

                    // 📊 Bar Chart: Pedidos entregados y demás (similar al Pie)
                    new Chart(barChart, {
                        type: "bar",
                        data: {
                            labels: estados,
                            datasets: [{
                                label: "Pedidos",
                                data: cantidades,
                                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
                            }]
                        },
                        options: {
                            responsive: true,
                        }
                    });


                    // 🟣 Bubble Chart: Inicios de sesión de usuarios
                    const loginsData = data.logins.map(login => ({
                        x: new Date(login.fecha).getTime(),  // Fecha como eje X
                        y: parseInt(login.logins),           // Cantidad de inicios de sesión como eje Y
                        r: 5                                 // Tamaño fijo para los puntos
                    }));

                    new Chart(bubbleChart, {
                        type: "bubble",
                        data: {
                            datasets: [{
                                label: "Usuarios",
                                data: loginsData,
                                backgroundColor: "rgba(153, 102, 255, 0.6)"
                            }]
                        },
                        options: {
                            responsive: true,
                            scales: {
                                x: {
                                    type: 'time',  // Mostrar fechas correctamente
                                    time: {
                                        unit: 'day'
                                    },
                                    title: {
                                        display: true,
                                        text: 'Fecha'
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Inicios de Sesión'
                                    }
                                }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            const user = data.logins[context.dataIndex].id_usuario;
                                            const logins = context.raw.y;
                                            return `Usuario ${user}: ${logins} inicios`;
                                        }
                                    }
                                }
                            }
                        }
                    });

                })
                .catch(error => console.error("Error al cargar los datos:", error));
        }
    }, 100);
}




