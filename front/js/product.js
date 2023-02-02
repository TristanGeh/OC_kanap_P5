import { fetchJSON } from "./functions/api.js";
// Les fonctions 
/**
 * Génération des éléments descriptifs du produit
 * @param {*} product 
 */
function generateProduct (product){
    const itemImg = document.querySelector (".item__img");
    const productImage = document.createElement("img");
    const title = document.querySelector ("#title");
    const price = document.querySelector ("#price");
    const desc = document.querySelector ("#description");
    const colors = document.querySelector ("#colors");
    for (let color of product.colors){
        const colorsChoice = document.createElement ("option");
        colorsChoice.setAttribute ("value" , color);
        colorsChoice.textContent = color;
        colors.appendChild(colorsChoice)
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
    //Constantes URL
    const str = window.location.href;
    const url = new URL (str);
    const id = url.searchParams.get("id");
    const canapes = await fetchJSON('http://localhost:3000/api/products/'+ id);
    generateProduct(canapes); 
}
/**
 * Initialisation de la récupération des données de l'API et de créations des éléments
 */
async function init(){
    await generateProductSheet();
}
// Le code principal 
init();
