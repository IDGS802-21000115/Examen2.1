// src/components/SalesList.jsx
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import './SaleList.css';
function SalesList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(` https://examenbazar.somee.com/api/sales/sales`);
        if (!response.ok) { 
          throw new Error("Error en la solicitud de ventas");
        }
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };
    fetchSales();
  }, []);

 

  return (
    <div className="sales-list">
      <h2>Compras Registradas</h2>
      <ul>
        {sales.map(sale => (
          <li key={sale.id}>
            Producto ID: {sale.id} - Cantidad: {sale.quantity} - Total: ${sale.total}
          </li>
        ))}
      </ul>
      {/* Usar Link para redirigir a la página de inicio */}
      <Link to="/" className="exit-button">Salir</Link>
    </div>
  );
}

export default SalesList;
