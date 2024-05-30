// scripts.js
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
