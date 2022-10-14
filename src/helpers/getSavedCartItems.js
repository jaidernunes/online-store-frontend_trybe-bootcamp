const getSavedCartItems = () => {
  // seu código aqui
  const dadosSalvos = localStorage.getItem('cartItems');

  return dadosSalvos;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
