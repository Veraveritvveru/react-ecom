import { useState } from 'react';
import productsData from '../products.json';
import { useFilter } from '../hooks/useFilter';

const Sidebar = () => {
  const uniqueCategory = Array.from(
    new Set(productsData.products.map((product) => product.category))
  );

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useFilter();

  const [categories] = useState<string[]>(uniqueCategory);

  const handleNumberChange =
    (setter: (value: number | undefined) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setter(value ? parseFloat(value) : undefined);
    };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  return (
    <div className="w-72 p-5 h-screen ml-5">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section className="sidebar flex flex-col gap-4 w-full">
        <input
          type="text"
          className="border border-neutral-400 rounded-md border-solid p-1.5"
          placeholder="Search product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="min-max-box flex gap-4">
          <input
            type="text"
            className="border border-neutral-400 rounded-md border-solid p-1.5 w-full"
            placeholder="Min"
            value={minPrice ?? ''}
            onChange={handleNumberChange(setMinPrice)}
          />
          <input
            type="text"
            className="border border-neutral-400 rounded-md border-solid p-1.5 w-full"
            placeholder="Max"
            value={maxPrice ?? ''}
            onChange={handleNumberChange(setMaxPrice)}
          />
        </div>
        <div className="categories">
          <h2 className="text-2xl font-semibold">Categories</h2>

          <div className="categories__list flex flex-col mt-3">
            {categories.map((category, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleRadioChangeCategories(category)}
                  className="mr-2 w-4 h-4"
                  checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        <button
          className="w-full p-2 bg-black text-white rounded-md"
          onClick={handleResetFilters}
        >
          Reset filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
