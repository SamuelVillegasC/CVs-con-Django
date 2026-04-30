const equipo = [
  {
    nombre: "Dylan Aldiery Raya Macias",
    rol: "Desarrollador Full-stack",
    experiencia: "5 años en desarrollo web y arquitectura de software. Ha trabajado en proyectos para pymes y startups locales.",
    foto: "https://m.media-amazon.com/images/S/pv-target-images/bfc5c92c93c80f0d83ea98823fa27248e8dd2b451ea2a2f7166d69db386bcca8.jpg"
  },
  {
    nombre: "Jose Samuel Villegas Carmona",
    rol: "Desarrollador Full-stack",
    experiencia: "3 años especializándose en interfaces de usuario. Conoce HTML, CSS, JavaScript y herramientas de diseño UI.",
    foto: "https://preview.redd.it/mohammed-avdol-in-the-style-of-part-4-by-me-v0-54qpfbvegiwf1.jpg?width=640&crop=smart&auto=webp&s=60e3bd22a2beabda0d552e470e56992581b2dba6"
  }
];

//Elemntos insertados en la bd actualmente
/*
const serviciosBase = [
  
  { nombre: "Consultoría en Ciberseguridad",  descripcion: "Análisis de vulnerabilidades y recomendaciones de seguridad para tu empresa.",          precio: 1200 },
  { nombre: "Instalación de Redes LAN",       descripcion: "Diseño e instalación de redes internas para oficinas y negocios.",                      precio: 950  },
  { nombre: "Base de Datos y Reportes",       descripcion: "Diseño de bases de datos relacionales y generación de reportes automáticos.",           precio: 1100 },
  { nombre: "Tienda en Línea (E-commerce)",   descripcion: "Desarrollo de tienda virtual con carrito de compras y pasarela de pago.",               precio: 3000 },
  { nombre: "Automatización con Scripts",     descripcion: "Scripts en Python o Bash para automatizar tareas repetitivas del negocio.",             precio: 600  },
  { nombre: "Servidor en la Nube",            descripcion: "Configuración y administración de servidores VPS o cloud para tu aplicación.",          precio: 1500 },
  { nombre: "Capacitación en TI",             descripcion: "Cursos presenciales o en línea sobre herramientas digitales y ofimática.",              precio: 350  },
  { nombre: "Auditoría de Infraestructura",   descripcion: "Revisión completa del estado tecnológico de tu empresa con informe detallado.",         precio: 1800 }
];*/

function obtenerServicios() {
  return Array.isArray(serviciosData) && serviciosData.length > 0
    ? serviciosData
    : serviciosBase;
}

/* YA NO SE USA Antes localStorage
function guardarServicio(nuevoServicio) {
  const guardados = localStorage.getItem("servicios_extra"); 
  const extra = guardados ? JSON.parse(guardados) : [];       
  extra.push(nuevoServicio);
  localStorage.setItem("servicios_extra", JSON.stringify(extra));
}*/

const pagina = window.location.pathname.includes("/catalogo/")
  ? "catalogo"
  : window.location.pathname.includes("/alta/")
  ? "alta"
  : "inicio";

function generarNav() {
  const nav = document.getElementById("main-nav");

  const links = [
    { texto: "Inicio",   href: "/"  },
    { texto: "Catálogo", href: "/catalogo/" },
    { texto: "Alta",     href: "/alta/"     }
  ];

  for (let i = 0; i < links.length; i++) {
    const a = document.createElement("a");
    a.href = links[i].href;
    a.textContent = links[i].texto;

    if (
      (links[i].href === "/"    && pagina === "inicio")   ||
      (links[i].href === "/catalogo/" && pagina === "catalogo") ||
      (links[i].href === "/alta/"     && pagina === "alta")
    ) {
      a.className = "activo";
    }

    nav.appendChild(a);
  }
}

function generarEquipo() {
  const contenedor = document.getElementById("team-container");
  if (!contenedor) return;

  for (let i = 0; i < equipo.length; i++) {
    const m = equipo[i];

    const card = document.createElement("div");
    card.className = "team-card";

    const foto = document.createElement("img");
    foto.className = "team-foto";
    foto.src = m.foto;
    foto.alt = "Foto de " + m.nombre;

    const info = document.createElement("div");
    info.className = "team-info";

    const nombre = document.createElement("h3");
    nombre.textContent = m.nombre;

    const rol = document.createElement("p");
    rol.className = "rol";
    rol.textContent = m.rol;

    const exp = document.createElement("p");
    exp.textContent = m.experiencia;

    info.appendChild(nombre);
    info.appendChild(rol);
    info.appendChild(exp);
    card.appendChild(foto);
    card.appendChild(info);
    contenedor.appendChild(card);
  }
}

