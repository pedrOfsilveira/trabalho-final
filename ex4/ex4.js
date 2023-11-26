const divAny = document.querySelector('#any');
const divRace = document.querySelector('#race');
const divAll = document.querySelector('#all');

document.getElementById('btnPromiseAny').addEventListener('click', async () => {
  try {
    const urls = [
      'https://www.boredapi.com/api/activity',
      'https://dog.ceo/api/breeds/image/random',
      'https://randomfox.ca/floof/',
    ];
    const promises = urls.map(url => fetch(url));

    const response = await Promise.any(promises);

    const data = await response.json();

    divAny.innerHTML = `<p> Promise.Any: <pre>${JSON.stringify(
      data,
      null,
      2
    )}</pre> </p>`;
  } catch (error) {
    console.error('Erro em Promise.any:', error);
  }
});

document
  .getElementById('btnPromiseRace')
  .addEventListener('click', async () => {
    try {
      const urls = [
        'https://www.boredapi.com/api/activity',
        'https://dog.ceo/api/breeds/image/random',
        'https://randomfox.ca/floof/',
      ];
      const promises = urls.map(url => fetch(url));

      const response = await Promise.race(promises);

      const data = await response.json();

      console.log('Promise.race:', data);
      divRace.innerHTML = `<p> Promise.Race: <pre>${JSON.stringify(
        data,
        null,
        2
      )}</pre> </p>`;
    } catch (error) {
      console.error('Erro em Promise.race:', error);
    }
  });

document.getElementById('btnPromiseAll').addEventListener('click', async () => {
  try {
    const urls = [
      'https://www.boredapi.com/api/activity',
      'https://dog.ceo/api/breeds/image/random',
      'https://randomfox.ca/floof/',
    ];
    const promises = urls.map(url => fetch(url));

    const responses = await Promise.all(promises);

    const data = await Promise.all(responses.map(response => response.json()));

    console.log('Promise.all:', data);
    divAll.innerHTML = `<p> Promise.All: <pre>${JSON.stringify(
      data,
      null,
      2
    )}</pre> </p>`;
  } catch (error) {
    console.error('Erro em Promise.all:', error);
  }
});
