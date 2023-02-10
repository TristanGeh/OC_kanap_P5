import { fetchJSON } from "./functions/api.js";
// LOCAL STORAGE
// Récupération du panier
let productCartLinea = localStorage.getItem("product");
let productCart = JSON.parse(productCartLinea);
// Les fonctions
function generateCart(product){
        // Création article
    const articleCart = document.createElement("article");
    articleCart.classList.add("cart__item");
    articleCart.setAttribute("data-id", `${productCart.productId}`);
    articleCart.setAttribute("data-color",`${productCart.productColor}`);
        // Création img
    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    const productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;
        // Création item content
    const divItmCont = document.createElement("div");
    divItmCont.classList.add("cart__item_content");
    const divItmContDesc = document.createElement("div");
    divItmContDesc.classList.add("cart__item_content__description");
    const title = document.createElement("h2");
    title.innerText = product.name;
    const color = document.createElement("p");
    color.innerText = productCart.productColor;
    const price = document.createElement("p");
    price.innerText = product.price;
        // Création item content settings
    const divItmContSett = document.createElement("div");
    divItmContSett.classList.add("cart__item__content__settings")
    const divItmContSettQuant = document.createElement("div");
    divItmContSettQuant.classList.add("cart__item__content__settings__quantity");
    const quantity = document.createElement("p");
    quantity.innerText = "Qté :";
    const input = document.createElement("input");
    input.type = "number";
    input.className = "itemQuantity";
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = productCart.productQuantity;
        // Création du delete
    const divItmContSettDel = document.createElement("div");
    divItmContSettDel.classList.add("cart__item__content__settings__delete");
    const deleteItem = document.createElement("p");
    deleteItem.innerText = "Supprimer"

        // Création dans le DOM
    const cartItems = document.querySelector("#cart__items")
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
    divItmContSettDel.appendChild(deleteItem)


    
}

/**
 * Récupération des données de l'API
 */
async function generateCartSheet() {
    const canapes = await fetchJSON('http://localhost:3000/api/products/'+ productCart.productId);
    generateCart(canapes); 
}
/**
 * Initialisation de la récupération des données de l'API et de créations des éléments
 */
async function init(){
    await generateCartSheet();
}
// Le code principal 
init();