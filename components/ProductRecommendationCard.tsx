
import React from 'react';
import { RecommendedProduct } from '../types';

interface ProductRecommendationCardProps {
  product: RecommendedProduct;
}

// Updated getProductImageUrl to be more robust and handle various product types
const getProductImageUrl = (productTypeInput: string | undefined | null): string => {
  const productType = typeof productTypeInput === 'string' ? productTypeInput : ''; // Default to empty string if not a string
  const typeLower = productType.toLowerCase().trim();

  if (typeLower.includes('cleanser') || typeLower.includes('limpiador')) {
    return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1748846174/Dise%C3%B1o_sin_t%C3%ADtulo_2_zc7of1.png';
  }
  if (typeLower.includes('serum') || typeLower.includes('sérum')) {
    return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1748846174/Dise%C3%B1o_sin_t%C3%ADtulo_1_qzdr88.png';
  }
  if (typeLower.includes('moisturizer') || typeLower.includes('hidratante') || typeLower.includes('crema') ||  typeLower.includes('cream')) {
    // Exclude 'eye cream' from generic 'cream'
    if (!typeLower.includes('eye cream') && !typeLower.includes('contorno de ojos') && !typeLower.includes('crema para ojos')) {
      return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1748846173/Dise%C3%B1o_sin_t%C3%ADtulo_3_kcbw7s.png';
    }
  }
  if (typeLower.includes('sunscreen') || typeLower.includes('protector solar') || typeLower.includes('spf')) {
    return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1748846173/Sweet_cspphz.png';
  }
  if (typeLower.includes('toner') || typeLower.includes('tónico')) {
    return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1748846173/Sweet_1_giiwpv.png';
  }
  if (typeLower.includes('balm') || typeLower.includes('bálsamo')) {
    return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1749246994/Sweet_5_wwlrri.png';
  }
  if (typeLower.includes('mask') || typeLower.includes('mascarilla')) {
    return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1748846173/Sweet_2_zvzvir.png';
  }
  if (typeLower.includes('exfoliant') || typeLower.includes('exfoliante')) {
    return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1748846173/Sweet_3_du5oq1.png';
  }
  if (typeLower.includes('oil') || typeLower.includes('aceite')) {
    // Exclude 'essential oil' if it's too generic, though 'face oil' is more specific
    return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1748846506/Sweet_4_riap58.png';
  }
  if (typeLower.includes('eye cream') || typeLower.includes('contorno de ojos') || typeLower.includes('crema para ojos')) {
    return 'https://res.cloudinary.com/dpeqsbohh/image/upload/v1748846173/Dise%C3%B1o_sin_t%C3%ADtulo_4_yjjkcg.png';
  }
  
  const defaultText = typeLower ? productType : 'Skincare Product'; 
  return `https://via.placeholder.com/400x300/ECEFF1/263238.png?text=${encodeURIComponent(defaultText)}`;
};

const errorPlaceholderSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
  '<rect width="100%" height="100%" fill="#e0e0e0"></rect>' +
  '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="#757575">Imagen no disponible</text>' +
  '</svg>'
)}`;


const ProductRecommendationCard: React.FC<ProductRecommendationCardProps> = ({ product }) => {
  const imageUrl = getProductImageUrl(product.type);
  const altText = product.name || 'Recommended Product';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-40 sm:h-48 object-cover" // Slightly reduced height on smallest screens
        onError={(e) => {
          const target = e.currentTarget;
          console.warn(`Failed to load product image: ${target.src}. Falling back to local placeholder.`);
          target.src = errorPlaceholderSvg; 
          target.onerror = null; 
        }}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 break-words">{product.name || 'Product Name'}</h4>
        <p className="text-sm text-primary dark:text-[#14e3eb] mb-2 break-words">{product.type || 'Product Type'}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 flex-grow break-words">{product.reason || 'Reason not specified.'}</p>
      </div>
    </div>
  );
};

export default ProductRecommendationCard;
