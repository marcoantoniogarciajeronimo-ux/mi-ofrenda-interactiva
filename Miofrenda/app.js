
const fotos = [
    {
        src: "img/foto1.jpg",
        titulo: "En memoria de mi familiar",
        descripcion: "Siempre vivirá en nuestros corazones."
    },
    {
        src: "img/foto2.jpg",
        titulo: "Un recuerdo especial",
        descripcion: "Los momentos compartidos nunca se olvidan."
    },
    {
        src: "img/foto3.jpg",
        titulo: "Con cariño y amor",
        descripcion: "Tu recuerdo nos acompaña siempre."
    },
    {
        src: "img/foto4.jpg",
        titulo: "Por siempre en la memoria",
        descripcion: "Tu luz seguirá iluminando nuestras vidas."
    }
];

let indice = 0;

const imagen = document.getElementById("imagenOfrenda");
const descripcion = document.getElementById("descripcion");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const puntos = document.getElementById("puntos");
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");
const iconoMusica = document.getElementById("iconoMusica");
const textoMusica = document.getElementById("textoMusica");

// Crear los puntitos
function crearIndicadores() {
    puntos.innerHTML = "";

    fotos.forEach((foto, i) => {
        const punto = document.createElement("button");
        punto.type = "button";
        punto.className = "punto";
        punto.setAttribute("aria-label", "Mostrar foto " + (i + 1));

        punto.addEventListener("click", () => {
            mostrarFoto(i);
        });

        puntos.appendChild(punto);
    });
}

// Mostrar la fotografía seleccionada
function mostrarFoto(nuevoIndice) {
    indice = (nuevoIndice + fotos.length) % fotos.length;

    const tituloFoto = document.getElementById("tituloFoto");
    imagen.src = fotos[indice].src;
    imagen.alt = fotos[indice].descripcion;
    tituloFoto.textContent = fotos[indice].titulo;

    actualizarIndicadores();
}

// Marcar el puntito de la foto actual
function actualizarIndicadores() {
    const todos = puntos.querySelectorAll(".punto");

    todos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indice);
    });
}

// Cambiar de fotografía con las flechas
anterior.addEventListener("click", () => {
    mostrarFoto(indice - 1);
});

siguiente.addEventListener("click", () => {
    mostrarFoto(indice + 1);
});

btnMusica.addEventListener("click", async () => {
    if (audio.paused) {
        try {
            await audio.play();
            iconoMusica.textContent = "Ⅱ";
            textoMusica.textContent = "Pauser música";
        } catch (error) {
    console.error("Error al reproducir:", error);
    alert("Error de música: " + error.name + " - " + error.message);
}
    } else {
        audio.pause();
        iconoMusica.textContent = "▶";
        textoMusica.textContent = "Reproducir música";
    }
});

// Iniciar la ofrenda
crearIndicadores();
mostrarFoto(0);

// Cambiar de foto automáticamente cada 6 segundos
setInterval(() => {
    mostrarFoto(indice + 1);
}, 6000);
