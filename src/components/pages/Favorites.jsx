import { useFavorites } from '../../context/FavoritesContext';
import ProductCard from '../search/ProductCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">You haven't added any favorites yet.</p>
          <p className="text-gray-500 mt-2">Browse our collection and click the heart icon to add items to your favorites.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 