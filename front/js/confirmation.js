/**
 * Récupération de l'url
 */
function recupOrderID(){
    const str = window.location.href;
    const url = new URL(str);
    const searchParams = new URLSearchParams(url.search);
    if (searchParams.has('orderId')) {
        const id = searchParams.get('orderId')
        return id
    }
}

function afficherOrderId(id){
    document.querySelector("#orderId").innerHTML= id;
}

function init (){
    const id = recupOrderID();
    afficherOrderId(id);
    localStorage.removeItem('product');
}
// Code principal
init();