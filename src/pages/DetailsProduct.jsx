import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import cartAdd from '../helpers/cartAdd';

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
          onClick={ () => cartAdd(product) }
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
}.isRequired;

export default DetailsProduct;
