import { fetchJSON } from "./functions/api.js";
// Les variables globales
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");

// Récupération des données du local storage
const localData = localStorage.getItem("product");
const productInf = localData ? JSON.parse(localData) : [];

// LOCAL STORAGE
//Ajout d'un produit au local storage
function addToCart() {
  // Récuperer la couleur
  let select = document.getElementById("colors");
  let colorValue = select.options[select.selectedIndex].value;
  // Récuperer la quantité souhaitée
  let itemQuantityString = document.getElementById("quantity").value;
  let itemQuantity = parseInt(itemQuantityString);

  if (itemQuantity === 0) {
    return;
  }
  let existingProduct = productInf.find(function (product) {
    return product.productId === id && product.productColor === colorValue;
  });
  if (existingProduct) {
    existingProduct.productQuantity += itemQuantity;
  } else {
    let newProduct = {
      productId: id,
      productColor: colorValue,
      productQuantity: itemQuantity,
    };
    productInf.push(newProduct);
  }

  localStorage.setItem("product", JSON.stringify(productInf));
}

//DOM
// Les fonctions
/**
 * Génération des éléments descriptifs du produit
 * @param {*} product
 */
function generateProduct(product) {
  const itemImg = document.querySelector(".item__img");
  const productImage = document.createElement("img");
  const title = document.querySelector("#title");
  const price = document.querySelector("#price");
  const desc = document.querySelector("#description");
  const colors = document.querySelector("#colors");
  for (let color of product.colors) {
    const colorsChoice = document.createElement("option");
    colorsChoice.setAttribute("value", color);
    colorsChoice.textContent = color;
    colors.appendChild(colorsChoice);
  }
  productImage.src = product.imageUrl;
  productImage.alt = product.altTxt;
  title.innerText = product.name;
  price.innerText = product.price;
  desc.innerText = product.description;

  itemImg.appendChild(productImage);
}

/**
 * Récupération des données de l'API
 */
async function generateProductSheet() {
  const canapes = await fetchJSON("http://localhost:3000/api/products/" + id);
  generateProduct(canapes);
}
/**
 * Initialisation de la récupération des données de l'API et de créations des éléments
 */
async function init() {
  await generateProductSheet();
}
// Le code principal
init();
let addCart = document.querySelector("#addToCart");
addCart.addEventListener("click", addToCart);
