// 1- Deixe o arquivo países.json disponível no diretório do seu site. Acesse este arquivo Json via o
// comando fetch e gere um campo do tipo select com os nomes de todos países. Quando o usuário
// escolher um país mostre todos dados disponíveis deste país.
// (Sobre o arquivo: JSON com lista de Países em pt-BR e seus respectivos Gentílicos, Siglas e Nome
// Internacional - Possui todos os países do Google Maps.
// Obtido em: https://gist.github.com/jonasruth/61bde1fcf0893bd35eea)

const url = './paises.json';

const paises = document.querySelector('#paises');
const select = document.querySelector('#select-pais');
const escolher = document.querySelector('#escolher');
const paisInfo = document.querySelector('#pais-info');

escolher.addEventListener('click', () => {
  getPaisInfo(select.value);
});

async function getPaises() {
  const response = await fetch(url);
  const data = await response.json();

  data.map((pais, index) => {
    const nome = document.createElement('option');
    nome.innerText = pais.nome_pais;
    nome.value = index;
    select.appendChild(nome);
  });
}

async function getPaisInfo(pais) {
  const response = await fetch(url);
  const data = await response.json();
  const selecionado = data[pais];

  paisInfo.innerHTML = `
    <h2> ${selecionado.nome_pais}</h2>
    <p> Gentilico: ${selecionado.gentilico} </p>
    <p> Nome em Inglês: ${selecionado.nome_pais_int} </p>
    <p> Sigla: ${selecionado.sigla} </p>
  `;
}

getPaises();
