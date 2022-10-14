import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategory } from '../services/api';
import saveCartItems from '../helpers/saveCartItems';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      // categoriesList: [],
      categorySelected: [],
    };
  }

  // componentDidMount() {
  // this.getListCategories();
  // }

  // getListCategories = async () => {
  // const categoriesList = await getCategories();
  // this.setState({ categoriesList });
  // };

  //   componentDidUpdate() {
  //     this.callCreateCartItemElementII();
  //   }

  productSelected = async (id) => {
    const categorySelected = await getProductsFromCategory(id);
    console.log(id);
    this.setState({ categorySelected: categorySelected.results });
  };

  callCreateCartItemElementII = (item) => {
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
    const { id, name } = this.props;
    const { categorySelected } = this.state;
    return (
      <div>
        <button
          id={ id }
          type="button"
          data-testid="category"
          onClick={ () => this.productSelected(id) }
        >
          {name}
        </button>
        <div className="products">
          {
            categorySelected.map((item) => (
              <div key={ item.id } data-testid="product">
                <p>{item.title}</p>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>{item.price}</p>
                <Link
                  to={ `details/${item.id}` }
                  data-testid="product-detail-link"
                >
                  Detalhes
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  className="categorieButton"
                  name="addToCart"
                  id={ item.id }
                  onClick={ () => this.callCreateCartItemElementII(item) }
                >
                  Adicionar ao carrinho
                </button>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  callCreateCartItemElementII: PropTypes.func,
}.isRequired;// ramiro: coloquei o isRequired aqui

export default Categories;
