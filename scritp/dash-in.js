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
            <h2>Dashboard - Inicio</h2>
            <div class="grafic-content">
                <div class="grafic">
                    <div class="chart-box">
                        <canvas id="pieChart"></canvas>
                    </div>
                    <div class="chart-box">
                        <canvas id="barChart"></canvas>
                    </div>
                </div>
                <div class="full-width">
                    <canvas id="bubbleChart"></canvas>
                </div>
            </div>`,
        "gestion-cuentas":  `
        <div class="gestU">
            <section class="header">
                <div class="head1">
                    <h2 class="title">Gestión de Cuentas</h2>
                </div>
                <div class="btn-img">
                    <img src="../img/foto-none.png" alt="foto-none" style="border-radius: 50%;" width="50px">
                    <p class="name">Hauyin</p>
                </div>
            </section>
            <section class="btn-add-search">
                <div class="add">
                    <a href=""><i class="bi bi-plus"></i> Agregar Usuario</a>
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
                            <th>ID de Usuario</th>
                            <th>DNI</th>
                            <th>Estatus</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Número</th>
                            <th>Correo</th>
                            <th>Contraseña</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1435546</td>
                            <td>74598715</td>
                            <td><span class="badge admin">Admin</span></td>
                            <td>Hauyin Fernando</td>
                            <td>Condori Landeo</td>
                            <td>977 792 835</td>
                            <td>hcondorilandeo@gmail.com</td>
                            <td>12345678</td>
                            <td>
                                <button class="btn"><i class="bi bi-three-dots"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>1435547</td>
                            <td>74598785</td>
                            <td><span class="badge ad-ped">Ad. Ped.</span></td>
                            <td>nombre</td>
                            <td>Apellido</td>
                            <td>#</td>
                            <td>#</td>
                            <td>12345678</td>
                            <td>
                                <button class="btn"><i class="bi bi-three-dots"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>1435548</td>
                            <td>74595715</td>
                            <td><span class="badge ad-ped">Ad. Ped.</span></td>
                            <td>nombre</td>
                            <td>Apellido</td>
                            <td>#</td>
                            <td>#</td>
                            <td>12345678</td>
                            <td>
                                <button class="btn"><i class="bi bi-three-dots"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>1435549</td>
                            <td>74538715</td>
                            <td><span class="badge admin">Admin</span></td>
                            <td>nombre</td>
                            <td>Apellido</td>
                            <td>#</td>
                            <td>#</td>
                            <td>12345678</td>
                            <td>
                                <button class="btn"><i class="bi bi-three-dots"></i></button>
                            </td>
                        </tr>
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
            </div>`
    };

    function initializeCharts() {
        setTimeout(() => {
            let pieChart = document.getElementById("pieChart");
            let barChart = document.getElementById("barChart");
            let bubbleChart = document.getElementById("bubbleChart");

            if (pieChart && barChart && bubbleChart) {
                new Chart(pieChart, {
                    type: "pie",
                    data: {
                        labels: ["Rojo", "Azul", "Verde"],
                        datasets: [{
                            data: [10, 20, 30],
                            backgroundColor: ["red", "blue", "green"]
                        }]
                    },
                    options: {
                        responsive: true,
                    }
                });

                new Chart(barChart, {
                    type: "bar",
                    data: {
                        labels: ["A", "B", "C"],
                        datasets: [{
                            label: "Ejemplo",
                            data: [5, 15, 25],
                            backgroundColor: "orange"
                        }]
                    },
                    options: {
                        responsive: true,
                    }
                });

                new Chart(bubbleChart, {
                    type: "bubble",
                    data: {
                        datasets: [{
                            label: "Ejemplo",
                            data: [
                                { x: 10, y: 20, r: 10 },
                                { x: 15, y: 10, r: 15 },
                                { x: 5, y: 25, r: 5 }
                            ],
                            backgroundColor: "purple"
                        }]
                    },
                    options: {
                        responsive: true,
                    }
                });
            }
        }, 100); // Pequeño retraso para asegurar que el contenido se haya renderizado
    }

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