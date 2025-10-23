async function cargarMonedas() {
    try {
        const respuesta = await fetch('/Servidor/monedas.php');
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

document.addEventListener('DOMContentLoaded', cargarMonedas);