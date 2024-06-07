// Dados de exemplo para os gráficos
const weightData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
        label: 'Peso (kg)',
        data: [72, 71, 70, 69, 68, 67],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1
    }]
};

const caloriesData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [{
        label: 'Calorias Ingeridas',
        data: [1900, 2000, 1800, 2100, 2000, 2200, 1800],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

const macrosData = {
    labels: ['Proteínas', 'Carboidratos', 'Gorduras'],
    datasets: [{
        label: 'Macronutrientes',
        data: [140, 230, 65],
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
    }]
};

const configWeight = {
    type: 'line',
    data: weightData,
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
};

const configCalories = {
    type: 'bar',
    data: caloriesData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const configMacros = {
    type: 'pie',
    data: macrosData,
};

// Inicialização dos gráficos
window.onload = function() {
    const ctxWeight = document.getElementById('weightChart').getContext('2d');
    new Chart(ctxWeight, configWeight);

    const ctxCalories = document.getElementById('caloriesChart').getContext('2d');
    new Chart(ctxCalories, configCalories);

    const ctxMacros = document.getElementById('macrosChart').getContext('2d');
    new Chart(ctxMacros, configMacros);
}
