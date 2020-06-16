// Selectors
const dateDiv = document.querySelector(".date");
const itemInput = document.querySelector(".item-input");
const itemButton = document.querySelector(".item-button");
const groceryList = document.querySelector(".grocery-list");
let items = [];

// Date
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const date = new Date();
dateDiv.innerHTML = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;

// Event listeners
document.addEventListener("DOMContentLoaded", getLocalItem);
itemButton.addEventListener("click", addItem);
groceryList.addEventListener("click", areaClicked);
itemInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    addItem();
  }
});

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//Functions
function createDiv(item) {
  if (item.length > 0) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-div");
    itemDiv.innerHTML = `<li class="item-list">${item}</li>
                         <button class="check-btn"><i class='fas fa-check'></i></button>
                         <button class="delete-btn"><i class='fas fa-trash'></i></button>`;
    groceryList.appendChild(itemDiv);
  }
}

function addItem() {
  const newItem = itemInput.value;
  createDiv(newItem);
  saveLocalItem(newItem);
  itemInput.value = "";
}

function deleteItem(item) {
  item.classList.add("fall");
  item.addEventListener("transitionend", function () {
    this.remove();
  });
}

function checkItem(item) {
  item.classList.toggle("completed");
}

function areaClicked(e) {
  const item = e.target;
  const itemList = item.parentElement;
  const classItem = item.classList[0];

  if (classItem === "delete-btn") {
    deleteItem(itemList);
    removeLocalItem(itemList);
  } else if (classItem === "check-btn") {
    checkItem(itemList);
  }
}

function checkStorage() {
  const isLocaleStorageEmpty = localStorage.getItem("items") === null;
  if (!isLocaleStorageEmpty) {
    items = JSON.parse(localStorage.getItem("items"));
  }
}

function saveLocalItem(item) {
  checkStorage();
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
}

function getLocalItem() {
  checkStorage();
  items.forEach(createDiv);
}

function removeLocalItem(item) {
  checkStorage();
  const itemIndex = item.children[0].innerText;
  items.splice(items.indexOf(itemIndex), 1);
  localStorage.setItem("items", JSON.stringify(items));
}
