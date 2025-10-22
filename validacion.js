document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formularioEnviado").addEventListener('submit', validarFormulario); 
});

function validarFormulario(evento) {
    evento.preventDefault();
    var codigo = document.getElementById('codigo').value;
    var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var bodega = document.getElementById('bodega').value;
    var sucursal = document.getElementById('sucursal').value;
    var moneda = document.getElementById('moneda').value;
    var materiales = Array.from(document.querySelectorAll('input[name="material"]:checked')).map(cb => cb.value);
    var descripcion = document.getElementById('descripcion').value;

    //--------------------------------Validaciones 

    const regexCodigo = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
    const regexPrecio = /^[0-9]+(\.[0-9]{1,2})?$/;

    if(codigo.length == 0) {
        alert("El código del producto no puede estar en blanco.");
        return;
    }
    else if(regexCodigo.test(codigo) == false) {
        alert("El código del producto debe contener letras y números.");
        return;
    }
    else if(codigo.length < 5 || codigo.length > 15) {  
        alert("El código del producto debe tener entre 5 y 15 caracteres.");
        return;
    }  
    else if(codigo in localStorage) { // PENDIENTE 
        alert("El codigo del producto ya está registrado.")
        return;
    }

    //---------------------------------

    else if(nombre.length == 0) {
        alert("El nombre del producto no puede estar en blanco.");
        return;
    }
    else if(nombre.length < 2 || nombre.length > 50) {
        alert("El nombre del producto debe tener entre 2 y 50 caracteres.");   
        return;
    }

    //-------------------------------
    else if(bodega.length == 0) {
        alert("Debe seleccionar una bodega.");
        return;
    }

    //-------------------------------
    else if(sucursal.length == 0) {
        alert("Debe seleccionar una sucursal para la bodega seleccionada.");
        return;
    }

    //-------------------------------

    else if(moneda.length == 0) {
        alert("Debe seleccionar una moneda para el producto.");
        return;
    }

    //---------------------------------

    else if(precio.length == 0) {
        alert("El precio del producto no puede estar en blanco.");
        return;
    }

    else if(regexPrecio.test(precio) == false) {
        alert("El precio del producto debe ser un número positivo con hasta dos decimales.")
        return;
    }

    //--------------------------------
    else if(materiales.length < 2) {
        console.log(materiales);
        alert("Debe seleccionar al menos dos materiales para el producto.");
    }

    //-------------------------------
    
    else if(descripcion.length == 0) {
        alert("La descripción del producto no puede estar en blanco.");
        return;
    }

    else if(descripcion.length < 10 || descripcion.length > 1000) {
        alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
        return;
    }

}

async function cargarMonedas() {
    try {
        const respuesta = await fetch('get_monedas.php');
        const datos = await respuesta.json();

        const select = document.getElementById('moneda');
        select.innerHTML = '<option value="">Seleccione una moneda</option>';

        if (datos.error) {
            select.innerHTML = `<option value="">Error: ${datos.error}</option>`;
            return;
        }

        datos.forEach(moneda => {
            const option = document.createElement('option');
            option.value = moneda.nombre;
            option.textContent = moneda.nombre;
            select.appendChild(option);
        });

    } catch (error) {
        console.error('Error cargando monedas:', error);
        document.getElementById('moneda').innerHTML =
            '<option value="">Error al cargar monedas</option>';
    }
}


async function cargarMonedas() {
    try {
        const respuesta = await fetch('monedas.php');
        const datos = await respuesta.json();

        const select = document.getElementById('moneda');
        select.innerHTML = '<option value=""></option>';

        if (datos.error) {
            select.innerHTML = `<option value="">Error: ${datos.error}</option>`;
            return;
        }

        datos.forEach(moneda => {
            const option = document.createElement('option');
            option.value = moneda.nombre;
            option.textContent = moneda.nombre;
            select.appendChild(option);
        });

    } catch (error) {
        console.error('Error cargando monedas:', error);
        document.getElementById('moneda').innerHTML =
            '<option value="">Error al cargar monedas</option>';
    }
}


async function cargarBodegas() {
    try {
        const respuesta = await fetch('bodegas.php');
        const datos = await respuesta.json();

        const select = document.getElementById('bodega');
        select.innerHTML = '<option value=""></option>';

        if (datos.error) {
            select.innerHTML = `<option value="">Error: ${datos.error}</option>`;
            return;
        }

        datos.forEach(bodega => {
            const option = document.createElement('option');
            option.value = bodega.nombre;
            option.textContent = bodega.nombre;
            select.appendChild(option);
        });

    } catch (error) {
        console.error('Error cargando monedas:', error);
        document.getElementById('moneda').innerHTML =
            '<option value="">Error al cargar monedas</option>';
    }
}


document.addEventListener('DOMContentLoaded', cargarMonedas);
document.addEventListener('DOMContentLoaded', function() {
    const selectBodega = document.getElementById('bodega');
    const selectSucursal = document.getElementById('sucursal');

   
    async function cargarBodegas() {
        try {
            const res = await fetch('bodegas.php');
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

    // Cargar sucursales según bodega seleccionada
    async function cargarSucursales(bodega) {
        try {
            const res = await fetch(`sucursales.php?bodega=${encodeURIComponent(bodega)}`);
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

    cargarBodegas(); // iniciar carga de bodegas
});
