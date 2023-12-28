const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelector(".links");

mobileMenu.addEventListener("click", function () {
  mobileMenu.classList.toggle("mobile-menu-close");
  mobileLinks.classList.toggle("show-links");
});
