import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import './DetailsProduct.css';

// const formErrorMsg = (<h3 data-testid="error-msg">Campos inválidos</h3>);
// const { product: { id } } = this.state;

class DetailsProduct extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
      reviews: [],
      detailEmail: '',
      rating: 0,
      detailEvaluation: '',
      formError: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    const getReviews = JSON.parse(localStorage.getItem(id));
    this.setState({
      product,
    });
    // const formErrorMsg = (<h3 data-testid="error-msg">Campos inválidos</h3>);

    // LOG JAIDER
    console.log(product);
    console.log(getReviews);

    localStorage.setItem(id, JSON.stringify((getReviews || [])));
  }

  render() {
    const { product: { title, thumbnail, price, id },
      reviews,
      formError,
      detailEmail,
      rating,
      detailEvaluation } = this.state;
    const five = 5;

    const getReviews = JSON.parse(localStorage.getItem(id));

    const setRating = (index) => this.setState({
      rating: index,
    });

    const handleChange = ({ target }) => {
      const { name } = target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      this.setState({
        [name]: value,
      });
    };

    const submitReview = () => {
      const reviewObj = {
        email: detailEmail,
        text: detailEvaluation,
        rating,
      };
      // CRIAR FUNÇAO PRA VALIDAR E GUARDAR O REVIEW NO STATE
      // // RegEx from https://www.w3resource.com/javascript/form/email-validation.php

      // const validateEmail = (email) => String(email)
      //   .toLowerCase()
      //   .match(
      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      //   );

      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (emailRegex.test(detailEmail) && rating > 0) {
        console.log(emailRegex.test(detailEmail));
        localStorage.setItem(id, JSON.stringify([...getReviews, reviewObj]));

        this.setState({
          reviews: [...reviews, {
            detailEmail,
            rating,
            detailEvaluation,
          }],
        });

        this.setState({
          detailEmail: '',
          rating: 0,
          detailEvaluation: '',
          formError: false,
        });
      } else {
        this.setState({
          formError: true,
        });
      }
    };

    return (
      <div>
        <p data-testid="product-detail-name">{title}</p>
        <p data-testid="product-detail-price">{`R$ ${price}`}</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho de compras</Link>

        {/* REVIEW FORM - JAIDER */}
        <div>
          Avaliações
          <form action="">
            <input
              type="text"
              name="detailEmail"
              id="detailEmail"
              data-testid="product-detail-email"
              placeholder="Email"
              onChange={ handleChange }
              value={ detailEmail }
            />

            <div className="star-rating">
              {
              // inspirado no tutorial: https://dev.to/salehmubashar/3-ways-to-add-css-in-react-js-336f
                [...Array(five)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={ `star${index}` }
                      data-testid={ `${index}-rating` }
                      className={ index <= rating ? 'on' : 'off' }
                      onClick={ () => setRating(index) }
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })
              }
            </div>

            <div>
              <textarea
                data-testid="product-detail-evaluation"
                name="detailEvaluation"
                id="detailEvaluation"
                cols="30"
                rows="5"
                placeholder="Mensagem (opcional)"
                onChange={ handleChange }
                value={ detailEvaluation }
              />
            </div>
            <button
              type="button"
              data-testid="submit-review-btn"
              className="sendButton"
              onClick={ submitReview }
            >
              Avaliar
            </button>
            {formError && <h3 data-testid="error-msg">Campos inválidos</h3>}
          </form>

          <div>
            {getReviews && getReviews.map((review, index) => (
              <div key={ `review${index}` }>
                <div>
                  <div data-testid="review-card-email">
                    {review.email}
                  </div>
                  <div data-testid="review-card-rating">
                    {review.rating}
                  </div>
                </div>
                <div data-testid="review-card-evaluation">
                  {review.text}
                </div>
              </div>
            ))}

          </div>
        </div>
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
