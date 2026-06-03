import React, { useState, useEffect } from 'react';
import AdminPortal from './pages/AdminPortal';
import { productsData } from './util/productsData';

// Default Category Images Setup
const defaultCategoryImages = {
  "Chocolates & Candies": "cadbury_category.jpg",
  "Daily Use": "mop_category.jpg",
  "Home Essentials": "https://cdn.brandfetch.io/domain/springwel.in/fallback/lettermark/theme/dark/h/400/w/400/icon?c=1bfwsmEH20zzEfSNTed",
  "Preservatives": "chips_category.jpg",
  "Sweets & Namkeen": "rasgulla_category.jpg",
  "Beverages": "https://www.logodesignlove.com/wp-content/uploads/2021/07/coca-cola-logo-arden-square-01.jpg",
  "Grains & Masalas": "https://prithvienterprises.co.in/cdn/shop/collections/Aashirvaad_Logo.png?v=1746877542&width=750",
  "More": ""
};

export default function AdminApp() {
  // --- Dynamic B2B Catalog and Settings States ---
  const [products, setProducts] = useState(() => productsData.map(p => ({ ...p, inventory: 100 })));
  const [categoryImages, setCategoryImages] = useState(defaultCategoryImages);
  const [orders, setOrders] = useState([]);

  // --- Admin Desk Database Callbacks ---
  const handleAddProduct = (newProduct) => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productWithId = { ...newProduct, id: nextId };
    setProducts(prevProducts => [...prevProducts, productWithId]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  const handleUpdateCategoryImages = (updatedImagesMap) => {
    setCategoryImages(updatedImagesMap);
  };

  const handleBulkAdjustPrices = (percentage) => {
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const factor = 1 + (percentage / 100);
        let newWholesale = Math.round(p.wholesalePrice * factor * 10) / 10;
        newWholesale = Math.max(1, Math.min(newWholesale, p.retailPrice - 1));
        return {
          ...p,
          wholesalePrice: Math.round(newWholesale)
        };
      })
    );
  };

  const handleResetCatalog = () => {
    setProducts(productsData.map(p => ({ ...p, inventory: 100 })));
    setCategoryImages(defaultCategoryImages);
  };

  // MPA Redirect back to the customer storefront
  const handleRedirectToShop = () => {
    window.location.href = "/";
  };

  return (
    <div className="app-main-flex-wrapper" style={{ padding: '24px 0' }}>
      <AdminPortal 
        products={products}
        categoryImages={categoryImages}
        orders={orders}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateCategoryImages={handleUpdateCategoryImages}
        onBulkAdjustPrices={handleBulkAdjustPrices}
        onResetCatalog={handleResetCatalog}
        setCurrentPage={handleRedirectToShop} // Redirects window back to "/"
      />
    </div>
  );
}
