async function buscarReceitas() {
    const url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=90097308c4ca4180a5165c20937e9460&diet=vegetarian';
    const response = await fetch(url, {
        mode: 'cors', 
    });
    if (!response.ok) {
        throw new Error('Não foi possível encontrar as receitas');
    }
    return await response.json();
}


    async function buscarReceitasPreparo(id) {
    const url = 'https://api.spoonacular.com/recipes/${id}/information?apiKey=90097308c4ca4180a5165c20937e9460';
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
        mostrarDetalhe(receita.id);
    };

    const containner = document.createElement("div");
    containner.className = "card-food";

    const img = document.createElement("img");
    img.src = receita.image; 
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
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=618b416857db4fc1a12e6026031c4197`;
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

    if (receita.analyzedInstructions && receita.analyzedInstructions.length > 0) {
        const instructionsTitle = document.createElement("h2");
        instructionsTitle.innerText = "Modo de preparo:";
        overlayInner.appendChild(instructionsTitle);

        const instructionsList = document.createElement("ol");
        receita.analyzedInstructions.forEach(instruction => {
            instruction.steps.forEach(step => {
                const instructionItem = document.createElement("li");
                instructionItem.innerText = step.step;
                instructionsList.appendChild(instructionItem);
            });
        });
        overlayInner.appendChild(instructionsList);
    } else {
        const noInstructions = document.createElement("p");
        noInstructions.innerText = "Não há instruções disponíveis para esta receita.";
        overlayInner.appendChild(noInstructions);
    }

    overlay.appendChild(overlayInner);
    document.body.appendChild(overlay);

    overlay.style.display = "block";
}











    async function carregarReceitas() {
        const { results } = await buscarReceitas();
        results.forEach(receita => {
            criarElementoReceita(receita);
        });
        console.log(results)
    }

    carregarReceitas();