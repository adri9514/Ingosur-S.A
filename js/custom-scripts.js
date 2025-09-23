// custom-scripts.js — versión depurada
$(function () {
  "use strict";

  // Inicializar WOW.js (animaciones con clase "wow")
  if (typeof WOW === "function") {
    new WOW().init();
  }

  // Scroll suave en los enlaces con clase .scroll
  $(".scroll").on("click", function (e) {
    e.preventDefault();
    var target = this.hash;
    if ($(target).length) {
      $("html, body").animate(
        { scrollTop: $(target).offset().top - 70 }, // 70px offset para el header
        800
      );
    }
  });

  // Activar tooltips de Bootstrap si existen
  if ($("[data-toggle='tooltip']").length) {
    $("[data-toggle='tooltip']").tooltip();
  }
});
