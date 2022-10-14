import { useState } from 'react';

export default function StarRating() {
  state = {
    rating: 0,
  };

  const [rating, setRating] = useState(0);
  const five = 5;
  return (
    <div className="star-rating">
      {[...Array(five)].map((star, index) => {
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
      })}
    </div>
  );
}
