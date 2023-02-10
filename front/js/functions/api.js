// Appel de l'API
export async function fetchJSON (url){
    const r = await fetch(url)
    if (r.ok){
        return r.json()
    }else {
        throw new Error("Erreur de collecte de données");
    }
}
