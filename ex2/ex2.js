// 2- Faça uma página de utilidade pública baseada em consultas ao https://brasilapi.com.br/ . Em
// todos casos (Nos 6 casos) utilize o comando fetch e proteja as chamadas com try/catch ou
// then/catch.
// • Faça 3 consultas via programação e mostre os resultados na tela
// • Faça 3 perguntas para o usuário via formulário. Para cada consulta mostre os resultados.
// • Coloque para cada caso uma explicação para o usuário saber o que ele está vendo ou
// escolhendo

const inputCidade = document.querySelector('#input-cidade');
const pesquisarCidade = document.querySelector('#pesquisar-cidade');
const selectDiv = document.querySelector('#select-div');
const selectCidade = document.querySelector('#select-cidade');
const escolherCidade = document.querySelector('#escolher-cidade');
const previsaoDiv = document.querySelector('#previsao');
const errorDiv = document.querySelector('#error-div');
const ondasDiv = document.querySelector('#ondas-div');
const livrosDiv = document.querySelector('#livros');
let livroQuantidade = 0;

pesquisarCidade.addEventListener('click', () => {
  buscaCidade(inputCidade.value);
  inputCidade.value = '';
});

escolherCidade.addEventListener('click', () => {
  buscaPrevisao(selectCidade.value);
  buscaOndas(selectCidade.value);
  selectCidade.value = '';
});



async function buscaCidade(nome) {
  try {
    const url = `https://brasilapi.com.br/api/cptec/v1/cidade/${nome}`;

    const response = await fetch(url);
    const data = await response.json();

    selectCidade.innerHTML = '';
    errorDiv.innerHTML = '';

    data.map((cidade, index) => {
      selectCidade.innerHTML += `<option value='${cidade.id}'>${cidade.nome}</option>`;
    });
    selectDiv.classList.remove('d-none');
  } catch (error) {
    errorDiv.innerHTML = `<h3 class="text-white"> Erro ao buscar cidade. </h3>`;
    selectDiv.classList.add('d-none');
  }
}

async function buscaPrevisao(id) {
  try {
    const url = `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${id}`;

    const response = await fetch(url);
    const data = await response.json();

    errorDiv.innerHTML = '';

    previsaoDiv.innerHTML = `
    <h3> Cidade: ${data.cidade} - ${data.estado}</h3>
    <p> Previsão para amanhã: </p>
    <p> ${data.clima[0].condicao_desc} </p>
    <p> Mínima: ${data.clima[0].min}ºC Máxima: ${data.clima[0].max}ºC </p>`;

    previsaoDiv.classList.remove('d-none');
    selectDiv.classList.remove('d-none');
  } catch (error) {
    errorDiv.innerHTML = `<h4 class="text-white"> Erro ao buscar previsão. </h4>`;
    previsaoDiv.classList.add('d-none');
    selectDiv.classList.add('d-none');
    ondasDiv.classList.add('d-none');
  }
}

async function buscaOndas(id) {
  try {
    const url = `https://brasilapi.com.br/api/cptec/v1/ondas/${id}`;

    const response = await fetch(url);
    const data = await response.json();

    ondasDiv.innerHTML = `
    <p> Previsão Oceânica: </p>
    <p> Vento: ${data.ondas[0].dados_ondas[4].vento}km/h ${data.ondas[0].dados_ondas[4].direcao_vento_desc}</p>
    <p> Agitação: ${data.ondas[0].dados_ondas[4].agitation}</p>`;

    ondasDiv.classList.remove('d-none');
  } catch (error) {
    ondasDiv.innerHTML = '<p> Previsão oceânica indisponível. </p>';
  }
}

async function buscaLivros(isbn) {
  try {
    const url = `https://brasilapi.com.br/api/isbn/v1/${isbn}`

    const response = await fetch(url);
    const data = await response.json();
    
    const img = await data.cover_url;

    livrosDiv.innerHTML += `
    <div class='text-white mb-5 livro'>
      <p> Livro: </p>
      <img alt='capa do livro' class='img-fluid' src='${ img }'>
      <p class='text-uppercase fw-bold mb-0 mt-2'> ${data.title} - edição de ${data.year} </p>    
      <p class='mb-0 text-uppercase'> Editora: ${data.publisher} </p>
      <p class='mb-0 text-uppercase'> Autor: ${data.authors.map(author => ' ' + author)} </p>
    </div>`
  } catch (error) {
    livrosDiv.innerHTML += error;
  }
}

buscaLivros('978-8535929225');
buscaLivros('978-8535931686');
buscaLivros('978-8537816547');