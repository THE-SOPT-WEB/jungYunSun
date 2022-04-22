const burgers = document.querySelectorAll('article');
const burgersInCart = [];

function handleBurgerDeleteClick(e) {
  const burgerInCart = e.target.parentElement;
  const burgerName = burgerInCart .querySelector(".burger_name").innerText;
  const index = burgersInCart.indexOf(burgerName);
  burgersInCart.splice(index, 1);
  burgerInCart.remove();
}

function addBurgerToCart(clickedBurger) {
  const burgerInCart = document.createElement("div");
  const burgerName = document.createElement("div");
  const burgerCount = document.createElement("input");
  const burgerPrice = document.createElement("div");
  const burgerDelete = document.createElement("button");

  burgerInCart.classList.add("burger_in_cart");
  burgerName.classList.add("burger_name");
  burgerCount.classList.add("burger_count");
  burgerCount.type = "number"
  burgerPrice.classList.add("burger_price");
  burgerDelete.classList.add("burger_delete");

  const cart = document.querySelector(".cart_section");
  const totalPrice = document.querySelector('.total_price > div');
  

  burgerName.innerText = clickedBurger.querySelector("h2").innerText;
  burgerCount.value = 1;
  burgerPrice.innerText = clickedBurger.querySelector("h3").innerText;
  burgerDelete.innerText = "X"

  burgerDelete.addEventListener('click', handleBurgerDeleteClick);

  burgerInCart.appendChild(burgerName);
  burgerInCart.appendChild(burgerCount);
  burgerInCart.appendChild(burgerPrice);
  burgerInCart.appendChild(burgerDelete);
  cart.appendChild(burgerInCart);

  burgersInCart.push(burgerName.innerText);

}

function handleBurgerClick(e) {
  const clickedBurger = e.currentTarget;
  
  addBurgerToCart(clickedBurger);
}

burgers.forEach(burger => {
  burger.addEventListener('click', handleBurgerClick);
});
