// ==========================================================
// Portafolio | Matheo Moreta
// ==========================================================

(function () {
  "use strict";

  var raiz = document.documentElement;

  // ---------- Tema claro / oscuro ----------
  var botonTema = document.getElementById("tema");

  function esOscuro() {
    return raiz.getAttribute("data-tema") === "oscuro";
  }

  function actualizarBoton() {
    botonTema.textContent = esOscuro() ? "Claro" : "Oscuro";
  }

  botonTema.addEventListener("click", function () {
    if (esOscuro()) {
      raiz.removeAttribute("data-tema");
    } else {
      raiz.setAttribute("data-tema", "oscuro");
    }
    try {
      localStorage.setItem("tema", esOscuro() ? "oscuro" : "claro");
    } catch (e) {}
    actualizarBoton();
  });

  actualizarBoton();

  // ---------- Borde de la barra al hacer scroll ----------
  var barra = document.getElementById("barra");

  function revisarScroll() {
    barra.classList.toggle("barra--scroll", window.scrollY > 8);
  }

  window.addEventListener("scroll", revisarScroll, { passive: true });
  revisarScroll();

  // ---------- Enlace activo según la sección visible ----------
  var enlaces = document.querySelectorAll(".barra__nav a[href^='#']");
  var secciones = [];

  enlaces.forEach(function (enlace) {
    var seccion = document.querySelector(enlace.getAttribute("href"));
    if (seccion) secciones.push({ enlace: enlace, seccion: seccion });
  });

  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          secciones.forEach(function (s) {
            s.enlace.classList.toggle("activo", s.seccion === entrada.target);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    secciones.forEach(function (s) {
      observador.observe(s.seccion);
    });
  }

  // ---------- Año del pie ----------
  var anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
