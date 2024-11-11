// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import ProductDetail from './components/ProductDetail';
import SalesList from './components/SalesList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página principal */}
        <Route path="/items" element={<SearchResults />} /> {/* Resultados de búsqueda */}
        <Route path="/item/:id" element={<ProductDetail />} /> {/* Detalle del producto */}
        <Route path="/sales" element={<SalesList />} /> {/* Lista de compras registradas */}
      </Routes>
    </Router>
  );
}

export default App;
