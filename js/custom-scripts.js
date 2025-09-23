// custom-scripts.js — versión depurada
$(function () {
  "use strict";

  // 1) WOW.js (animaciones con clase "wow")
  if (typeof WOW === "function") {
    new WOW().init();
  }

  // Utilidad: altura combinada de topbar + navbar fija
  function headerGap() {
    var top = $("#topbar").outerHeight() || 0;
    var nav = $("#main-nav").outerHeight() || 0;
    return top + nav;
  }

  // 2) Scroll suave en enlaces del menú y en .scroll
  $(document).on("click", '.navbar a[href^="#"], a.scroll, .scroll a', function (e) {
    var hash = this.hash;
    if (!hash) return; // sin hash => no hacemos nada especial

    var $target = $(hash);
    if (!$target.length) return;

    e.preventDefault();

    var gap = headerGap();
    $("html, body").animate(
      { scrollTop: (hash === "#home" ? 0 : $target.offset().top - (gap - 1)) },
      600
    );

    // cerrar menú colapsado en móvil
    $(".navbar-collapse.in").collapse("hide");

    // marcar activo
    $(".navbar-nav li").removeClass("active");
    $(this).closest("li").addClass("active");
  });

  // 3) Actualizar el activo al hacer scroll (simple scrollspy)
  var $menuLinks = $('.navbar a[href^="#"]');
  var $sections = $menuLinks
    .map(function () {
      var $el = $($(this).attr("href"));
      return $el.length ? $el : null;
    });

  function onScroll() {
    var pos = $(window).scrollTop() + headerGap() + 2;
    var current = $sections
      .map(function () {
        if ($(this).offset().top <= pos) return this;
      })
      .last();

    if (current && current.length) {
      var id = "#" + current.attr("id");
      $(".navbar-nav li").removeClass("active");
      $menuLinks
        .filter('[href="' + id + '"]')
        .closest("li")
        .addClass("active");
    }
  }
  $(window).on("scroll", onScroll);
  onScroll(); // inicial

  // 4) Tooltips de Bootstrap (si hay elementos con data-toggle="tooltip")
  if ($("[data-toggle='tooltip']").length) {
    $("[data-toggle='tooltip']").tooltip();
  }
});
