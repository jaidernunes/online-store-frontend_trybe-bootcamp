import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

const homeInitialMessage = (
  <h3 data-testid="home-initial-message">
    Digite algum termo de pesquisa ou escolha uma categoria.
  </h3>
);
const searchNoneFound = (<h3>Nenhum produto foi encontrado</h3>);

export default class Home extends React.Component {
  state = {
    homeDisplay: homeInitialMessage,
    searchInput: '',
    categoriesList: [],
  };

  componentDidMount() {
    this.getListCategories();
  }

  getListCategories = async () => {
    const categoriesList = await getCategories();
    console.log(categoriesList);
    this.setState({ categoriesList });
  };

  render() {
    const { state } = this;
    const { searchInput, categoriesList } = state;

    const handleChange = ({ target }) => {
      const { name } = target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      this.setState({
        [name]: value,
      });
    };

    const handleSearch = async (query) => {
      const searchResponse = await getProductsFromCategoryAndQuery(undefined, query);
      const searchResults = searchResponse.results;

      // RETORNA MENSAGEM SE NAO ENCONTRAR NADA
      if (searchResults.length === 0) {
        this.setState({
          homeDisplay: searchNoneFound,
        });
        return;
      }

      // MOSTRA TODOS OS ENCONTRADOS
      const resultsMap = await searchResults.map((item) => (
        <div key={ item.id } data-testid="product">
          <h4>{item.title}</h4>
          <img src={ item.thumbnail } alt={ item.title } />
          <h5>{item.price}</h5>
        </div>
      ));
      this.setState({
        homeDisplay: resultsMap,
      });
    };

    return (
      <>
        {/* <input
          type="text"
          />
          <div>
          <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3> */}
        <h3>Categorias:</h3>
        { categoriesList.map((c) => (
          <Categories
            key={ c.id }
            id={ c.id }
            name={ c.name }
          />
        )) }
        <div className="searchBox">
          <input
            type="text"
            data-testid="query-input"
            name="searchInput"
            id="searchInput"
            value={ searchInput }
            onChange={ handleChange }
          />
          <button
            type="button"
            label="searchButton"
            name="searchButton"
            id="searchButton"
            data-testid="query-button"
            onClick={ () => handleSearch(searchInput) }
          />
        </div>
        <div>
          <Link
            data-testid="shopping-cart-button"
            to="/cart"
          >
            Enter
          </Link>
        </div>

        <div className="displaySearch">
          { state.homeDisplay }
          { // COMENTEI NO MERGE - JAIDER
            // <input type="text"/>
          }
        </div>
      </>

    );
  }
}
