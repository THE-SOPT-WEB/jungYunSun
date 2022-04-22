const burgers = document.querySelectorAll('article');
let burgersInCart = {};
let totalPrice = document.querySelector('.total_price > div');
const cart = document.querySelector(".cart_section");
const orderButton = document.querySelector(".order_button_container > button:first-child");
const cancelButton = document.querySelector(".order_button_container > button:last-child");
const modal = document.querySelector(".modal");
const modalBody = document.querySelector("p.modal__body");  
const yesButton = document.querySelector(".modal__yes-button");
const noButton = document.querySelector(".modal__no-button");
const CART_KEY = 'cart';


function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(burgersInCart));
}

function loadCart() {
  const loadedCart = localStorage.getItem(CART_KEY);
  burgersInCart = JSON.parse(loadedCart);
}

function subtractBurgerPrice(burger) {
  const burgerPrice = burger.price * burger.count;
  let oldTotalPrice = totalPrice.innerText.replace(/[^0-9]/g, "");
  oldTotalPrice = Number(oldTotalPrice);
  const newTotalPrice = oldTotalPrice - burgerPrice;
  totalPrice.innerText = newTotalPrice + "원";
}

function handleBurgerDeleteClick(e) {
  const burgerInCart = e.target.parentElement;
  const burgerName = burgerInCart.querySelector(".burger_name").innerText;
  subtractBurgerPrice(burgersInCart[burgerName]);
  delete burgersInCart[burgerName];
  burgerInCart.remove();
  saveCart();
}

function addNewBurgerToCart(burger) {
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

  burgerName.innerText = burger.name;
  burgerCount.value = 1;
  burgerPrice.innerText = burger.priceString;
  burgerDelete.innerText = "X"

  burgerDelete.addEventListener('click', handleBurgerDeleteClick);

  burgerInCart.appendChild(burgerName);
  burgerInCart.appendChild(burgerCount);
  burgerInCart.appendChild(burgerPrice);
  burgerInCart.appendChild(burgerDelete);
  cart.appendChild(burgerInCart);

  burgersInCart[burger.name] = {
    ...burger,
    count: 1,
    countInput: burgerCount
  };

  burgerCount.addEventListener("change", (e) => {
    let newCount = Number(e.target.value);

    if (newCount < 1) {
      handleBurgerDeleteClick(e);
    } else {
      burgersInCart[burger.name].count = newCount;
    }

    saveCart();
  });

}

function addExistingBurgerToCart(burger) {
  burgersInCart[burger.name].count++;
  burgersInCart[burger.name].countInput.value = burgersInCart[burger.name].count;
}

function addBurgerPrice(burger) {
  const burgerPrice = burger.price;
  let oldTotalPrice = totalPrice.innerText.replace(/[^0-9]/g, "");
  oldTotalPrice = Number(oldTotalPrice);
  const newTotalPrice = oldTotalPrice + burgerPrice;
  totalPrice.innerText = newTotalPrice + "원";
}

function handleBurgerClick(e) {
  const clickedBurger = e.currentTarget;
  const clickedBurgerName = clickedBurger.querySelector("h2").innerText;
  
  // 장바구니 금액 "X,XXX원" 형식 표시용
  let clickedBurgerPriceString = clickedBurger.querySelector("h3").innerText;
  
  // 금액 Number 형식으로 변환
  let clickedBurgerPrice = clickedBurgerPriceString.replace(/[^0-9]/g, "");
  clickedBurgerPrice = Number(clickedBurgerPrice);

  let burger = {
    name: clickedBurgerName,
    price: clickedBurgerPrice,
    priceString: clickedBurgerPriceString
  };

  if (burgersInCart[clickedBurgerName]) {
    addExistingBurgerToCart(burger);
  } else {
    addNewBurgerToCart(burger);
  }

  addBurgerPrice(burger);
  saveCart();
}

burgers.forEach(burger => {
  burger.addEventListener('click', handleBurgerClick);
});

cancelButton.addEventListener('click', () => {
  const allBurgers = document.querySelectorAll(".burger_in_cart");
  allBurgers.forEach(burger => {
    burger.remove();
  });
  burgersInCart = {};
  totalPrice.innerText = "0원";

  saveCart();
});

function showModal(modalContent) {
  modalBody.innerText = modalContent;
  modal.classList.remove("hide");
}

noButton.addEventListener('click', () => {
  modal.classList.add("hide");
})

orderButton.addEventListener('click', () => {
  showModal('정말 주문하시겠어요?');
})

window.addEventListener('load', () => {
  let oldTotalPrice = 0;

  loadCart();
  for(const localBurgerName in burgersInCart) {
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
  
    burgerName.innerText = localBurgerName;
    burgerCount.value = burgersInCart[localBurgerName].count;
    burgerPrice.innerText = burgersInCart[localBurgerName].priceString;
    burgerDelete.innerText = "X"
  
    burgerDelete.addEventListener('click', handleBurgerDeleteClick);
  
    burgerInCart.appendChild(burgerName);
    burgerInCart.appendChild(burgerCount);
    burgerInCart.appendChild(burgerPrice);
    burgerInCart.appendChild(burgerDelete);
    cart.appendChild(burgerInCart);

    burgerCount.addEventListener("change", (e) => {
      let newCount = Number(e.target.value);
  
      if (newCount < 1) {
        handleBurgerDeleteClick(e);
      } else {
        burgersInCart[localBurgerName].count = newCount;
      }
  
      saveCart();
    }
    );
    let newTotalPrice = oldTotalPrice + burgersInCart[localBurgerName].price * burgersInCart[localBurgerName].count
    oldTotalPrice = newTotalPrice;
  }
  totalPrice.innerText = oldTotalPrice + "원";
})

// burgersInCart 안에 있는거 그리기
// 누적금액 그리기
// input 작살난거 돌려놓기