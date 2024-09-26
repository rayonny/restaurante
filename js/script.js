// Função para adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push({ nome, preco });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(`${nome} foi adicionado ao carrinho!`);
  // Redirecionar para a página do carrinho
  window.location.href = "carrinho.html";
}

// Função para exibir itens do carrinho na página do carrinho
function exibirItensCarrinho() {
  const carrinhoDiv = document.getElementById('carrinhoItens');
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinhoDiv.innerHTML = ''; // Limpar conteúdo anterior
  carrinho.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'carrinho-item';
    itemDiv.innerHTML = `
      <p>${item.nome}: R$${item.preco.toFixed(2)}</p>
      <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    carrinhoDiv.appendChild(itemDiv);
  });
  calcularTotalCarrinho(); // Atualizar o total do carrinho
}

// Função para remover item do carrinho
function removerDoCarrinho(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  exibirItensCarrinho();
}

// Função para calcular o valor total do carrinho
function calcularTotalCarrinho() {
  const numPessoas = parseInt(document.getElementById('numPessoas').value) || 0;
  const ajudanteCozinha = parseFloat(document.getElementById('ajudanteCozinha').value);
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const totalItens = carrinho.reduce((acc, item) => acc + item.preco, 0);
  const total = (totalItens * numPessoas) + ajudanteCozinha;

  document.getElementById('totalCarrinho').value = `R$${total.toFixed(2)}`;

  // Salvar total no localStorage para uso posterior na página de agendamento
  localStorage.setItem('totalCarrinho', total.toFixed(2));
}

// Função para enviar o pedido via WhatsApp
function enviarWhatsApp() {
  const telefone = '5561993133448'; // Substitua pelo número desejado
  const numPessoas = parseInt(document.getElementById('numPessoas').value) || 0; // Captura o número de pessoas
  const ajudanteCozinha = document.getElementById('ajudanteCozinha').value == "150" ? "Sim" : "Não";
  const pratosSelecionados = (JSON.parse(localStorage.getItem('carrinho')) || []).map(item => `${item.nome}: R$${item.preco.toFixed(2)}`).join('\n');

  const mensagem = `Olá, gostaria de fazer o seguinte pedido:\n\n${pratosSelecionados}\n\nNúmero de Pessoas: ${numPessoas}\nAjudante na Cozinha: ${ajudanteCozinha}\n\nTotal: ${document.getElementById('totalCarrinho').value}`;

  const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// Inicializa o carrinho na página do carrinho
if (window.location.pathname.endsWith('carrinho.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    exibirItensCarrinho();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const agendamentoForm = document.getElementById('agendamentoForm');
  if (agendamentoForm) {
    agendamentoForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const endereco = document.getElementById('endereco').value;
      const localizacao = document.getElementById('localizacao').value;
      const data = document.getElementById('data').value;
      const hora = document.getElementById('hora').value;
      const mensagem = document.getElementById('mensagem').value;
      const numPessoas = parseInt(document.getElementById('numPessoas').value) || 0; // Captura a quantidade de pessoas

      const totalCarrinho = localStorage.getItem('totalCarrinho') || '0.00';
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

      // Verifica se o carrinho contém itens
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return; // Impede o envio se o carrinho estiver vazio
      }

      // Montar string com os itens do carrinho
      const itensCarrinho = carrinho.map(item => `${item.nome}: R$${item.preco.toFixed(2)}`).join('\n');

      // Criar mensagem do WhatsApp incluindo total do carrinho, itens e quantidade de pessoas
      const message = `*Agendamento*\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nEndereço: ${endereco}\nLocalização: ${localizacao}\nData: ${data}\nHora: ${hora}\nNúmero de Pessoas: ${numPessoas}\nMensagem: ${mensagem}\n\n*Pratos Selecionados:*\n${itensCarrinho}\nTotal do Carrinho: R$${totalCarrinho}`;

      const whatsappURL = `https://api.whatsapp.com/send?phone=5561993133448&text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, '_blank');
    });
  }
});
