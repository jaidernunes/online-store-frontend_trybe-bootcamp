import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategory } from '../services/api';

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

  productSelected = async (id) => {
    const categorySelected = await getProductsFromCategory(id);
    console.log(categorySelected);
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
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Categories;
