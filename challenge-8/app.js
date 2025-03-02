//elements
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.querySelector("#cart-total h3");
const emptyCartEl = document.querySelector(".empty-cart");
//variables
const state = {
  cartItems: [],
  cartTotalPrice: 0,
};

//// functions

const createItemList = (cartItem) => {
  //create a list wrapper
  const itemEl = document.createElement("li");
  itemEl.classList.add("cart-item");

  //item name
  const itemName = document.createElement("p");
  itemName.textContent = cartItem.item;

  //quantity controles
  const controlWrapper = document.createElement("div");
  controlWrapper.classList.add("quantity-controls");

  //minus quantity btn
  const discardQuantityBtn = document.createElement("button");
  discardQuantityBtn.classList.add("discard-quantity-btn");
  discardQuantityBtn.textContent = "-";
  discardQuantityBtn.addEventListener("click", () => discardQuantity(cartItem));
  controlWrapper.appendChild(discardQuantityBtn);

  //quantity Element
  const quantityEl = document.createElement("span");
  quantityEl.classList.add("quantity");
  quantityEl.textContent = cartItem.quantity;

  controlWrapper.appendChild(quantityEl);

  // plus quantity btn
  const addQuantityBtn = document.createElement("button");
  addQuantityBtn.classList.add("add-quantity-btn");
  addQuantityBtn.textContent = "+";
  addQuantityBtn.addEventListener("click", () => addQuantity(cartItem));
  controlWrapper.appendChild(addQuantityBtn);

  //total price element
  const totalPriceEl = document.createElement("span");
  totalPriceEl.classList.add("total-price");
  totalPriceEl.textContent = cartItem.totalPrice;
  controlWrapper.appendChild(totalPriceEl);

  //removeBtn
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "remove";
  removeBtn.addEventListener("click", () => removeItem(cartItem));
  controlWrapper.appendChild(removeBtn);

  //appending into list wrapper
  itemEl.appendChild(itemName);
  itemEl.appendChild(controlWrapper);
  itemEl.dataset.item = cartItem.item;

  //apen to lists
  cartItemsEl.appendChild(itemEl);
};

const addToCart = (item, price) => {
  //check if there is already item in cart
  const foundItemObj = state.cartItems.find(
    (cartItem) => cartItem.item === item
  );
  if (foundItemObj) {
    addQuantity(foundItemObj);
  } else {
    const cartItem = {
      item,
      price,
      quantity: 1,
      totalPrice: price,
    };

    state.cartItems.push(cartItem);
    toggleEmptyList();
    createItemList(cartItem);
    calculateTotalPrice();
  }
};

const addQuantity = (itemObj) => {
  itemObj.quantity++;
  itemObj.totalPrice = Number((itemObj.quantity * itemObj.price).toFixed(2));
  updateList(itemObj);
  calculateTotalPrice();
};

const discardQuantity = (itemObj) => {
  if (itemObj.quantity > 1) {
    itemObj.quantity--;
    itemObj.totalPrice = Number((itemObj.quantity * itemObj.price).toFixed(2));
    updateList(itemObj);
    calculateTotalPrice();
  }
};

const updateList = (itemObj) => {
  const itemListEl = document.querySelector(`[data-item="${itemObj.item}"]`);
  const quantityEl = itemListEl.querySelector(".quantity");
  quantityEl.textContent = itemObj.quantity;
  const totalPriceEl = itemListEl.querySelector(".total-price");
  totalPriceEl.textContent = itemObj.totalPrice;
};

//calculating cart total price
const calculateTotalPrice = () => {
  const totalPrice = state.cartItems.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );
  cartTotalEl.textContent = "Total: $" + `${totalPrice.toFixed(2)}`;
};

//removing item from cart
const removeItem = (itemObj) => {
  //remove from state
  const index = state.cartItems.indexOf(itemObj);
  //
  state.cartItems.splice(index, 1);
  const itemListEl = document.querySelector(`[data-item="${itemObj.item}"]`);
  itemListEl.remove();
  calculateTotalPrice();
  toggleEmptyList();
};

//toogle empty list
const toggleEmptyList = () => {
  if (state.cartItems.length > 0) {
    emptyCartEl.classList.add("hide");
  } else {
    emptyCartEl.classList.remove("hide");
  }
};
