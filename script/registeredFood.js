const id = localStorage.getItem('id');

async function buscarRefeicao() {
    const url = `https://nutrilife-api.onrender.com/NutriLife/api/meals/get/${id}`;
    const response = await fetch(url, {
        mode: 'cors', 
    });
    if (!response.ok) {
        throw new Error('Não foi possível encontrar as refeições');
    }
    return await response.json();
}

function criarElementoRefeicao(refeicao) {

    const containerFoods = document.querySelector(".card-container");

    const link = document.createElement("a");
    link.className = "card-food-container";
    link.onclick = () => {
        mostrarDetalhe(refeicao._id);
    };

    const containner = document.createElement("div");
    containner.className = "card-food";

    const img = document.createElement("img");
    img.src = refeicao.img_url; 
    img.alt = refeicao.title; 
    containner.appendChild(img);

    const titulo = document.createElement('h2')
    titulo.className = "card-food-title";
    titulo.innerText = refeicao.title; 
    containner.appendChild(titulo);

    
    link.appendChild(containner);
    containerFoods.appendChild(link);
    return link;
}

async function  mostrarDetalhe(id) {

        const url = `https://nutrilife-api.onrender.com/NutriLife/api/meals/get/id/${id}`;
        const response = await fetch(url, {
            mode: 'cors', 
        });
        if (!response === 200) {
            throw new Error('Não foi possível obter as informações da receita');
        }
        const receita = await response.json();


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
        overlayInner.appendChild(close);

        const img = document.createElement("img");
        img.src = receita.img_url; 
        img.alt = receita.title; 
        overlayInner.appendChild(img);
    
        const titulo = document.createElement("h2");
        titulo.className = "card-food-title";
        titulo.innerText = receita.title; 
        overlayInner.appendChild(titulo);
    
        const descricao = document.createElement("p");
        descricao.innerText = receita.description; 
        overlayInner.appendChild(descricao);
    
        overlay.appendChild(overlayInner);
        document.body.appendChild(overlay);
        overlay.style.display = "block";
    
}

async function carregarRefeicao() {
    const refeicoes = await buscarRefeicao();
    refeicoes.forEach(refeicao => {
        criarElementoRefeicao(refeicao);
    });
}

carregarRefeicao();

