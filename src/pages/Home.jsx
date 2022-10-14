import React from 'react';
import PropTypes, { array } from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery, getCategories, getProductById } from '../services/api';
import saveCartItems from '../helpers/saveCartItems';
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
      array: [],
    };
  }

  componentDidMount() {
    this.getListCategories();
    // this.callCreateCartItemElement();
  }

  componentDidUpdate() {
    this.callCreateCartItemElement();
  }

  getListCategories = async () => {
    const categoriesList = await getCategories();
    // console.log(categoriesList);
    this.setState({ categoriesList });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value; // ramiro: haverá um checkbox?

    this.setState({
      [name]: value,
    });
  };

  // ramiro: inicio funções req 8
  createCartItemElement = ({ id, title, price }) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
    // li.addEventListener('click', cartRemoveItem(li));
    console.log(li);
    return li;
  };

  callCreateCartItemElement = () => {
    const botoesAddCart = document.querySelectorAll('.item__add');
    // console.log(botoesAddCart);
    // console.log(this.props);
    // vou pegar todos os botoes add ao carrinho e mapea-los com forEach
    botoesAddCart.forEach((botao) => {
      botao.addEventListener('click', async () => {
        // console.log(botao);
        const idDoProduto = botao.id;
        console.log(idDoProduto);
        console.log('entrei');
        const data = await getProductById(idDoProduto);// getProductById tem a mesma utilidade de fetchItem de shoppingCart project
        // console.log(data);

        const li = document.createElement('li');
        li.className = 'cart__item';
        li.innerText = `ID: ${data.id} | TITLE: ${data.title} | PRICE: $${data.price}`;
        // li.addEventListener('click', cartRemoveItem(li));
        // console.log(li.innerHTML);
        const arrayAux = [];

        arrayAux.push(li);
        // console.log(arrayAux);
        this.setState((prevState) => ({
          array: [...prevState.array, arrayAux],
        }), () => console.log(this.state.array));
        // // alert(fetchItemProduto);
        // listaNoCarrinho.innerHTML(li);
        // console.log(array);
        // saveCartItems(arrayAux);
      });
    });
  }; // ramiro: fim funções req 8

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
          data-testid="product-add-to-cart"
          type="button"
          label="cartButton"
          name="cartButton"
          className="item__add"
          id={ `${item.id}` }
        //   onClick={ () => this.callCreateCartItemElement() }
        >
          Adicionar ao carrinho
        </button>
      </div>
    ));
    //   callCreateCartItemElement();
    this.setState({
      homeDisplay: resultsMap,
    });
  };

  render() {
    const { state } = this;
    const { searchInput, categoriesList } = state;

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
            onChange={ this.handleChange }
          />
          <button
            type="button"
            label="searchButton"
            name="searchButton"
            id="searchButton"
            data-testid="query-button"
            onClick={ () => handleSearch(searchInput) }
          >
            BUSCA
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
  createCartItemElement: PropTypes.func,
  callCreateCartItemElement: PropTypes.func,
}.isRequired;

export default Home;
