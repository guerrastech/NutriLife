
async function buscarReceitas(){
    const url = 'https://gold-anemone-wig.cyclic.app/receitas/todas'

    const response = await fetch(url);
    if(!response.ok){
        throw new Error('não foi possivel achar as receitas')
    }


    const data = await response.json();
    return data.items || [];
}








function criarElementoReceita(receita) {
    const containerFoods = document.querySelector(".card-container");

    const link = document.createElement("button");
    link.className = "card-food-container";
    link.onclick = function() {
        mostrarDetalhe(receita);
    };

    const containner = document.createElement("div");
    containner.className = "card-food";

    const img = document.createElement("img");
    img.src = receita.link_imagem; 
    img.alt = receita.receita; 
    containner.appendChild(img);

    const titulo = document.createElement("h2");
    titulo.className = "card-food-title";
    titulo.innerText = receita.receita; 
    containner.appendChild(titulo);

    link.appendChild(containner);
    containerFoods.appendChild(link);
    return link;
}

(async () => {
    const receitas = await buscarReceitas();
    receitas.forEach(receita => {
        criarElementoReceita(receita);
    });
})();






function mostrarDetalhe(receita) {

        const overlay = document.createElement("div");
        overlay.className = "overlay";
    
        const overlayInner = document.createElement("div");
        overlayInner.className = "overlay-inner";
    
        const close = document.createElement("button");
        close.className = "close";
    
        const i = document.createElement("i");
        close.appendChild(i);
    
        const icon = document.createElement("img");
        icon.src = "../assets/icons-sgv/close.svg";
        i.appendChild(icon);
        overlayInner.appendChild(close);
        close.addEventListener('click', function() {
            overlay.style.display = "none";
        });
    
        overlay.appendChild(overlayInner); 
        document.body.appendChild(overlay); 
    
}

