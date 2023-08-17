import images from "./images"
const apiUrl = 'http://127.0.0.1:8000/api/dash';
// Realizar la solicitud a la API utilizando fetch()
const fechas = [];
const temperaturas = [];

fetch(apiUrl)
  .then(response => {
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error('Hubo un problema al obtener los datos.');
    }
    // Parsear la respuesta a formato JSON
    return response.json();
  })
  .then(data => {
    // Hacer algo con los datos obtenidos, por ejemplo, imprimirlos en la consola
    console.log(data);

    data.forEach(item => {
        const fecha = item.Date_Time.$date;
        const temperatura = item.ToC;
  
        fechas.push(fecha);
        temperaturas.push(temperatura);
      });
  
      // Ahora puedes trabajar con las variables fechas y temperaturas
      console.log("Fechas:", fechas);
      console.log("Temperaturas:", temperaturas);
  })
  .catch(error => {
    // Capturar errores de red u otros errores
    console.error('Error:', error);
  });
  const temperaturasNumeros = temperaturas.map(temp => parseFloat(temp));
const ultimoDatoTemperaturas = temperaturasNumeros[temperaturasNumeros.length - 1];

console.log("Temperaturas como números:", temperaturasNumeros);
console.log("Último dato de temperaturas:", ultimoDatoTemperaturas);

  const apiUrl2 = 'http://127.0.0.1:8000/api/dash';

  const fechas1 = [];
  const temperaturas1 = [];
  
  fetch(apiUrl2)
    .then(response => {
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos.');
      }
      // Parsear la respuesta a formato JSON
      return response.json();
    })
    .then(data => {
      // Hacer algo con los datos obtenidos, por ejemplo, imprimirlos en la consola
      console.log(data);
  
      data.forEach(item => {
          const fecha = item.Date_Time.$date;
          const temperatura = item.RH;
    
          fechas1.push(fecha);
          temperaturas1.push(temperatura);
        });
    
        // Ahora puedes trabajar con las variables fechas y temperaturas
        console.log("Fechas:", fechas1);
        console.log("Temperaturas:", temperaturas1);
    })
    .catch(error => {
      // Capturar errores de red u otros errores
      console.error('Error:', error);
    });
    const ultimoDatoLux = temperaturas1[temperaturas1.length - 2];
    console.log("Último dato de Lux:", ultimoDatoLux);
  
const data = {

    
    user: {
        name: 'Administrator',
        img: images.avt
    },
    summary: [
        {
            title: 'Temperatura Actual',
            subtitle: 'No recomendable por encima de 26',
            value: parseFloat(ultimoDatoTemperaturas),
            percent: parseFloat(26/ultimoDatoTemperaturas)
        },
       
        {
            title: 'Luz Actual',
            subtitle: 'Lumenes, 500 recomendables',
            value: ultimoDatoLux,
            percent: (500/ultimoDatoLux)
        }
    ],
    revenueSummary: {
        title: 'Revenue',
        value: '$678',
        chartData: {
            labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
            data: [300, 300, 280, 380, 200, 300, 280, 350]
        }
    },
    overall: [
        {
            value: '300K',
            title: 'Orders'
        },
        {
            value: '9.876K',
            title: 'Customers'
        },
        {
            value: '1.234K',
            title: 'Products'
        },
        {
            value: '$5678',
            title: 'Revenue'
        }
    ],
    revenueByChannel: [
        {
            title: 'Direct',
            value: 70
        },
        {
            title: 'External search',
            value: 40
        },
        {
            title: 'Referal',
            value: 60
        },
        {
            title: 'Social',
            value: 30
        }
    ],
    revenueByMonths: {
        labels: fechas,
        data:temperaturas,
        labels1: fechas1,
        data1: temperaturas1
    }
}

export default data