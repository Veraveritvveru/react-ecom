import { useState } from 'react';
import productsData from '../products.json';

const Sidebar = () => {
  const uniqueCategory = Array.from(
    new Set(productsData.products.map((product) => product.category))
  );

  const [categories] = useState<string[]>(uniqueCategory);
  const [keywords] = useState<string[]>([
    'apple',
    'watch',
    'fashion',
    'trend',
    'shoes',
    'shirt',
  ]);

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section className="sidebar flex flex-col gap-4 w-full">
        <input
          type="text"
          className="border border-neutral-400 rounded-md border-solid p-1.5"
          placeholder="Search product"
        />

        <div className="min-max-box flex gap-4">
          <input
            type="text"
            className="border border-neutral-400 rounded-md border-solid p-1.5 w-full"
            placeholder="Min"
          />
          <input
            type="text"
            className="border border-neutral-400 rounded-md border-solid p-1.5 w-full"
            placeholder="Max"
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
                  className="mr-2 w-4 h-4"
                />
                {category.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        <div className="keywords flex flex-col ">
          <h2 className="text-2xl font-semibold">Keywords</h2>
          <div className="keywords__list flex flex-col gap-4 mt-5">
            {keywords.map((keyword, index) => (
              <button
                key={index}
                className="px-3 py-1 text-left border rounded-md border-neutral-400 hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full p-2 bg-black text-white rounded-md">
          Reset filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
