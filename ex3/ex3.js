const url = [
  `http://www.ipeadata.gov.br/api/odata4/Metadados('PIMPFN12_QIIGNN2112')`,
  `http://www.ipeadata.gov.br/api/odata4/Metadados('SECEX12_M472FOB12')`,
  `http://www.ipeadata.gov.br/api/odata4/Metadados('HIST_ERVAQ')`,
];

const infoDiv = document.querySelector('#info');
const tabelaDiv = document.querySelector('#tabela');
const botao1 = document.querySelector('#botao-1');
const botao2 = document.querySelector('#botao-2');
const botao3 = document.querySelector('#botao-3');

botao1.addEventListener('click', () => {
  pegaDado(0);
});

botao2.addEventListener('click', () => {
  pegaDado(1);
});

botao3.addEventListener('click', () => {
  pegaDado(2);
});

async function pegaDado(index) {
  try {
    const response = await fetch(url[index]);
    const data = await response.json();

    infoDiv.innerHTML = `
    <h3> Nome: </h3>
    <p> ${data.value[0].SERNOME} </p>
    <h3> Descrição: </h3>
    <p> ${data.value[0].SERCOMENTARIO}</p> 
    <h3> Fonte: </h3>
    <p> Fonte: ${data.value[0].FNTNOME}</p> 
    `;

    await criaTabela(index);
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    infoDiv.innerHTML =
      '<p>Erro ao obter dados. Verifique o console para mais informações.</p>';
    tabelaDiv.innerHTML = '';
  }
}

async function criaTabela(index) {
  try {
    const response = await fetch(url[index] + '/Valores');
    const data = await response.json();

    const somaValores = data.value.reduce(
      (acc, valor) => acc + parseFloat(valor.VALVALOR),
      0
    );

    tabelaDiv.innerHTML = `
    <table class='table table-dark table-striped table-hover'> 
      <thead>
        <tr> 
          <th> Data </th>
          <th> Valor </th>
        </tr>
      </thead>
      <tbody id='corpo'> 
      </tbody>
    </table>
    <p> Soma dos Valores: ${somaValores.toFixed(2)} </p>`;

    data.value.forEach(valor => {
      const corpo = document.querySelector('#corpo');
      corpo.innerHTML += `
      <tr> 
        <td> ${valor.VALDATA} </td>
        <td> ${valor.VALVALOR} </td>
      </tr> `;
    });
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
    tabelaDiv.innerHTML =
      '<p>Erro ao criar tabela. Verifique o console para mais informações.</p>';
  }
}