function generarServicios() {
  const contenedor = document.getElementById("services-container");
  if (!contenedor) return;

  const lista = obtenerServicios();

  for (let i = 0; i < lista.length; i++) {
    const s = lista[i];

    const card = document.createElement("div");
    card.className = "service-card";

    if (s.precio > 1000) {
      card.classList.add("premium");
    }

    const titulo = document.createElement("h3");
    titulo.textContent = s.nombre;

    if (s.precio > 1000) {
      const badge = document.createElement("span");
      badge.className = "badge-premium";
      badge.textContent = "+$1000";
      titulo.appendChild(badge);
    }

    const desc = document.createElement("p");
    desc.className = "descripcion";
    desc.textContent = s.descripcion;

    const precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = "$" + s.precio;

    card.appendChild(titulo);
    card.appendChild(desc);
    card.appendChild(precio);
    contenedor.appendChild(card);
  }
}

function generarFormulario() {
  
  const contenedor = document.getElementById("form-container");
  if (!contenedor) return;

  const form = document.createElement("form");
  form.id = "alta-form";
  form.method = "POST";
  form.action = "/alta/";

  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
  if (csrfToken) {
      form.appendChild(csrfToken);
  }


  const campos = [
    ["inp-nombre",      "Nombre del servicio", "text",   "Ej. Consultoría en redes", "nombre"],
    ["inp-descripcion", "Descripción",          "text",   "Describe brevemente el servicio", "descripcion"],
    ["inp-precio",      "Precio (MXN)",         "number", "Ej. 1500", "precio"]
  ];

  for (let i = 0; i < campos.length; i++) {
    const id          = campos[i][0];
    const labelTxt    = campos[i][1];
    const tipo        = campos[i][2];
    const placeholder = campos[i][3];
    const nameAttr    = campos[i][4];

    const grupo = document.createElement("div");
    grupo.className = "form-grupo";

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelTxt;

    const input = document.createElement("input");
    input.type = tipo;
    input.id = id;
    input.name = nameAttr;
    input.placeholder = placeholder;
    if (tipo === "number") { input.min = "1"; }

    const errorSpan = document.createElement("span");
    errorSpan.className = "campo-error";
    errorSpan.id = "err-" + id;

    grupo.appendChild(label);
    grupo.appendChild(input);
    grupo.appendChild(errorSpan);
    form.appendChild(grupo);
  }

  const btn = document.createElement("button");
  btn.id = "btn-guardar";
  btn.textContent = "Guardar Servicio";
  btn.type = "button";
  btn.addEventListener("click", manejarAlta); 

  form.appendChild(btn);
  contenedor.appendChild(form);


}

function limpiarErrores() {
  const spans = document.querySelectorAll(".campo-error");
  for (let i = 0; i < spans.length; i++) {
    spans[i].textContent = "";
  }
  const box = document.getElementById("form-error");
  if (box) { box.style.display = "none"; box.textContent = ""; }
}

function mostrarErrorGeneral(msg) {
  const box = document.getElementById("form-error");
  if (!box) return;
  box.textContent = msg;
  box.style.display = "block";
  box.scrollIntoView({ behavior: "smooth", block: "center" });
}

function manejarAlta() {
  limpiarErrores();

  const nombre      = document.getElementById("inp-nombre").value.trim();
  const descripcion = document.getElementById("inp-descripcion").value.trim();
  const precioRaw   = document.getElementById("inp-precio").value.trim();
  const precio      = parseFloat(precioRaw);

  let hayError = false;

  if (nombre === "") {
    document.getElementById("err-inp-nombre").textContent = "El nombre es obligatorio.";
    hayError = true;
  } else if (nombre.length < 3) {
    document.getElementById("err-inp-nombre").textContent = "Mínimo 3 caracteres.";
    hayError = true;
  }

  if (descripcion === "") {
    document.getElementById("err-inp-descripcion").textContent = "La descripción es obligatoria.";
    hayError = true;
  } else if (descripcion.length < 10) {
    document.getElementById("err-inp-descripcion").textContent = " Mínimo 10 caracteres.";
    hayError = true;
  }

  if (precioRaw === "") {
    document.getElementById("err-inp-precio").textContent = "El precio es obligatorio.";
    hayError = true;
  } else if (isNaN(precio) || precio <= 0) {
    document.getElementById("err-inp-precio").textContent = "Ingresa un número mayor a 0.";
    hayError = true;
  }

  if (hayError) {
    mostrarErrorGeneral("Hay campos con errores. Corrígelos antes de continuar.");
    return;
  }

  const nuevoServicio = { nombre: nombre, descripcion: descripcion, precio: precio };
  //guardarServicio(nuevoServicio);
  document.getElementById("alta-form").submit();

}

function generarFooter() {
  const footer = document.getElementById("main-footer");
  if (!footer) return;

  const linea1 = document.createElement("p");
  linea1.innerHTML = "&copy; 2025 <span class='accent'>ITS</span> &mdash; Todos los derechos reservados.";

  const linea2 = document.createElement("p");
  linea2.style.marginTop = "4px";
  linea2.textContent = "Morelia, Michoacán, México";

  footer.appendChild(linea1);
  footer.appendChild(linea2);
}

document.addEventListener("DOMContentLoaded", function () {
  generarNav();
  generarEquipo();
  generarServicios();
  generarFormulario();
  generarFooter();
});