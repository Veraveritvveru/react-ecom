import { useEffect, useState } from 'react';
import { useFilter } from '../hooks/useFilter';
import { Tally3 } from 'lucide-react';
import productsData from '../products.json';
import { Product } from '../interfaces';
import BookCard from './BookCard';

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('all');
  const [drodownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [drodownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const filtered = productsData.products;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filtered.slice(start, end);
    console.log(typeof paginated);
    setProducts(paginated);
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.category === selectedCategory;
      });
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case 'expensive':
        console.log(filteredProducts.sort((a, b) => b.price - a.price));
        return filteredProducts.sort((a, b) => b.price - a.price);
      case 'cheap':
        console.log(filteredProducts.sort((a, b) => a.price - b.price));
        return filteredProducts.sort((a, b) => a.price - b.price);
      case 'rating':
        console.log(filteredProducts.sort((a, b) => b.rating - a.rating));
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filterProducts = getFilteredProducts();
  const totalProducts = 76;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handleChangePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationBtns = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - (currentPage - 1)));
    }
    if (currentPage + 2 > totalPages) {
      startPage = Math.min(1, startPage - (2 - (totalPages - currentPage)));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5 max-w-[1440px] mx-auto">
      <div className="mb-5">
        <div className="flex flex-col justify-between items-center sm:flex-row">
          <div className="filter-wrapper relative mb-5 mt-5">
            <button className="filter-btn border px-4 py-2 rounded-full flex items-center">
              <Tally3 className="mr-2" />

              {filter === 'all'
                ? 'Filter'
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {drodownOpen && (
              <div className="choose-filter-buttons absolute bg-white border border-neutral-400 rounded mt-2 w-full sm:w-40">
                <button
                  className="block p-2 w-full text-left px-4 hover:bg-neutral-400"
                  onClick={() => setFilter('cheap')}
                >
                  Cheap
                </button>
                <button
                  className="block p-2 w-full text-left px-4 hover:bg-neutral-400"
                  onClick={() => setFilter('expensive')}
                >
                  Expensive
                </button>
                <button
                  className="block p-2 w-full text-left px-4 hover:bg-neutral-400"
                  onClick={() => setFilter('rating')}
                >
                  Rating
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="book-list grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filterProducts.map((product) => {
            return (
              <BookCard
                id={product.id}
                key={product.id}
                title={product.title}
                image={product.thumbnail}
                price={product.price}
              />
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          <button
            disabled={currentPage === 1}
            className="border px-4 py-2 mx-2 rounded-full"
            onClick={() => handleChangePage(currentPage - 1)}
          >
            Previous
          </button>

          <div className="flex flex-wrap justify-center">
            {getPaginationBtns().map((page) => (
              <button
                key={page}
                onClick={() => handleChangePage(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${
                  page === currentPage ? 'bg-black text-white' : ''
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleChangePage(currentPage + 1)}
            className="border px-4 py-2 mx-2 rounded-full"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
