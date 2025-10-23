document.addEventListener('DOMContentLoaded', function () {
    const selectBodega = document.getElementById('bodega');
    const selectSucursal = document.getElementById('sucursal');


    async function cargarBodegas() {
        try {
            const res = await fetch('/Servidor/bodegas.php');
            const datos = await res.json();

            selectBodega.innerHTML = '<option value=""></option>';

            if (datos.error) {
                selectBodega.innerHTML = `<option value="">Error: ${datos.error}</option>`;
                return;
            }

            datos.forEach(b => {
                const opt = document.createElement('option');
                opt.value = b.nombre;
                opt.textContent = b.nombre;
                selectBodega.appendChild(opt);
            });

        } catch (err) {
            console.error(err);
            selectBodega.innerHTML = '<option value="">Error al cargar bodegas</option>';
        }
    }


    async function cargarSucursales(bodega) {
        try {
            const res = await fetch(`/Servidor/sucursales.php?bodega=${encodeURIComponent(bodega)}`);
            const datos = await res.json();

            selectSucursal.innerHTML = '<option value=""></option>';

            if (datos.error) {
                selectSucursal.innerHTML = `<option value="">Error: ${datos.error}</option>`;
                return;
            }

            datos.forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.nombre;
                opt.textContent = s.nombre;
                selectSucursal.appendChild(opt);
            });

        } catch (err) {
            console.error(err);
            selectSucursal.innerHTML = '<option value="">Error al cargar sucursales</option>';
        }
    }

    selectBodega.addEventListener('change', e => {
        const bodegaSeleccionada = e.target.value;
        if (bodegaSeleccionada) {
            cargarSucursales(bodegaSeleccionada);
        } else {
            selectSucursal.innerHTML = '<option value=""></option>';
        }
    });

    cargarBodegas();
});
