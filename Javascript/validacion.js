document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formularioEnviado").addEventListener('submit', validarFormulario);
});

async function VerificarCodigo(codigo) {
    try {
        const respuesta = await fetch('/Servidor/verificarCodigo.php?codigo=' + encodeURIComponent(codigo));
        const codigoEncontrado = await respuesta.json();
        return codigoEncontrado.existe === true;
    } catch (error) {
        console.error("Error al verificar:", error);
        return false;
    }
}

async function validarFormulario(evento) {
    evento.preventDefault();
    var codigo = document.getElementById('codigo').value;
    var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var bodega = document.getElementById('bodega').value;
    var sucursal = document.getElementById('sucursal').value;
    var moneda = document.getElementById('moneda').value;
    var materiales = Array.from(document.querySelectorAll('input[name="material"]:checked')).map(cb => cb.value);
    var descripcion = document.getElementById('descripcion').value;

    //---------------------------------------------------Validaciones 
    //--------------------------- Codigo

    const regexCodigo = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
    const regexPrecio = /^[0-9]+(\.[0-9]{1,2})?$/;

    if (codigo.length == 0) {
        alert("El código del producto no puede estar en blanco.");
        return;
    }
    else if (regexCodigo.test(codigo) == false) {
        alert("El código del producto debe contener letras y números.");
        return;
    }
    else if (codigo.length < 5 || codigo.length > 15) {
        alert("El código del producto debe tener entre 5 y 15 caracteres.");
        return;
    }
    else if (await VerificarCodigo(codigo)) {
        alert("El codigo del producto ya está registrado.")
        return;
    }

    //------------------------------- Nombre

    else if (nombre.length == 0) {
        alert("El nombre del producto no puede estar en blanco.");
        return;
    }
    else if (nombre.length < 2 || nombre.length > 50) {
        alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
        return;
    }

    //------------------------------- Bodega
    else if (bodega.length == 0) {
        alert("Debe seleccionar una bodega.");
        return;
    }

    //------------------------------ Sucursal
    else if (sucursal.length == 0) {
        alert("Debe seleccionar una sucursal para la bodega seleccionada.");
        return;
    }

    //------------------------------- Moneda

    else if (moneda.length == 0) {
        alert("Debe seleccionar una moneda para el producto.");
        return;
    }

    //--------------------------------- Precio

    else if (precio.length == 0) {
        alert("El precio del producto no puede estar en blanco.");
        return;
    }

    else if (regexPrecio.test(precio) == false) {
        alert("El precio del producto debe ser un número positivo con hasta dos decimales.")
        return;
    }

    //-------------------------------- Materiales
    else if (materiales.length < 2) {
        console.log(materiales);
        alert("Debe seleccionar al menos dos materiales para el producto.");
        return;
    }

    //------------------------------- Descripción

    else if (descripcion.length == 0) {
        alert("La descripción del producto no puede estar en blanco.");
        return;
    }

    else if (descripcion.length < 10 || descripcion.length > 1000) {
        alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
        return;
    }

    //-------------------------------- Enviar formulario

    const datos = new FormData();
    datos.append('codigo', codigo);
    datos.append('nombre', nombre);
    datos.append('bodega', bodega);
    datos.append('sucursal', sucursal);
    datos.append('moneda', moneda);
    datos.append('precio', precio);
    datos.append('materiales', materiales.join(', '));
    datos.append('descripcion', descripcion);


    fetch('/Servidor/registro.php', {
        method: 'POST',
        body: datos
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Error HTTP: 404');
                } else {
                    throw new Error('Error HTTP: ' + response.status);
                }
            }
            return response.text();
        })
        .then(data => {
            alert("Registro de producto exitoso");
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });

}

