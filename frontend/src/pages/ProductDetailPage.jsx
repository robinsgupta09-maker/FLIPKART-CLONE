import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  Heart,
  Tag,
  MapPin,
  ShieldCheck,
  RotateCcw,
  Truck,
  Star,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import RatingBadge from '../components/RatingBadge';
import AssuredBadge from '../components/AssuredBadge';
import ProductSlider from '../components/ProductSlider';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { fetchProductById, fetchSimilarProducts } from '../services/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pincode, setPincode] = useState('560103');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [loading, setLoading] = useState(true);
  const [addedToast, setAddedToast] = useState(false);

  // Zoom state
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setActiveImageIndex(0);
        return fetchSimilarProducts(id);
      })
      .then(setSimilar)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#2874f0] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-16 text-center">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link to="/" className="text-[#2874f0] underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%',
      backgroundImage: `url(${product.images?.[activeImageIndex] || product.images?.[0]})`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/cart');
  };

  return (
    <div className="max-w-[1240px] mx-auto px-2 py-3 min-h-screen">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#388e3c] text-white px-5 py-3 rounded-[2px] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold text-[14px]">Added to Cart successfully!</span>
          <Link to="/cart" className="underline font-bold text-yellow-200 ml-2">
            View Cart
          </Link>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#878787] mb-2 px-1">
        <Link to="/" className="hover:text-[#2874f0]">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/category/${product.category}`} className="capitalize hover:text-[#2874f0]">
          {product.category.replace('-', ' ')}
        </Link>
        {product.subcategory && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="capitalize">{product.subcategory}</span>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#212121] truncate max-w-[300px]">{product.title}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row gap-8">
        {/* Left Sticky Column: Gallery & Action Buttons */}
        <div className="w-full md:w-[450px] shrink-0 md:sticky md:top-20 self-start">
          <div className="flex gap-4">
            {/* Thumbnails vertical bar */}
            {product.images?.length > 1 && (
              <div className="flex flex-col gap-2 shrink-0 max-h-[420px] overflow-y-auto no-scrollbar">
                {product.images.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveImageIndex(idx)}
                    className={`w-[60px] h-[60px] p-0.5 border rounded-[2px] cursor-pointer flex items-center justify-center transition-all overflow-hidden ${
                      activeImageIndex === idx
                        ? 'border-[#2874f0] shadow-xs ring-1 ring-[#2874f0]'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover rounded-[2px]" />
                  </div>
                ))}
              </div>
            )}

            {/* Main Image with Zoom container */}
            <div className="relative flex-1 h-[420px] border border-gray-100 flex items-center justify-center p-4 overflow-hidden rounded-[2px] group">
              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md cursor-pointer"
                title="Add to Wishlist"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    wishlisted ? 'fill-[#ff6161] text-[#ff6161]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                />
              </button>

              <img
                src={product.images?.[activeImageIndex] || product.images?.[0]}
                alt={product.title}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="max-h-full max-w-full object-contain cursor-crosshair"
              />

              {/* Magnified Zoom Lens Preview on Desktop */}
              <div
                style={zoomStyle}
                className="hidden md:block absolute inset-0 bg-no-repeat bg-white pointer-events-none z-20"
              />
            </div>
          </div>

          {/* Action CTA Buttons (Add to Cart & Buy Now) */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#ff9f00] hover:bg-[#f39700] text-white font-bold py-3.5 px-4 rounded-[2px] shadow-sm flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer transition-colors text-[15px]"
            >
              <ShoppingCart className="w-4 h-4 fill-white" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-[#fb641b] hover:bg-[#e0530e] text-white font-bold py-3.5 px-4 rounded-[2px] shadow-sm flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer transition-colors text-[15px]"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

        {/* Right Column: Title, Prices, Offers, Delivery & Specs */}
        <div className="flex-1 space-y-6">
          {/* Title and Ratings */}
          <div>
            <h1 className="text-[20px] font-medium text-[#212121] leading-snug">
              {product.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <RatingBadge rating={product.rating} size="md" />
              <span className="text-[14px] font-semibold text-[#878787]">
                {product.ratingCount?.toLocaleString('en-IN')} Ratings &amp;{' '}
                {product.reviewCount?.toLocaleString('en-IN')} Reviews
              </span>
              {product.isAssured && <AssuredBadge className="scale-105" />}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gray-50/60 p-4 rounded-[2px] border border-gray-100">
            <span className="text-[12px] font-bold text-[#388e3c] uppercase">Special price</span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-[28px] font-bold text-[#212121]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-[16px] text-[#878787] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[16px] font-bold text-[#388e3c]">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>
            <div className="text-[12px] text-gray-500 mt-1">
              + ₹59 Secured Packaging Fee
            </div>
          </div>

          {/* Available Offers */}
          <div className="space-y-2">
            <h3 className="text-[14px] font-bold text-[#212121]">Available offers</h3>
            <ul className="space-y-2 text-[14px] text-gray-700">
              {product.offers?.map((offer, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-[#388e3c] shrink-0 mt-0.5 fill-[#388e3c]/20" />
                  <span>{offer}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <span className="text-[14px] text-[#878787] font-semibold w-24">Delivery</span>
              <div className="flex items-center border-b-2 border-[#2874f0] pb-1 w-[240px]">
                <MapPin className="w-4 h-4 text-[#2874f0] mr-2" />
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Delivery Pincode"
                  className="w-full text-[14px] outline-hidden text-[#212121] font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setPincodeChecked(true)}
                  className="text-[13px] font-bold text-[#2874f0] uppercase hover:underline cursor-pointer ml-2"
                >
                  Check
                </button>
              </div>
            </div>

            {pincodeChecked && (
              <div className="mt-2 text-[13px] text-gray-700 pl-30 space-y-1">
                <div className="font-semibold text-black">
                  Delivery by <span className="text-[#388e3c]">Tomorrow</span> |{' '}
                  <span className="text-[#388e3c]">Free</span>{' '}
                  <span className="line-through text-gray-400">₹40</span>
                </div>
                <div className="text-[12px] text-gray-500">
                  Order within 2 hrs 45 mins. Cash on delivery available.
                </div>
              </div>
            )}
          </div>

          {/* Highlights & Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <span className="text-[14px] text-[#878787] font-semibold block mb-2">
                Highlights
              </span>
              <ul className="text-[13px] text-gray-700 space-y-1.5 list-disc list-inside">
                {product.highlights?.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[14px] text-[#878787] font-semibold block mb-2">
                Services
              </span>
              <ul className="text-[13px] text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#2874f0]" />
                  <span>7 Days Replacement Policy</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2874f0]" />
                  <span>{product.warranty || '1 Year Brand Warranty'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#2874f0]" />
                  <span>Fast Delivery with Flipkart Assured</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Seller Information */}
          <div className="pt-4 border-t border-gray-100 flex items-start gap-6 text-[14px]">
            <span className="text-[#878787] font-semibold w-24">Seller</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#2874f0]">
                  {product.seller?.name || 'SuperComNet'}
                </span>
                <span className="bg-[#2874f0] text-white text-[11px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                  <span>{product.seller?.rating || 4.8}</span>
                  <Star className="w-2.5 h-2.5 fill-white" />
                </span>
              </div>
              <ul className="text-[12px] text-gray-500 mt-1 space-y-0.5">
                <li>• 7 Days Return Policy</li>
                <li>• GST invoice available for business customers</li>
              </ul>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-[20px] font-semibold text-[#212121] mb-4">
              Specifications
            </h3>
            {product.specifications && Object.keys(product.specifications).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(product.specifications).map(([secTitle, fields]) => (
                  <div key={secTitle} className="border border-gray-200 rounded-[2px]">
                    <div className="bg-gray-50 px-4 py-2.5 text-[14px] font-bold text-[#212121] border-b border-gray-200">
                      {secTitle}
                    </div>
                    <div className="divide-y divide-gray-100 text-[13px]">
                      {Object.entries(fields).map(([label, val]) => (
                        <div key={label} className="grid grid-cols-3 p-3">
                          <span className="text-[#878787] font-normal">{label}</span>
                          <span className="col-span-2 text-[#212121] font-medium">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-gray-500">General standard brand specifications apply.</p>
            )}
          </div>

          {/* Ratings & Reviews Section */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-[20px] font-semibold text-[#212121] mb-4">
              Ratings &amp; Reviews
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-[2px] border border-gray-200 items-center">
              <div className="text-center">
                <div className="text-[36px] font-black text-[#212121] flex items-center justify-center gap-1">
                  <span>{product.rating}</span>
                  <Star className="w-7 h-7 fill-[#388e3c] text-[#388e3c]" />
                </div>
                <div className="text-[13px] text-gray-500 mt-1">
                  {product.ratingCount?.toLocaleString('en-IN')} Ratings &amp;
                  <br />
                  {product.reviewCount?.toLocaleString('en-IN')} Reviews
                </div>
              </div>

              {/* Progress bars */}
              <div className="col-span-2 space-y-1.5 text-[12px]">
                {[
                  { star: 5, pct: '75%', count: '34,210' },
                  { star: 4, pct: '18%', count: '8,420' },
                  { star: 3, pct: '4%', count: '1,890' },
                  { star: 2, pct: '1%', count: '650' },
                  { star: 1, pct: '2%', count: '720' }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-3">
                    <span className="w-5 font-semibold text-gray-600">{row.star} ★</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${row.star >= 3 ? 'bg-[#388e3c]' : 'bg-[#ff6161]'}`}
                        style={{ width: row.pct }}
                      />
                    </div>
                    <span className="w-14 text-right text-gray-500">{row.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample User Reviews */}
            <div className="mt-6 space-y-4">
              <div className="border-b border-gray-200 pb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <RatingBadge rating={5} />
                  <span className="font-semibold text-[14px] text-[#212121]">
                    Mind-blowing purchase!
                  </span>
                </div>
                <p className="text-[13px] text-gray-700">
                  Absolutely loved the product quality, packing, and ultra fast delivery. Genuine product matching description 100%!
                </p>
                <div className="text-[12px] text-gray-400 flex items-center gap-2">
                  <span>Arun Kumar</span>
                  <span>• Certified Buyer, Bangalore</span>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <RatingBadge rating={4} />
                  <span className="font-semibold text-[14px] text-[#212121]">
                    Worth every penny
                  </span>
                </div>
                <p className="text-[13px] text-gray-700">
                  Value for money. Flipkart delivery was smooth and the item is in pristine condition. Highly recommended.
                </p>
                <div className="text-[12px] text-gray-400 flex items-center gap-2">
                  <span>Sneha Patel</span>
                  <span>• Certified Buyer, Mumbai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Shelf */}
      {similar.length > 0 && (
        <div className="mt-6">
          <ProductSlider
            title="Similar Products"
            subtitle="Customers who viewed this also viewed"
            products={similar}
          />
        </div>
      )}
    </div>
  );
}
