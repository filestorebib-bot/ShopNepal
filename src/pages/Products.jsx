import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading products:", error);
      setError("Unable to load products.");
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="products-page">

      <section className="page-header">
        <p>SHOPNEPAL</p>
        <h1>Our Products</h1>

        <span>
          Discover products available in our store.
        </span>
      </section>

      <section className="products-section">

        {loading ? (
          <div className="empty-products">
            <h2>Loading products...</h2>
            <p>
              Please wait while we load the latest products.
            </p>
          </div>
        ) : error ? (
          <div className="empty-products">
            <h2>Something went wrong</h2>
            <p>{error}</p>

            <button onClick={loadProducts}>
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-products">
            <h2>No products available</h2>
            <p>
              Products added from the admin panel
              will appear here.
            </p>
          </div>
        ) : (
          <div className="product-grid">

            {products.map((product) => (
              <div className="product-card" key={product.id}>

                <div className="product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                </div>

                <div className="product-info">

                  <small>
                    {product.category}
                  </small>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">

                    <strong>
                      Rs. {Number(product.price).toLocaleString()}
                    </strong>

                    <button className="buy-btn">
                      View
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Products;
