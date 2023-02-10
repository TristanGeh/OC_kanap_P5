import { fetchJSON } from "./functions/api.js";
// Les fonctions
/**
 * Création du code HTML
 * @param {*} article 
 */
function generateArticle(article){
        // Création de l'ancre
    const ancreCanape = document.createElement("a");
    ancreCanape.href ="./product.html?id=" + article._id;     
       //Création de l'artcle + ses balises internes
    const articleCanape = document.createElement("article");
    const imgCanape = document.createElement("img");
    imgCanape.src = article.imageUrl;
    imgCanape.alt = article.altTxt;
    const titleCanape = document.createElement("h3");
    titleCanape.classList.add (`productName`);
    titleCanape.innerText = article.name;
    const descCanape = document.createElement("p");
    descCanape.classList.add (`productDescription`);
    descCanape.innerText = article.description;

    ancreCanape.appendChild(articleCanape);
    articleCanape.appendChild(imgCanape);
    articleCanape.appendChild(titleCanape);
    articleCanape.appendChild(descCanape)

    return ancreCanape;
}

/**
 * Récupération des données de l'API
 */
async function generateArticles() {
    const canapes = await fetchJSON('http://localhost:3000/api/products');
    canapes.forEach(element => {
        const card = generateArticle(element)
        const sectionItems = document.querySelector(".items");
        sectionItems.appendChild(card)
    }); 
}
/**
 * 
 */
async function init(){
    await generateArticles();
}
// Le code principal 
init();
