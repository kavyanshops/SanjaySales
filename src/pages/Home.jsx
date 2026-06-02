import React, { useState, useEffect } from 'react';
import { StarIcon, ChevronRightIcon } from '../components/Icons';

export default function Home({ 
  products,            // dynamic state passed from App.jsx
  categoryImages,      // dynamic state passed from App.jsx
  setCurrentPage, 
  setSelectedCategories, 
  onAddToCart 
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  const bannerSlides = [
    {
      title: "Direct Distributor Rates",
      subtitle: "Kirana & Commercial Supply Hub",
      desc: "Get up to 25% extra profit margins by buying directly in bulk cartons. Free doorstep delivery on orders above ₹10,000.",
      badge: "DISTRIBUTOR DIRECT",
      theme: "slide-blue"
    },
    {
      title: "Save 18% GST Input Credit",
      subtitle: "100% Tax-Compliant Business Invoices",
      desc: "Get tax-compliant business invoices instantly with every purchase to claim Input Tax Credit.",
      badge: "GST BENEFIT",
      theme: "slide-amber"
    },
    {
      title: "Premium Sweets & Namkeen",
      subtitle: "Direct Haldiram's & Bikaji Distributor",
      desc: "Stock your stores for festival seasons with fresh bulk packages of sweets, bhujia, and snacks at special prices.",
      badge: "FESTIVE BULK",
      theme: "slide-red"
    }
  ];

  // Auto scroll slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Set category filter and route to browse
  const handleCategorySelect = (categoryName) => {
    if (categoryName === 'More' || categoryName === 'Show More') {
      setSelectedCategories([]); // show all
    } else {
      setSelectedCategories([categoryName]); // show specific
    }
    setCurrentPage('browse');
  };

  // Get most bought products from dynamic prop
  const mostBoughtProducts = products.filter(p => p.isMostBought).slice(0, 8);
  // Get super saver deals from dynamic prop
  const superSaverDeals = products
    .map(p => ({ ...p, discountPercent: Math.round(((p.retailPrice - p.wholesalePrice) / p.retailPrice) * 100) }))
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 4);

  // Dynamic circular categories utilizing categoryImages state prop
  const categoriesList = [
    { 
      name: "Chocolates & Candies", 
      icon: <img src={categoryImages["Chocolates & Candies"] || "/cadbury_category.jpg"} alt="Cadbury Chocolates" className="category-icon-img" /> 
    },
    { 
      name: "Daily Use", 
      icon: <img src={categoryImages["Daily Use"] || "/mop_category.jpg"} alt="Daily needs cleaning mops" className="category-icon-img" /> 
    },
    { 
      name: "Home Essentials", 
      icon: <img src={categoryImages["Home Essentials"] || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80"} alt="Home Curtains" className="category-icon-img" /> 
    },
    { 
      name: "Preservatives", 
      icon: <img src={categoryImages["Preservatives"] || "/chips_category.jpg"} alt="Chips snacks" className="category-icon-img" /> 
    },
    { 
      name: "Sweets & Namkeen", 
      icon: <img src={categoryImages["Sweets & Namkeen"] || "/rasgulla_category.jpg"} alt="Sweets Rasgulla" className="category-icon-img" /> 
    },
    { 
      name: "Beverages", 
      icon: <img src={categoryImages["Beverages"] || "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&q=80"} alt="Coke Beverage" className="category-icon-img" /> 
    },
    { 
      name: "Grains & Masalas", 
      icon: <img src={categoryImages["Grains & Masalas"] || "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=150&q=80"} alt="Grains Atta" className="category-icon-img" /> 
    },
    { 
      name: "More", 
      icon: <div className="category-more-text">MORE →</div> 
    }
  ];

  const brandLogos = [
    { name: "Amul", desc: "Dairy Leader" },
    { name: "Cadbury", desc: "Chocolates" },
    { name: "Haldiram's", desc: "Namkeen & Sweets" },
    { name: "Dettol", desc: "Hygiene Pack" },
    { name: "Unilever", desc: "Home & Toiletries" },
    { name: "Nestle", desc: "KitKat & Maggie" },
    { name: "ITC Aashirvaad", desc: "Atta & Spices" },
    { name: "Coca-Cola", desc: "Soft Drinks" }
  ];

  return (
    <div className="home-container">
      {/* Hero Banner Slider */}
      <section className="hero-slider-section">
        <div className={`slider-viewport ${bannerSlides[activeSlide].theme}`}>
          <div className="slide-content-wrap navbar-width-limiter">
            <span className="slide-badge">{bannerSlides[activeSlide].badge}</span>
            <h1 className="slide-title">{bannerSlides[activeSlide].title}</h1>
            <h3 className="slide-subtitle">{bannerSlides[activeSlide].subtitle}</h3>
            <p className="slide-desc">{bannerSlides[activeSlide].desc}</p>
            <button className="slide-cta-btn" onClick={() => handleCategorySelect('More')}>
              Explore Commercial Rates <ChevronRightIcon size={16} className="inline-chevron" />
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="slider-dots">
            {bannerSlides.map((_, index) => (
              <button 
                key={index} 
                className={`slider-dot ${activeSlide === index ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8 Product Categories Circles Grid */}
      <section className="categories-grid-section navbar-width-limiter">
        <h2 className="section-title text-left">Shop by Wholesale Category</h2>
        <p className="section-subtitle text-left">Select a segment to browse volume-based trade pricing</p>
        
        <div className="categories-row-flex">
          {categoriesList.map((cat, idx) => (
            <div 
              key={idx} 
              className={`category-circle-card ${cat.name === 'More' ? 'show-more-card' : ''}`}
              onClick={() => handleCategorySelect(cat.name)}
            >
              <div className="category-icon-wrapper">
                {cat.icon}
              </div>
              <span className="category-circle-label">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Super Saver Deals Section */}
      <section className="super-saver-section navbar-width-limiter">
        <div className="section-header-flex">
          <div>
            <h2 className="section-title text-left">Super Saver Wholesale Deals</h2>
            <p className="section-subtitle text-left">Maximize your profits with our highest margin products</p>
          </div>
          <button className="view-all-link-btn" onClick={() => handleCategorySelect('More')}>
            View All Offers →
          </button>
        </div>

        <div className="deals-grid">
          {superSaverDeals.map((product) => (
            <div key={product.id} className="deal-card">
              <div className="deal-discount-badge">{product.discountPercent}% OFF</div>
              <div className="deal-image-wrap">
                <img src={product.imageUrl} alt={product.name} className="deal-image" />
              </div>
              <div className="deal-info-wrap">
                <span className="deal-brand">{product.brand}</span>
                <h4 className="deal-name" onClick={() => {
                  setSelectedCategories([product.category]);
                  setCurrentPage('browse');
                }}>{product.name}</h4>
                <span className="deal-pack">{product.packSize}</span>
                <div className="price-pricing-flex">
                  <div className="deal-prices">
                    <span className="retail-strike">MRP ₹{product.retailPrice}</span>
                    <span className="wholesale-price">₹{product.wholesalePrice} <span className="ex-gst">ex. GST</span></span>
                  </div>
                  <button className="deal-add-btn" onClick={() => onAddToCart(product, product.moq || 10)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured B2B Brands */}
      <section className="brands-showcase-section navbar-width-limiter">
        <h2 className="section-title text-left">Direct Store Brands</h2>
        <p className="section-subtitle text-left font-sm">Authorized wholesale distributors for leading retail brands</p>
        <div className="brands-flex-row">
          {brandLogos.map((brand, idx) => (
            <div key={idx} className="brand-logo-card" onClick={() => handleCategorySelect('More')}>
              <h4>{brand.name}</h4>
              <span>{brand.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Most Bought Grid */}
      <section className="most-bought-section navbar-width-limiter">
        <div className="section-header-flex">
          <div>
            <h2 className="section-title text-left">Bestsellers in Sanjay Sales</h2>
            <p className="section-subtitle text-left">Products with the highest commercial order frequency</p>
          </div>
          <button className="view-all-link-btn" onClick={() => handleCategorySelect('More')}>
            View All Bestsellers →
          </button>
        </div>

        <div className="products-grid-layout">
          {mostBoughtProducts.map((product) => {
            const margin = Math.round(((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100);
            return (
              <div key={product.id} className="product-card-unit">
                <div className="bestseller-ribbon">Bestseller</div>
                <div className="product-image-container">
                  <img src={product.imageUrl} alt={product.name} className="product-card-img" />
                </div>
                <div className="product-details-container">
                  <span className="product-brand-tag">{product.brand}</span>
                  <h3 className="product-name-heading" onClick={() => {
                    setSelectedCategories([product.category]);
                    setCurrentPage('browse');
                  }}>{product.name}</h3>
                  <span className="product-pack-size">{product.packSize}</span>
                  
                  {/* Stars */}
                  <div className="product-rating-row">
                    <div className="stars-wrap">
                      <StarIcon className="star-icon" />
                      <span className="rating-val">{product.rating}</span>
                    </div>
                    <span className="reviews-cnt">({product.reviewsCount} reviews)</span>
                  </div>

                  <div className="divider-card"></div>

                  <div className="margin-indicator-label">
                    Margin: <span className="margin-green">{margin}% Profit</span>
                  </div>

                  <div className="price-checkout-row">
                    <div className="price-stack">
                      <span className="mrp-txt">MRP ₹{product.retailPrice}</span>
                      <span className="wholesale-deal-price">₹{product.wholesalePrice} <span className="ex-gst">ex. GST</span></span>
                    </div>
                    
                    <button className="product-quick-add-btn" onClick={() => onAddToCart(product, product.moq || 10)}>
                      Add Bulk ({product.moq || 10})
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Info Banners */}
      <section className="b2b-info-banners navbar-width-limiter">
        <div className="info-banner-card blue-gradient">
          <h3>Kirana Stores Delivery</h3>
          <p>Next day dispatch. Insured logistics. Direct to shop-floor loading. Cash on delivery accepted for verified business accounts.</p>
        </div>
        <div className="info-banner-card gold-gradient">
          <h3>Institutional Supplies</h3>
          <p>Exclusive quotes for hotels, restaurants, schools and offices. Purchase order invoicing support. Bulk volumes above 50 cartons.</p>
        </div>
      </section>
    </div>
  );
}
