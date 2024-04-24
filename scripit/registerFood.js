var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var cameraAberta = false;

        function atualizarTextoBotao() {
            var button = document.querySelector('#photo button');
            button.textContent = cameraAberta ? 'Tirar Foto' : 'Cadastrar Comida';
        }

        function tirarFoto() {
            var context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            var dataURL = canvas.toDataURL('image/png');
            var imagem = new Image();
            imagem.src = dataURL;
            document.body.appendChild(imagem);
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