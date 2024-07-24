// Função para adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push({ nome, preco });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(`${nome} foi adicionado ao carrinho!`);
  // Redireciona para a página do carrinho
  window.location.href = "carrinho.html";
}

// Função para exibir os itens do carrinho na página do carrinho
function exibirItensCarrinho() {
  const carrinhoDiv = document.getElementById('carrinhoItens');
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinhoDiv.innerHTML = ''; // Limpa o conteúdo anterior
  carrinho.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'carrinho-item';
    itemDiv.innerHTML = `
      <p>${item.nome}: R$${item.preco.toFixed(2)}</p>
      <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    carrinhoDiv.appendChild(itemDiv);
  });
  calcularTotalCarrinho(); // Atualiza o total do carrinho
}

// Função para remover item do carrinho
function removerDoCarrinho(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  exibirItensCarrinho();
}

// Função para calcular o total do carrinho
function calcularTotalCarrinho() {
  const numPessoas = parseInt(document.getElementById('numPessoas').value) || 0;
  const ajudanteCozinha = parseFloat(document.getElementById('ajudanteCozinha').value);
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const totalItens = carrinho.reduce((acc, item) => acc + item.preco, 0);
  const total = (totalItens * numPessoas) + ajudanteCozinha;

  document.getElementById('totalCarrinho').value = `R$${total.toFixed(2)}`;
}

// Função para enviar pedido via WhatsApp
function enviarWhatsApp() {
  const telefone = '5551999999999'; // Substitua pelo número desejado
  const numPessoas = parseInt(document.getElementById('numPessoas').value) || 0;
  const ajudanteCozinha = document.getElementById('ajudanteCozinha').value == "150" ? "Sim" : "Não";
  const mensagem = `Olá, gostaria de fazer o seguinte pedido:\n\n${(JSON.parse(localStorage.getItem('carrinho')) || []).map(item => `${item.nome}: R$${item.preco.toFixed(2)}`).join('\n')}\n\nNúmero de Pessoas: ${numPessoas}\nAjudante na Cozinha: ${ajudanteCozinha}\n\nTotal: R$${document.getElementById('totalCarrinho').value}`;
  const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// Inicializar carrinho na página do carrinho
if (window.location.pathname.endsWith('carrinho.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    exibirItensCarrinho();
  });
}


// Funções adicionais para cálculo de custo e quantidade de itens para eventos

function calculateTotal() {
  const menuPrice = parseFloat(document.querySelector('input[name="menu"]:checked').value);
  const numberOfPeople = parseInt(document.getElementById('people').value);
  const assistantPrice = parseFloat(document.getElementById('assistant').value);

  console.log('Menu Price:', menuPrice);
  console.log('Number of People:', numberOfPeople);
  console.log('Assistant Price:', assistantPrice);

  if (isNaN(menuPrice) || isNaN(numberOfPeople) || isNaN(assistantPrice)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const totalPrice = (menuPrice * numberOfPeople) + assistantPrice;

  console.log('Total Price:', totalPrice);

  document.getElementById('total-value').textContent = totalPrice.toFixed(2);
}

function calcular() {
  const homens = parseInt(document.getElementById('homens').value);
  const mulheres = parseInt(document.getElementById('mulheres').value);
  const criancas = parseInt(document.getElementById('criancas').value);

  // Quantidades médias por pessoa em gramas/ml
  const carnePorHomem = 500; // 500g de carne bovina por homem
  const carnePorMulher = 300; // 300g de carne bovina por mulher
  const carnePorCrianca = 200; // 200g de carne bovina por criança
  const frangoPorPessoa = 200; // 200g de frango por pessoa
  const linguicaPorPessoa = 200; // 200g de linguiça por pessoa
  const refrigerantePorMulher = 400; // 400ml de refrigerante por mulher
  const refrigerantePorHomem = 300; // 300ml de refrigerante por homem
  const refrigerantePorCrianca = 200; // 200ml de refrigerante por criança
  const cervejaPorHomem = 800; // 800ml de cerveja por homem
  const cervejaPorMulher = 500; // 500ml de cerveja por mulher
  const aguaSucoPorPessoa = 500; // 500ml de água/suco por pessoa

  // Calcular a quantidade total de carnes
  const carneBovina = (homens * carnePorHomem) + (mulheres * carnePorMulher) + (criancas * carnePorCrianca);
  const frango = (homens * frangoPorPessoa) + (mulheres * frangoPorPessoa) + (criancas * frangoPorPessoa);
  const linguica = (homens * linguicaPorPessoa) + (mulheres * linguicaPorPessoa) + (criancas * linguicaPorPessoa);

  // Calcular a quantidade de bebidas com base na seleção
  let totalBebidas = 0;
  const tipoBebida = document.getElementById('bebidas').value;

  if (tipoBebida === 'refrigerante') {
    totalBebidas = (homens * refrigerantePorHomem) + (mulheres * refrigerantePorMulher) + (criancas * refrigerantePorCrianca);
  } else if (tipoBebida === 'cerveja') {
    totalBebidas = (homens * cervejaPorHomem) + (mulheres * cervejaPorMulher);
  } else {
    totalBebidas = (homens * aguaSucoPorPessoa) + (mulheres * aguaSucoPorPessoa) + (criancas * aguaSucoPorPessoa);
  }

  // Exibir os resultados
  document.getElementById('totalCarne').innerText = carneBovina;
  document.getElementById('totalFrango').innerText = frango;
  document.getElementById('totalLinguica').innerText = linguica;
  document.getElementById('totalBebidas').innerText = totalBebidas;

  document.getElementById('resultados').style.display = 'block';
}
