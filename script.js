function calcularPandeo() {
    const E = parseFloat(document.getElementById('modulus').value);
    const I = parseFloat(document.getElementById('moment').value);
    const L = parseFloat(document.getElementById('length').value);
  
    const datos = {
      E: E,
      I: I,
      L: L
    };
  
    fetch('https://pandeomaster-production.up.railway.app/calcular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del servidor:", data);
      const resultadoContainer = document.getElementById('resultadoContainer');
      resultadoContainer.textContent = `La respuesta es: ${data.cargaCritica}`;
  
      actualizarGrafico(data.cargaCritica);
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
    });
  }
  
  let myChart = null;
  
  function actualizarGrafico(resultado) {
    if (myChart) {
      myChart.destroy();
    }
  
    const datos = {
      labels: ['Carga Crítica de Pandeo'],
      datasets: [{
        label: 'Carga Crítica de Pandeo',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [resultado]
      }]
    };
  
    const opciones = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Carga Crítica de Pandeo'
          }
        }
      }
    };
  
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'bar',
      data: datos,
      options: opciones
    });
  }
  