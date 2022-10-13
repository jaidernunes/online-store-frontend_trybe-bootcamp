import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import './DetailsProduct.css';

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

      // // RegEx from https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
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
                    {/* {review.rating} */}
                    {[...Array(five)].map((star, i) => {
                      i += 1;
                      return (
                        <button
                          type="button"
                          key={ `star${i}` }
                          className={ i <= review.rating ? 'on' : 'off' }
                          onClick={ () => setRating(i) }
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
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
