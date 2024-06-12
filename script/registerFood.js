var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var cameraAberta = false;

function atualizarTextoBotao() {
    var button = document.querySelector('#photo button');
    button.textContent = cameraAberta ? 'Tirar Foto' : 'Salvar Foto';
}

async function tirarFoto() {
    var context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('file', blob);
            formData.append('upload_preset', 'r2hjf5ed');

            fetch('https://api.cloudinary.com/v1_1/dfrngbz8u/image/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                resolve(data.secure_url);
            })
            .catch(error => {
                reject(error);
            });
        });
    });
}

document.querySelector('#photo').addEventListener('click', () => {
    if (!cameraAberta) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
                cameraAberta = true;
                atualizarTextoBotao();
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        video.pause();
        video.srcObject.getTracks()[0].stop();
        cameraAberta = false;
        atualizarTextoBotao();

    }
});

const form = document.getElementById('form-food');
const id = localStorage.getItem('id');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {

        const imgUrl = await tirarFoto();

        const title = document.getElementById('value-cad').value;
        const description = document.querySelector('textarea').value;
        const calories = document.getElementById('value').value;

        const mealData = {
            userId: id,
            title: title,
            description: description,
            calories: calories,
            img_url: imgUrl 
        };

        const response = await fetch('https://nutrilife-api.onrender.com/NutriLife/api/meals/create/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mealData)
        });

        if (response.ok) {
            console.log('Refeição cadastrada com sucesso!');
            setTimeout(function() {
                window.location.href = "home.html";
            }, 5000);
        } else {
            console.error('Erro ao cadastrar refeição:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao cadastrar refeição:', error.message);
    }
});