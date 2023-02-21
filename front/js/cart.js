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
  const productPrice = canape.price;
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
  input.addEventListener("input", cartQuantityModifications)

  // Création du delete
  const divItmContSettDel = document.createElement("div");
  divItmContSettDel.classList.add("cart__item__content__settings__delete");
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.innerText = "Supprimer";
  deleteItem.addEventListener("click", cartDeleteItem);

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

  return productPrice
}

/**
 * Génération de la feuille panier
 */
async function generateCartSheet() {
  if (productCart) {
    productCart.forEach(async (cartProduct) => {
      const canape = await fetchJSON("http://localhost:3000/api/products/" + cartProduct.productId);
      generateProductArticle(canape, cartProduct);
      calculTotaux();
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
  document.querySelector("#totalQuantity").innerHTML ="";
  calculTotaux();
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
  document.querySelector("#totalQuantity").innerHTML ="";
  calculTotaux();
}
/**
 * Calcul totaux
 */
function calculTotaux(){
  let total = 0
  let totalQuantity = 0
  if (productCart) {
    productCart.forEach(async (cartProduct) => {
    const canape = await fetchJSON("http://localhost:3000/api/products/" + cartProduct.productId);
    total += canape.price * cartProduct.productQuantity;
    totalQuantity += cartProduct.productQuantity;
    afficherTotalQuantity(totalQuantity);
    afficherTotalPrice(total);
    }
  )};
}
/**
 * Affiche le total des articles
 */
function afficherTotalQuantity(totalQuantity) {
  const totalArticle = document.querySelector("#totalQuantity");
  totalArticle.innerText = totalQuantity;
}
/**
 * Affiche le prix total
 */
function afficherTotalPrice(total) {
  const totalPriceElement = document.querySelector("#totalPrice");
  totalPriceElement.innerText = total;
}
/**
 * Initialisation de la récupération des données de l'API et de créations des éléments
 */
async function init() {
  await generateCartSheet();
}
/**
 * Vérification du formulaire
 */
function verifForm() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const ville = document.getElementById("city").value;
  const email = document.getElementById("email").value;

  const firstNameRegex = /^[a-zA-Z]{3,30}$/;
  const lastNameRegex = /^[a-zA-Z]{3,50}$/;
  const addressRegex = /^.{5,150}$/;
  const villeRegex = /^[a-zA-Z]{3,30}$/;
  const emailRegex =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  // Vérification des différents champs
  if (!firstNameRegex.test(firstName)) {
    // Affichage d'un message d'erreur
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Le prénom n'est pas valide";
  }

  if (!lastNameRegex.test(lastName)) {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "Le nom n'est pas valide";
  }

  if (!addressRegex.test(address)) {
    document.getElementById("addressErrorMsg").innerHTML =
      "L'adresse n'est pas valide";
  }

  if (!villeRegex.test(city)) {
    document.getElementById("cityErrorMsg").innerHTML =
      "La ville n'est pas valide";
  }

  if (!emailRegex.test(email)) {
    document.getElementById("emailErrorMsg").innerHTML =
      "L'email n'est pas valide";
  }

  // Envoie si tout est valide
  if (
    firstNameRegex.test(firstName) &&
    lastNameRegex.test(lastName) &&
    addressRegex.test(address) &&
    villeRegex.test(ville) &&
    emailRegex.test(email)
  ) {
    return true;
  } else {
    return false;
  }
}
/**
 * Envoi du formulaire
 */
async function sendForm(){
  verifForm();
  if(verifForm()){
    let contact ={
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      address: `${adresse}`,
      city: `${ville}`,
      email: `${email}`,
    }
    let contactLinea = JSON.stringify(contact)
    let cart = productCart;
    let response = await fetch ("http://localhost:3000/api/products/order", {
      method: 'POST',
      headers:{'Content-type': 'application/json;charset=utf-8'},
      body:JSON.stringify({contactLinea,cart })
    });
    let result = await response.json();
    if(result){
      window.location.href="../html/confirmation.html" + result.orderid;
    }
  }else {
    return false
  }
}


// Le code principal
 init();
document.querySelector("#order").addEventListener("click", sendForm);