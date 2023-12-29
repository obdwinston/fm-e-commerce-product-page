// TOGGLING MOBILE MENU

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
