const overlay = document.querySelector(".overlay");

// TOGGLING MOBILE MENU

const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelector(".links");

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

// ADDING PRODUCT TO CART

const plusQuantity = document.querySelector(".quantity-plus");
plusQuantity.addEventListener("click", function () {
  var quantity = Number(document.querySelector(".quantity-value").innerHTML);
  quantity = quantity + 1;
  document.querySelector(".quantity-value").innerHTML = quantity;
});

const minusQuantity = document.querySelector(".quantity-minus");
minusQuantity.addEventListener("click", function () {
  var quantity = Number(document.querySelector(".quantity-value").innerHTML);

  if (quantity > 0) {
    quantity = quantity - 1;
    document.querySelector(".quantity-value").innerHTML = quantity;
  }
});

const addCart = document.querySelector(".cart-add");
addCart.addEventListener("click", function () {
  const localQuantity = localStorage.getItem("product") ?? 0;
  const quantity = Number(document.querySelector(".quantity-value").innerHTML);

  if (quantity > 0) {
    localStorage.setItem("product", Number(localQuantity) + Number(quantity));
    document.querySelector(".quantity-value").innerHTML = 0;

    location.reload();
  }
});

// SHOWING CART QUANTITY ICON

const localQuantity = localStorage.getItem("product") ?? 0;
const quantityIcon = document.querySelector(".quantity-icon");
if (Number(localQuantity) === 0) {
  quantityIcon.style.display = "none";
} else {
  quantityIcon.innerHTML = localQuantity;
  quantityIcon.style.display = "flex";
}

// EMPTY OR FILLED CART MODAL

const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.querySelector(".cart-modal");
cartIcon.addEventListener("click", function () {
  if (Number(localQuantity) === 0) {
    cartModal.innerHTML = `
    <h3 class="cart-title">Cart</h3>
    <div class="empty-cart">
      <h3>Your cart is empty.</h3>
    </div>
    `;
  } else {
    const cartPrice = (125 * Number(localQuantity)).toFixed(2);
    cartModal.innerHTML = `
    <h3 class="cart-title">Cart</h3>
    <div class="filled-cart">
      <div class="filled-cart-content">
        <img class="cart-image" src="images/image-product-1.jpg" />
        <p class="cart-price">
          Fall Limited Edition Sneakers<br />
          $125.00 x ${localQuantity} = <strong>$${cartPrice}</strong>
        </p>
        <img class="cart-delete" src="images/icon-delete.svg" />
      </div>
      <button class="cart-checkout">Checkout</button>
    </div>
    `;

    const cartDelete = document.querySelector(".cart-delete");
    cartDelete.addEventListener("click", function () {
      localStorage.removeItem("product");
      location.reload();
    });
  }

  cartModal.classList.toggle("show-cart-modal");

  anime({
    targets: ".cart-modal",
    scale: [0, 1],
  });
});

// THUMBNAIL OVERLAYS

setThumbnails();

function setThumbnails() {
  const thumbnails = document.querySelectorAll(".thumbnail");

  for (i = 0; i < thumbnails.length; i++) {
    const currentImage = document.querySelector(".current-image");

    const thumbnailImage = thumbnails[i].querySelector("img");
    const thumbnailOverlay = thumbnails[i].querySelector(".thumbnail-overlay");

    const thumbnailArray = thumbnailImage.src.split("-");
    const thumbnailIndex = thumbnailArray[thumbnailArray.length - 2];

    thumbnails[i]
      .querySelector(".thumbnail-overlay")
      .addEventListener("click", function () {
        currentImage.src = `/images/image-product-${thumbnailIndex}.jpg`;

        for (j = 0; j < thumbnails.length; j++) {
          thumbnails[j]
            .querySelector(".thumbnail-overlay")
            .classList.remove("thumbnail-selected");
        }

        thumbnailOverlay.classList.add("thumbnail-selected");
      });
  }
}

// MOBILE PREVIOUS/NEXT IMAGE

setArrows();

function setArrows() {
  const previousImage = document.querySelector(".previous-image");
  const nextImage = document.querySelector(".next-image");

  previousImage.addEventListener("click", function () {
    const currentImage = document.querySelector(".current-image");

    const currentIndex = Number(
      currentImage.src.split("-").pop().split(".")[0]
    );
    const previousIndex = currentIndex === 1 ? 4 : currentIndex - 1;

    currentImage.src = `/images/image-product-${previousIndex}.jpg`;

    selectThumbnail(previousIndex - 1);
  });

  nextImage.addEventListener("click", function () {
    const currentImage = document.querySelector(".current-image");

    const currentIndex = Number(
      currentImage.src.split("-").pop().split(".")[0]
    );
    const nextIndex = currentIndex === 4 ? 1 : currentIndex + 1;

    currentImage.src = `/images/image-product-${nextIndex}.jpg`;

    selectThumbnail(nextIndex - 1);
  });
}

function selectThumbnail(i) {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const thumbnailOverlay = thumbnails[i].querySelector(".thumbnail-overlay");

  for (j = 0; j < thumbnails.length; j++) {
    thumbnails[j]
      .querySelector(".thumbnail-overlay")
      .classList.remove("thumbnail-selected");
  }

  thumbnailOverlay.classList.add("thumbnail-selected");
}

// LIGHTBOX

const lightbox = document.querySelector(".lightbox");
const currentImage = document.querySelector(".current-image");

currentImage.addEventListener("click", function () {
  if (window.innerWidth > 600) {
    lightbox.innerHTML = `
      <div class="lightbox-close">
        <img class="lightbox-close-icon"src="images/icon-close.svg" />
      </div>
  
      <div class="preview-current">
        <img class="current-image" src="images/image-product-1.jpg" />
        <img class="previous-image" src="images/icon-previous.svg" />
        <img class="next-image" src="images/icon-next.svg" />
      </div>
      <div class="preview-all">
        <div class="thumbnail">
          <img src="images/image-product-1-thumbnail.jpg" />
          <div class="thumbnail-overlay thumbnail-selected"></div>
        </div>
  
        <div class="thumbnail">
          <img src="images/image-product-2-thumbnail.jpg" />
          <div class="thumbnail-overlay"></div>
        </div>
  
        <div class="thumbnail">
          <img src="images/image-product-3-thumbnail.jpg" />
          <div class="thumbnail-overlay"></div>
        </div>
  
        <div class="thumbnail">
          <img src="images/image-product-4-thumbnail.jpg" />
          <div class="thumbnail-overlay"></div>
        </div>
      </div>
      `;
    lightbox.style.zIndex = "4";
    document.querySelector(".previous-image").style.display = "block";
    document.querySelector(".next-image").style.display = "block";
    setThumbnails();
    setArrows();
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";

    const closeLightbox = document.querySelector(".lightbox-close-icon");
    closeLightbox.addEventListener("click", function () {
      lightbox.innerHTML = "";
      lightbox.style.zIndex = "-1";
      overlay.style.display = "none";
      document.body.style.overflow = "visible";
    });
  }
});
