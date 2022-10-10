import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <input
          type="text"
        />
        <div>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
          <Link
            data-testid="shopping-cart-button"
            to="/cart"
            >
          Enter
          </Link>
        </div>
      </>
    );
  }
}
