import getSavedCartItems from './getSavedCartItems';
import saveCartItems from './saveCartItems';

function cartAdd(item) {
  // https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js

  const lista = JSON.parse(getSavedCartItems() || '[]');
  let cont = 1;
  let auxIndex = 0;
  for (let index = 0; index < lista.length; index += 1) {
    // console.log(`index do for home ${index}`);
    if (item.id === lista[index].ID) {
      // console.log('entrei');
      cont = 1 + lista[index].QUANTITY;

      if (cont > 1) { auxIndex = index; }
    }
  }
  // // console.log(cont);
  // // const call = this.createCartItemElement(data);
  const obj = {
    ID: item.id,
    TITLE: item.title,
    PRICE: item.price,
    QUANTITY: cont,
  };
    // console.log(obj);
    // console.log(typeof lista);
  if (cont === 1) {
    lista.push(obj);
  } else {
    lista[auxIndex] = obj;
  }

  saveCartItems(lista);
  // });
  // });
} // ramiro: fim funções req 8

export default cartAdd;
// if (typeof module !== 'undefined') {
//   module.exports = callCreateCartItemElement;
// }
