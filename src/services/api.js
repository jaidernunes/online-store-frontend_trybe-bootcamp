export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}
export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId) {
    const response = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    // return response.json(); MODIFICADO TESTE JAIDER - ADDED LINHAS 10 E 11
    const dataTest = await response.json();
    return dataTest;
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  const data = await response.json();
  return data;
}
export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você :sorriso_pequeno:
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
