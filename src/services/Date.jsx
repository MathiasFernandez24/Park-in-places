export const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();

    const diaFormateado = String(dia).padStart(2, '0');
    const mesFormateado = String(mes).padStart(2, '0');
    const horaFormateada = String(hora).padStart(2, '0');
    const minutosFormateados = String(minutos).padStart(2, '0');

    const fechaActual = `${diaFormateado}/${mesFormateado}/${anio} ${horaFormateada}:${minutosFormateados}`;

    return fechaActual;
}