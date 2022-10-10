import React from 'react';
import Categories from '../components/Categories';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Categories />
        <input
          type="text"
        />
        <div>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </div>
      </>
    );
  }
}
