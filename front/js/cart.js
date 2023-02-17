import { fetchJSON } from "./functions/api.js";
// LOCAL STORAGE
// Récupération du panier
const productCartLinea = localStorage.getItem("product");
const productCart = productCartLinea ? JSON.parse(productCartLinea) : [];
// Les fonctions
function generateProductArticle(canape, cartProduct) {
  // Création article
  const articleCart = document.createElement("article");
  articleCart.classList.add("cart__item");
  articleCart.setAttribute("data-id", `${cartProduct.productId}`);
  articleCart.setAttribute("data-color", `${cartProduct.productColor}`);
  // Création img
  const divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");
  const productImage = document.createElement("img");
  productImage.src = canape.imageUrl;
  productImage.alt = canape.altTxt;
  // Création item content
  const divItmCont = document.createElement("div");
  divItmCont.classList.add("cart__item__content");
  const divItmContDesc = document.createElement("div");
  divItmContDesc.classList.add("cart__item_content__description");
  const title = document.createElement("h2");
  title.innerText = canape.name;
  const color = document.createElement("p");
  color.innerText = cartProduct.productColor;
  const price = document.createElement("p");
  price.innerText = canape.price + "€";
  // Création item content settings
  const divItmContSett = document.createElement("div");
  divItmContSett.classList.add("cart__item__content__settings");
  const divItmContSettQuant = document.createElement("div");
  divItmContSettQuant.classList.add("cart__item__content__settings__quantity");
  const quantity = document.createElement("p");
  quantity.innerText = "Qté :";
  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.setAttribute("value", cartProduct.productQuantity);

  // Création du delete
  const divItmContSettDel = document.createElement("div");
  divItmContSettDel.classList.add("cart__item__content__settings__delete");
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.innerText = "Supprimer";

  // Création dans le DOM
  const cartItems = document.querySelector("#cart__items");
  cartItems.appendChild(articleCart);
  articleCart.appendChild(divImg);
  articleCart.appendChild(divItmCont);
  divImg.appendChild(productImage);
  divItmCont.appendChild(divItmContDesc);
  divItmCont.appendChild(divItmContSett);
  divItmContDesc.appendChild(title);
  divItmContDesc.appendChild(color);
  divItmContDesc.appendChild(price);
  divItmContSett.appendChild(divItmContSettQuant);
  divItmContSett.appendChild(divItmContSettDel);
  divItmContSettQuant.appendChild(quantity);
  divItmContSettQuant.appendChild(input);
  divItmContSettDel.appendChild(deleteItem);
}

/**
 * Génération de la feuille panier
 */
function generateCartSheet() {
  if (productCart) {
    productCart.forEach(async (cartProduct) => {
      const canape = await fetchJSON(
        "http://localhost:3000/api/products/" + cartProduct.productId
      );
      generateProductArticle(canape, cartProduct);
      totalQuantity();
      totalPrice(canape);
    });
  }
}
/**
 * Gestion de la modification de la quantité
 */
function cartQuantityModifications(event) {
  const element = event.target;
  const article = element.closest(".cart__item");
  const productId = article.dataset.id;
  const productColor = article.dataset.color;
  const productQuantityStr = element.value;
  const productQuantity = parseInt(productQuantityStr);

  for (let i = 0; i < productCart.length; i++) {
    if (
      productCart[i].productId === productId &&
      productCart[i].productColor === productColor
    ) {
      productCart[i].productQuantity = productQuantity;
    }
  }
  localStorage.setItem("product", JSON.stringify(productCart));
}
/**
 * Suppression d'un article
 */
function cartDeleteItem(event) {
  const element = event.target;
  const article = element.closest(".cart__item");
  const productId = article.dataset.id;
  const productColor = article.dataset.color;
  for (let i = 0; i < productCart.length; i++) {
    if (
      productCart[i].productId === productId &&
      productCart[i].productColor === productColor
    ) {
      productCart.splice(i, 1);
    }
  }
  localStorage.setItem("product", JSON.stringify(productCart));
  article.remove();
}
/**
 * Affiche le total des articles
 */
function totalQuantity() {
  // calcul du total du nombres d'articles
  let totalQuantity = 0;
  if (productCart) {
    productCart.forEach((productTotal) => {
      totalQuantity += productTotal.productQuantity;
    });
  }
  // L'ajoute au DOM
  const totalArticle = document.querySelector("#totalQuantity");
  totalArticle.innerText = totalQuantity;
}
/**
 * Affiche le prix total
 */
function totalPrice(canape) {
  //Calcul le prix total
  let totalPrice = 0;
  if (productCart) {
    productCart.forEach((product) => {
      totalPrice += canape.price * product.productQuantity;
    });
  }
  // L'ajoute au DOM
  const totalPriceElement = document.querySelector("#totalPrice");
  totalPriceElement.innerText = totalPrice;
}
/**
 * Initialisation de la récupération des données de l'API et de créations des éléments
 */
async function init() {
  await generateCartSheet();
}
// Le code principal
init();
// Modification de la quantité
let cartQuantityModif = document.querySelectorAll(".itemQuantity");
cartQuantityModif.forEach((inputElement) =>
  inputElement.addEventListener("input", () => {
    console.log("modification");
  })
);
// Suppression d'un article
let cartDelete = document.querySelectorAll(".deleteItem");
cartDelete.forEach((item) => {
  item.addEventListener("click", () => {
    console.log("input");
  });
});
