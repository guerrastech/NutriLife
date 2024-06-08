async function cadastrarUsuario() {
    try {
        const form = document.getElementById('form-cadastrer');
        const formData = new FormData(form);

        const jsonData = {};

        formData.forEach((value, key) => {
            
            if (form[key].type === 'checkbox' && form[key].checked) {
                
                if (!jsonData.preferences) {
                    jsonData.preferences = [value];
                } else {
                    jsonData.preferences.push(value);
                }
            } else {
                
                jsonData[key] = value;
            }
        });

        const response = await fetch('https://nutrilife-api.onrender.com/NutriLife/api/users/create', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }

        const data = await response.json();
        document.getElementById('message').textContent = data.message;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        document.getElementById('message').textContent = 'Erro ao registrar usuário. Por favor, tente novamente mais tarde.';
    }
}


function togglePreferences() {
    var preferencesContainer = document.getElementById('preferences-container');
    preferencesContainer.style.display = preferencesContainer.style.display === 'block' ? 'none' : 'block';
  }
