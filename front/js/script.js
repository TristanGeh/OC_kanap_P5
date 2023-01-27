import { fetchJSON } from "./functions/api.js";

const canape = await fetchJSON('http://localhost:3000/api/products');

function generateArticle(canape){
    for(let i = 0; i< canape.length; i++){
    
        const article =canape[i];
        const sectionItems = document.querySelector(".items");
            // Création de l'ancre
        const ancreCanape = document.createElement("a");
            // lier le href à une autre page
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
    
    
            // Attache des balises à la section items
        sectionItems.appendChild(ancreCanape);
        ancreCanape.appendChild(articleCanape);
        articleCanape.appendChild(imgCanape);
        articleCanape.appendChild(titleCanape);
        articleCanape.appendChild(descCanape)
    }

}
generateArticle(canape)

