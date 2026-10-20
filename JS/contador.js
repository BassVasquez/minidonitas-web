
const contador = document.querySelector("#contador");

const objetivo = 1527;
const duracion = 2000;

function animarContador() {
    const inicio = performance.now();

    function actualizar(tiempoActual) {
        const progreso = Math.min(
            (tiempoActual - inicio) / duracion,
            1
        );

        const valor = Math.floor(progreso * objetivo);

        contador.textContent = valor.toLocaleString("es-CL");

        if (progreso < 1) {
            requestAnimationFrame(actualizar);
        }
    }

    requestAnimationFrame(actualizar);
}

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                animarContador();

                observador.unobserve(entrada.target);
            }
        });
    },
    {
        threshold: 0.5
    }
);

observador.observe(contador);