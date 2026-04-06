(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav-primary");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 899px)").matches) {
          nav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = anchor.getAttribute("href");
      if (id.length > 1) {
        var el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  document.querySelectorAll(".js-lead-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameInput = form.querySelector('[name="name"]');
      var phoneInput = form.querySelector('[name="phone"]');
      try {
        if (nameInput && nameInput.value.trim()) {
          sessionStorage.setItem("ora_lead_name", nameInput.value.trim());
        }
        if (phoneInput && phoneInput.value.trim()) {
          sessionStorage.setItem("ora_lead_phone", phoneInput.value.trim());
        }
        sessionStorage.setItem("ora_thank_you_expected", "1");
      } catch (err) {
        /* ignore */
      }
      window.location.href = "thank-you.html";
    });
  });

})();
