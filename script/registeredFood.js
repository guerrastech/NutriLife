function criarElementoFood(food) {

    const containerFoods = document.querySelector("card-container");

    const link = document.createElement("a");
    link.className = "card-food-container";
    link.onclick = function(){
        mostrarDetalhe();
    };

    const containner = document.createElement("div");
    containner.className = "card-food";

    const img = document.createElement("img");

    const titulo = document.createElement('h2')
    titulo.className = "card-food-title";
    

    
    const title = document.createElement("h3");
    title.innerText = livro.volumeInfo.title;

    containner.appendChild(title);
    containner.appendChild(img);
    link.appendChild(containner);
    containerFoods.appendChild(link);
    document.body.appendChild(link);
    return link;
    
}






function mostrarDetalhe() {

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

