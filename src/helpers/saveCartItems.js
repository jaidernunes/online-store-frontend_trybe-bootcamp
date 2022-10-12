const saveCartItems = (item) => {
  // seu código aqui
  // alert(item.innerHTML);
  localStorage.setItem('cartItems', JSON.stringify(item));
  // https://www.horadecodar.com.br/2020/07/21/como-salvar-um-objeto-na-localstorage/
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
// if (typeof window !== 'undefined') {
//     localStorage.setItem('myCat', 'Tom');
// }
