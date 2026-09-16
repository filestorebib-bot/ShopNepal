import { useState } from "react";

const defaultProducts = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 1200,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 3500,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 4500,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  },
  {
    id: 4,
    name: "Backpack",
    price: 1800,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
  },
];

function Products() {
  const [products] = useState(() => {
    const saved = localStorage.getItem("shopnepal_products");

    if (saved) {
      return JSON.parse(saved);
    }

    localStorage.setItem(
      "shopnepal_products",
      JSON.stringify(defaultProducts)
    );

    return defaultProducts;
  });

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

        {products.length === 0 ? (
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
