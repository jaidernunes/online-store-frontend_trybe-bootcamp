import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

const homeInitialMessage = (
  <h3 data-testid="home-initial-message">
    Digite algum termo de pesquisa ou escolha uma categoria.
  </h3>
);
// const searchNoneFound = (<h3>Nenhum produto foi encontrado</h3>);

export default class Home extends React.Component {
  state = {
    homeDisplay: homeInitialMessage,
  };

  render() {
    const { state } = this;

    const handleSearch = async (query) => {
      const searchResponse = await getProductsFromCategoryAndQuery(query);
      const searchResults = searchResponse.results;

      this.setState({
        homeDisplay: homeInitialMessage,
      });

      const resultsMap = await searchResults.map((item) => (
        <div key={ item.id } data-testid="product">
          <h4>{item.title}</h4>
          <img src={ item.thumbnail } alt={ item.title } />
          <h5>{item.price}</h5>
        </div>
      ));

      // console.log('searchResponse');
      // console.log(searchResponse);
      // console.log('searchResults');
      // console.log(searchResults);
      // console.log('resultsMap');
      // console.log(resultsMap);

      this.setState({
        homeDisplay: resultsMap,
      });

      // if (query === undefined) {
      //   this.setState({
      //     homeDisplay: searchNoneFound,
      //   });
      // }
    };

    return (
      <>
        <div className="searchBox">
          <input
            type="text"
            data-testid="query-input"
          />
          <button
            type="button"
            label="searchButton"
            data-testid="query-button"
            onClick={ () => handleSearch(this.value) }
          />
        </div>
        <div className="displaySearch">
          { state.homeDisplay }
        </div>
      </>
    );
  }
}
