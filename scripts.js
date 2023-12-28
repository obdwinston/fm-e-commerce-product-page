const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelector(".links");
const overlay = document.querySelector(".overlay");

mobileMenu.addEventListener("click", function () {
  mobileMenu.classList.toggle("mobile-menu-close");
  mobileLinks.classList.toggle("show-links");

  if (mobileMenu.classList.contains("mobile-menu-close")) {
    overlay.style.display = "block"; // display overlay
    document.body.style.overflow = "hidden"; // prevent scrolling
  } else {
    overlay.style.display = "none";
    document.body.style.overflow = "visible";
  }
});
