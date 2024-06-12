async function cadastrarUsuario() {
  try {
    const form = document.getElementById("form-cadastrer");
    const formData = new FormData(form);

    const jsonData = {};

    formData.forEach((value, key) => {
      if (form[key].type === "checkbox" && form[key].checked) {
        if (!jsonData.preferences) {
          jsonData.preferences = [value];
        } else {
          jsonData.preferences.push(value);
        }
      } else {
        jsonData[key] = value;
      }
    });

    const response = await fetch(
      "https://nutrilife-api.onrender.com/NutriLife/api/users/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(jsonData),
      }
    );

    if (!response === 200) {
      throw new Error("Erro ao cadastrar usuário");
    }


    
    const data = await response.json();
    const messageText = `Cadastro realizado com sucesso!`;
    document.getElementById("message-text").textContent = messageText;
    document.getElementById("overlay").style.display = "flex"; 
    
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 5000);

  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    document.getElementById("message").textContent =
      "Erro ao registrar usuário. Por favor, tente novamente mais tarde.";
  }
}

function togglePreferences() {
  const restrictionsDiv = document.getElementById("preferences-container");
  restrictionsDiv.classList.toggle("show");
}



