// src/components/SearchResults.jsx
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';
function SearchResults() {
  const [items, setItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchItems = async () => {
      const query = new URLSearchParams(location.search).get('search');
      try {
        // URL completa para la búsqueda de productos
        const response = await fetch(`https://examenbazar.somee.com/api/sales/items${query}`);
        if (!response.ok) {
          throw new Error("Error en la solicitud de búsqueda");
        }
        const data = await response.json();
        console.log("Datos recibidos:", data); // Verificar los datos en consola
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [location.search]);

  return (
    <div>
      <h2 className="results-title">Resultados de Búsqueda</h2>
      <p >Encontramos {items.length} resultados</p>
      <div className="product-list">
        {items.map(item => (
          <div key={item.id} className="product-card">
            <Link to={`/item/${item.id}`}>
             {/* Imagen del producto */}
             
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="price">Precio: ${item.price}</p>
              <p className="category">Categoría: {item.category}</p>
              <div className="rating">⭐⭐⭐⭐⭐</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
