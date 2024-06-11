async function login() {
    
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const userData = {
        email: email,
        password: password
    };

    
    try {
        const response = await fetch('https://nutrilife-api.onrender.com/NutriLife/api/users/auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        
        if (response.status === 200) {
            const data = await response.json();
            // const token = data.token; 
            // localStorage.setItem('token', token);

            const id = data.id; 
            localStorage.setItem('id', id);
            
            window.location.href = 'pages/home.html';
        } else {
            alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    } catch (error) {
        
        console.error('Erro ao fazer login:', error);
        alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
}
