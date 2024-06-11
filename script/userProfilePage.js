// const token = localStorage.getItem('token');
// const decodedToken = jwt_decode(token);
// console.log(decodedToken);

const id = localStorage.getItem('id');




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


window.onload = reloadData;