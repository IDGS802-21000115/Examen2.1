// src/components/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductoDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // URL completa para obtener los detalles del producto usando el ID
        const response = await fetch(` https://examenbazar.somee.com/api/sales/items/${id}`);
        if (!response.ok) { 
          throw new Error("Error en la solicitud de detalles del producto");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handlePurchase = async () => {
    if (!product) {
      console.error("Producto no cargado");
      return;
    }

    try {
      const purchaseData = [
        {
          idProduct: product.id, // Asegúrate de que este sea el ID correcto
          quantity: 1,
          price: product.price,
          discount: 0.0,
          total: product.price
        }
      ];

      console.log("Enviando datos de compra:", purchaseData);

      const response = await fetch(` https://examenbazar.somee.com/api/sales/addSale`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseData)
      });

      console.log("Estado de respuesta:", response.status);

      if (!response.ok) {
        throw new Error("Error en la solicitud de registro de compra");
      }

      const result = response.headers.get("content-length") > 0 ? await response.json() : null;

      if (result && result.success === true) {
        
        navigate('/sales'); // Redirige a la lista de compras
      } else {
       
        alert('Compra registrada con éxito');
        navigate('/sales'); // Redirige a la lista de compras
      }
    } catch (error) {
      console.error("Error al registrar la compra:", error);
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <p className="category">{product.category}</p>
      <div className="rating">⭐⭐⭐⭐⭐</div>
      <button onClick={handlePurchase} className="buy-button">Comprar</button>
    </div>
  );
}

export default ProductDetail;
