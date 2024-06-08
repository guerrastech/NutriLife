async function buscarReceitas() {
    const url = 'https://nutrilife-api.onrender.com/NutriLife/api/revenues/get';
    const response = await fetch(url, {
        mode: 'cors', 
    });
    if (!response.ok) {
        throw new Error('Não foi possível encontrar as receitas');
    }
    return await response.json();
}


function criarElementoReceita(receita) {
    const id = receita.id

    const containerFoods = document.querySelector(".card-container");

    const link = document.createElement("button");
    link.className = "card-food-container";
    link.onclick = function() {
        mostrarDetalhe(receita._id);
    };

    const containner = document.createElement("div");
    containner.className = "card-food";

    const img = document.createElement("img");
    img.src = receita.img_url; 
    img.alt = receita.title; 
    containner.appendChild(img);

    const titulo = document.createElement("h2");
    titulo.className = "card-food-title";
    titulo.innerText = receita.title; 
    containner.appendChild(titulo);

    link.appendChild(containner);
    containerFoods.appendChild(link);
    return link;
}

async function mostrarDetalhe(id) {
    const url = `https://nutrilife-api.onrender.com/NutriLife/api/revenues/get/id/${id}`;
    const response = await fetch(url, {
        mode: 'cors', 
    });
    if (!response.ok) {
        throw new Error('Não foi possível obter as informações da receita');
    }
    const receita = await response.json();

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const overlayInner = document.createElement("div");
    overlayInner.className = "overlay-inner";

    const close = document.createElement("button");
    close.className = "close";
    close.innerHTML = '<i><img src="../assets/icons-sgv/close.svg"></i>';
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

async function carregarReceitas() {
    const receitas = await buscarReceitas();
    receitas.forEach(receita => {
        criarElementoReceita(receita);
    });
}

carregarReceitas();
