import { Link } from 'react-router-dom';
// import { BookCardProps } from '../interfaces';

type BookCardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
};

/* eslint-disable react/prop-types */
const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="border rounded p-4 bg-neutral-200">
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} />

        <h2 className="bookCard-title">{title}</h2>
        <p className="bookCard-price">${price}</p>
      </Link>
    </div>
  );
};

export default BookCard;
