import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import saveCartItems from '../helpers/saveCartItems';

class DetailsProduct extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  }

  callCreateCartItemElement = (item) => {
    // https://stackoverflow.com/questions/7084557/select-all-elements-with-a-data-xxx-attribute-without-using-jquery
    // const botoesAddCart = document.querySelectorAll('[data-testid=product-add-to-cart]');
    // console.log(botoesAddCart);

    // vou pegar todos os botoes add ao carrinho e mapea-los com forEach
    // botoesAddCart.forEach((botao) => {
    // botao.addEventListener('click', async () => {
    // console.log(botao);
    // console.log(addItem);
    // const idDoProduto = botao.id;
    // console.log(idDoProduto);
    // console.log('entrei');
    // const data = await getProductById(idDoProduto);// getProductById tem a mesma utilidade de fetchItem de shoppingCart project
    // console.log(data);
    const lista = JSON.parse(localStorage.getItem('cartItems') || '[]');
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
    const call = {
      ID: item.id,
      TITLE: item.title,
      PRICE: item.price,
      QUANTITY: cont,
    };
    // console.log(call);
    // https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js
    // console.log(typeof lista);
    if (cont === 1) {
      lista.push(call);
    } else {
      lista[auxIndex] = call;
    }

    saveCartItems(lista);
    // });
    // });
  }; // ramiro: fim funções req 8

  render() {
    const { product: { title, thumbnail, price }, product } = this.state;
    // console.log(this.state);
    // console.log(product);
    return (
      <div>
        <p data-testid="product-detail-name">{title}</p>
        <p data-testid="product-detail-price">{`R$ ${price}`}</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho de compras</Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          name="addToCart"
          // className="item__add"
          // id={ item.id }
          onClick={ () => this.callCreateCartItemElement(product) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  callCreateCartItemElement: PropTypes.func,
}.isRequired;

export default DetailsProduct;
