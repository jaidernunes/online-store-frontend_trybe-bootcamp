import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategory } from '../services/api';
import cartAdd from '../helpers/cartAdd';

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
                  onClick={ () => cartAdd(item) }
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
}.isRequired;// ramiro: coloquei o isRequired aqui

export default Categories;
