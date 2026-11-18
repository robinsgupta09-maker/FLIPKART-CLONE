import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { LayoutGrid, List, ChevronRight } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

export default function ProductListingPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const subcategoryParam = searchParams.get('subcategory') || '';

  const [productsData, setProductsData] = useState({
    products: [],
    total: 0,
    page: 1,
    limit: 24,
    totalPages: 1,
    facets: { brands: {} }
  });
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [isAssuredOnly, setIsAssuredOnly] = useState(false);
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  useEffect(() => {
    // Reset filters on category or search change
    setPage(1);
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setSelectedRating(null);
    setSelectedDiscount(null);
    setIsAssuredOnly(false);
  }, [categorySlug, searchQuery, subcategoryParam]);

  useEffect(() => {
    setLoading(true);
    const params = {
      category: categorySlug,
      subcategory: subcategoryParam,
      search: searchQuery,
      brand: selectedBrands.join(','),
      min_price: minPrice || undefined,
      max_price: maxPrice || undefined,
      rating: selectedRating || undefined,
      min_discount: selectedDiscount || undefined,
      sort: sort,
      page: page,
      limit: 24
    };

    fetchProducts(params)
      .then((data) => {
        let items = data.products || [];
        if (isAssuredOnly) {
          items = items.filter((p) => p.isAssured);
        }
        setProductsData({
          ...data,
          products: items
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [
    categorySlug,
    subcategoryParam,
    searchQuery,
    selectedBrands,
    minPrice,
    maxPrice,
    selectedRating,
    selectedDiscount,
    isAssuredOnly,
    sort,
    page
  ]);

  const handleBrandChange = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
    setPage(1);
  };

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    setPage(1);
  };

  const handleClearAll = () => {
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setSelectedRating(null);
    setSelectedDiscount(null);
    setIsAssuredOnly(false);
    setPage(1);
  };

  const displayTitle = searchQuery
    ? `Results for "${searchQuery}"`
    : categorySlug
    ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace('-', ' ')
    : 'All Products';

  return (
    <div className="max-w-[1240px] mx-auto px-2 py-3 min-h-screen">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#878787] mb-2 px-1">
        <Link to="/" className="hover:text-[#2874f0]">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        {categorySlug ? (
          <>
            <span className="capitalize">{categorySlug.replace('-', ' ')}</span>
            {subcategoryParam && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#212121] font-medium">{subcategoryParam}</span>
              </>
            )}
          </>
        ) : (
          <span className="text-[#212121] font-medium">Search Results</span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 items-start">
        {/* Left Filter Sidebar */}
        <FilterSidebar
          facets={productsData.facets}
          selectedBrands={selectedBrands}
          onBrandChange={handleBrandChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          selectedDiscount={selectedDiscount}
          onDiscountChange={setSelectedDiscount}
          isAssuredOnly={isAssuredOnly}
          onAssuredChange={setIsAssuredOnly}
          onClearAll={handleClearAll}
        />

        {/* Right Main Product Area */}
        <main className="flex-1 w-full bg-white rounded-[2px] shadow-sm border border-gray-100 overflow-hidden">
          {/* Top Sort and Results Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h1 className="text-[16px] font-semibold text-[#212121]">
                  {displayTitle}
                </h1>
                <p className="text-[12px] text-[#878787] mt-0.5">
                  (Showing {productsData.products.length} of {productsData.total} items)
                </p>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded cursor-pointer ${
                    viewMode === 'list' ? 'bg-blue-50 text-[#2874f0]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded cursor-pointer ${
                    viewMode === 'grid' ? 'bg-blue-50 text-[#2874f0]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sort Tabs matching Flipkart */}
            <div className="flex items-center gap-6 mt-4 text-[14px] overflow-x-auto no-scrollbar">
              <span className="font-semibold text-[#212121] shrink-0">Sort By</span>
              <button
                onClick={() => setSort('relevance')}
                className={`py-1 cursor-pointer transition-colors border-b-2 whitespace-nowrap ${
                  sort === 'relevance'
                    ? 'text-[#2874f0] border-[#2874f0] font-semibold'
                    : 'text-[#212121] border-transparent hover:text-[#2874f0]'
                }`}
              >
                Relevance
              </button>
              <button
                onClick={() => setSort('price_asc')}
                className={`py-1 cursor-pointer transition-colors border-b-2 whitespace-nowrap ${
                  sort === 'price_asc'
                    ? 'text-[#2874f0] border-[#2874f0] font-semibold'
                    : 'text-[#212121] border-transparent hover:text-[#2874f0]'
                }`}
              >
                Price -- Low to High
              </button>
              <button
                onClick={() => setSort('price_desc')}
                className={`py-1 cursor-pointer transition-colors border-b-2 whitespace-nowrap ${
                  sort === 'price_desc'
                    ? 'text-[#2874f0] border-[#2874f0] font-semibold'
                    : 'text-[#212121] border-transparent hover:text-[#2874f0]'
                }`}
              >
                Price -- High to Low
              </button>
              <button
                onClick={() => setSort('newest')}
                className={`py-1 cursor-pointer transition-colors border-b-2 whitespace-nowrap ${
                  sort === 'newest'
                    ? 'text-[#2874f0] border-[#2874f0] font-semibold'
                    : 'text-[#212121] border-transparent hover:text-[#2874f0]'
                }`}
              >
                Newest First
              </button>
            </div>
          </div>

          {/* Product Items List / Grid */}
          {loading ? (
            <div className="p-16 text-center text-gray-500">
              <div className="inline-block animate-spin w-8 h-8 border-4 border-[#2874f0] border-t-transparent rounded-full mb-3" />
              <div>Loading products...</div>
            </div>
          ) : productsData.products.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <h3 className="text-[20px] font-semibold text-gray-800">
                Sorry, no results found!
              </h3>
              <p className="text-[14px] text-gray-500">
                Please check the spelling or try clearing some filters.
              </p>
              <button
                onClick={handleClearAll}
                className="bg-[#2874f0] text-white px-6 py-2 rounded text-[14px] font-semibold shadow-sm cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'list' ? (
            <div className="divide-y divide-gray-100">
              {productsData.products.map((prod) => (
                <ProductCard key={prod.id} product={prod} viewMode="list" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
              {productsData.products.map((prod) => (
                <ProductCard key={prod.id} product={prod} viewMode="grid" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {productsData.totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between text-[14px]">
              <span className="text-gray-500">
                Page {productsData.page} of {productsData.totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={productsData.page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-1.5 border border-gray-300 rounded font-semibold text-[#2874f0] hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>
                {Array.from({ length: productsData.totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 rounded-full font-bold cursor-pointer ${
                      productsData.page === i + 1
                        ? 'bg-[#2874f0] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={productsData.page >= productsData.totalPages}
                  onClick={() => setPage((p) => Math.min(productsData.totalPages, p + 1))}
                  className="px-4 py-1.5 border border-gray-300 rounded font-semibold text-[#2874f0] hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
