const id = localStorage.getItem('id');



const originalUserData = {}; 

async function fillUserData(user) {
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
}


    function togglePasswordVisibility() {
        const passwordField = document.getElementById("password");
        const showPasswordCheckbox = document.getElementById("show-password-checkbox");
        if (showPasswordCheckbox.checked) {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
    }



    async function reloadData() {
        try {
            const url = `https://nutrilife-api.onrender.com/NutriLife/api/users/get/${id}`;
            const response = await fetch(url, {
                mode: 'cors',
            });
    
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados do usuário');
            }
    
            const user = await response.json();
            fillUserData(user); 
        } catch (error) {
            console.error('Erro ao carregar os dados do usuário:', error);
        }
    }


    document.addEventListener("DOMContentLoaded", function () {

        async function updateData() {
            try {
                const updatedData = {};
    
                
                if (document.getElementById('name').value !== originalUserData.name) {
                    updatedData.name = document.getElementById('name').value;
                }
                if (document.getElementById('email').value !== originalUserData.email) {
                    updatedData.email = document.getElementById('email').value;
                }
    
                
                if (Object.keys(updatedData).length === 0) {
                    console.log('Nenhum dado modificado.');
                    return;
                }
    
                const url = `https://nutrilife-api.onrender.com/NutriLife/api/users/update/${id}`;
                const response = await fetch(url, {
                    mode: 'cors',
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData) 
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao atualizar os dados do usuário');
                }
    
                const user = await response.json();
                fillUserData(user); 
                console.log('Dados do usuário atualizados com sucesso:', user);
            } catch (error) {
                console.error('Erro ao atualizar os dados do usuário:', error);
            }
        }

        const saveChangesButton = document.querySelector('.button-update button');
        saveChangesButton.addEventListener('click', updateData);

        window.onload = reloadData;
    });
    
