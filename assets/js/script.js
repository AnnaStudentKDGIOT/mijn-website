document.addEventListener("DOMContentLoaded", function () {
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .navbar-nav .dropdown-item");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentLocation) {
      link.classList.add("active");

      if (link.classList.contains('dropdown-item')) {
        link.closest('.dropdown').querySelector('.nav-link').classList.add('active');
      }
    }
  });
});
