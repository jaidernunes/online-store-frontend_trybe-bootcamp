import React from 'react';

class CartProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      objProducts: [],
    };
  }

  componentDidMount() {
    this.rescueItems();
  }

  rescueItems = () => {
    // https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js
    const lista = JSON.parse(localStorage.getItem('cartItems') || '[]');
    // console.log(lista);
    this.setState({
      objProducts: lista,
    });
  };

  render() {
    const {
      objProducts,
    } = this.state;

    // const aux = listaProdutos[0];
    // const objeto = JSON.parse(aux);
    // console.log(objProducts);
    // produtos=['arroz'];
    // if (objProducts.length === 0) {
    //   return <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>;
    // }
    return (
      <div>
        {objProducts.length === 0
          ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>)
          : (objProducts.map((item) => (
            <span key={ item.ID }>
              <p data-testid="shopping-cart-product-name">{item.TITLE}</p>
              <p>{item.PRICE}</p>
              <p data-testid="shopping-cart-product-quantity">{item.QUANTITY}</p>
            </span>
          )))}

      </div>
    );
  }
}

export default CartProducts;
