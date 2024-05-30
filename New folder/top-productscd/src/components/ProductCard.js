import React from 'react';
import api from '../api';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.productName}</h3>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}</p>
      <p>Availability: {product.availability}</p>
    </div>
  );
};

export default ProductCard;
