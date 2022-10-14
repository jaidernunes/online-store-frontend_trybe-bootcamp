import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import {
  getProductsFromCategoryAndQuery,
  getCategories,
} from '../services/api';
import cartAdd from '../helpers/cartAdd';

// const listaNoCarrinho = document.querySelector('ol.cart__items'); // tag do tipo <ol> // usei querySelecctor pois facilita trabalhar com forEach

const homeInitialMessage = (
  <h3 data-testid="home-initial-message">
    Digite algum termo de pesquisa ou escolha uma categoria.
  </h3>
);
const searchNoneFound = (<h3>Nenhum produto foi encontrado</h3>);

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      homeDisplay: homeInitialMessage,
      searchInput: '',
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.getListCategories();
    // this.callCreateCartItemElement();
  }

  //   componentDidUpdate() {
  //     this.callCreateCartItemElement();
  //   }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value; // ramiro: haverá um checkbox?

    this.setState({
      [name]: value,
    });
  };

  getListCategories = async () => {
    const categoriesList = await getCategories();
    // console.log(categoriesList);
    this.setState({ categoriesList });
  };

  handleSearch = async (query) => {
    const searchResponse = await getProductsFromCategoryAndQuery(undefined, query);
    // console.log(searchResponse);
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
        <Link
          to={ `details/${item.id}` }
          data-testid="product-detail-link"
        >
          Detalhes
        </Link>
        {/* ramiro: botao req 8 */}
        <button
          type="button"
          data-testid="product-add-to-cart"
          name="addToCart"
          // className="item__add"
          id={ item.id }
          onClick={ () => cartAdd(item) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    ));

    this.setState({
      homeDisplay: resultsMap,
    });
  };

  render() {
    const { state } = this;
    const { searchInput, categoriesList } = state;
    // console.log(`No render: ${listaNoCarrinho}`);

    return (
      <>
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
            onChange={ this.handleChange }
          />
          <button
            type="button"
            label="searchButton"
            name="searchButton"
            id="searchButton"
            data-testid="query-button"
            onClick={ () => this.handleSearch(searchInput) }
          >
            Search
            {/* ramiro: adicionei search para melhor especificar e destacar o botao */}
          </button>
        </div>
        <div>
          <Link
            data-testid="shopping-cart-button"
            to="/cart"
          >
            Carrinho
            {/* ramiro: adicionei carrinho para melhor especificar e destacar o link */}
          </Link>
        </div>

        <div className="displaySearch">
          { state.homeDisplay }
          {/* {this.callCreateCartItemElement()} */}
          { // COMENTEI NO MERGE - JAIDER
            // <input type="text"/>
          }
        </div>
      </>

    );
  }
}

Home.propTypes = {
  handleChange: PropTypes.func,
  handleSearch: PropTypes.func,
}.isRequired;

export default Home;

// {searchResults.map((item) => (
// <div key={ item.id } data-testid="product">
// <h4>{item.title}</h4>
// <img src={ item.thumbnail } alt={ item.title } />
// <h5>{item.price}</h5>
// <Link
// to={ `details/${item.id}` }
// data-testid="product-detail-link"
// >
// Detalhes
// </Link>

// <button
// /* ramiro: botao req 8 */
// data-testid="product-add-to-cart"
// type="button"
// name="addToCart"
// id={ item.id }
// >
// Adicionar ao carrinho
// </button>
// </div>
// ))}
