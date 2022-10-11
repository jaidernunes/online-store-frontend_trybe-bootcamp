import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

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
    const { product: { title, thumbnail, price } } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{title}</p>
        <p data-testid="product-detail-price">{`R$ ${price}`}</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho de compras</Link>
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DetailsProduct;
