import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function AdminDashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {

    const loggedIn =
      localStorage.getItem("shopnepal_admin");

    if (loggedIn !== "true") {
      navigate("/admin");
      return;
    }

    const saved =
      localStorage.getItem("shopnepal_products");

    if (saved) {
      setProducts(JSON.parse(saved));
    } else {

      localStorage.setItem(
        "shopnepal_products",
        JSON.stringify(defaultProducts)
      );

      setProducts(defaultProducts);
    }

  }, [navigate]);


  const saveProducts = (updatedProducts) => {

    setProducts(updatedProducts);

    localStorage.setItem(
      "shopnepal_products",
      JSON.stringify(updatedProducts)
    );
  };


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const addProduct = (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.price ||
      !form.category ||
      !form.image
    ) {
      setFormError("Please fill all fields.");
      try {
        alert("Please fill all fields.");
      } catch {
        // Safe for sandboxed iframe
      }
      return;
    }

    setFormError("");

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: form.image,
    };

    saveProducts([
      ...products,
      newProduct,
    ]);

    clearForm();
  };


  const deleteProduct = (id) => {

    let confirmed = true;
    try {
      confirmed =
        window.confirm(
          "Are you sure you want to delete this product?"
        );
    } catch {
      confirmed = true;
    }

    if (!confirmed) return;

    const updatedProducts =
      products.filter(
        (product) => product.id !== id
      );

    saveProducts(updatedProducts);
  };


  const startEdit = (product) => {

    setEditingId(product.id);
    setFormError("");

    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const updateProduct = (e) => {

    e.preventDefault();

    const updatedProducts =
      products.map((product) => {

        if (product.id === editingId) {

          return {
            ...product,
            name: form.name,
            price: Number(form.price),
            category: form.category,
            image: form.image,
          };

        }

        return product;

      });

    saveProducts(updatedProducts);

    clearForm();
  };


  const clearForm = () => {

    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
    });

    setEditingId(null);
    setFormError("");
  };


  const logout = () => {

    localStorage.removeItem(
      "shopnepal_admin"
    );

    navigate("/admin");
  };


  return (
    <main className="dashboard-page">

      <div className="dashboard-container">

        <div className="dashboard-top">

          <div>
            <p className="admin-label">
              SHOPNEPAL ADMIN
            </p>

            <h1>Dashboard</h1>

            <p>
              Manage your store products.
            </p>
          </div>

          <button
            className="dashboard-logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>


        <div className="stats-grid">

          <div className="stat-card">
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>

          <div className="stat-card">
            <span>Store Status</span>
            <strong>Active</strong>
          </div>

          <div className="stat-card">
            <span>Admin</span>
            <strong>Online</strong>
          </div>

        </div>


        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <p>PRODUCT MANAGEMENT</p>

              <h2>
                {editingId
                  ? "Edit Product"
                  : "Add New Product"}
              </h2>
            </div>

          </div>


          <form
            className="product-form"
            onSubmit={
              editingId
                ? updateProduct
                : addProduct
            }
          >

            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Nike Shoes"
              />

            </div>


            <div className="form-group">

              <label>
                Price
              </label>

              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 4500"
              />

            </div>


            <div className="form-group">

              <label>
                Category
              </label>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Footwear"
              />

            </div>


            <div className="form-group form-full">

              <label>
                Image URL
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />

            </div>


            {formError && (
              <div className="login-error form-full">
                {formError}
              </div>
            )}


            <div className="form-buttons">

              <button
                type="submit"
                className="save-product-btn"
              >
                {editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>

              {editingId && (

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={clearForm}
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </section>


        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <p>STORE INVENTORY</p>

              <h2>
                All Products
              </h2>
            </div>

            <span>
              {products.length} products
            </span>

          </div>


          <div className="admin-products">

            {products.map((product) => (

              <div
                className="admin-product"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="admin-product-info">

                  <small>
                    {product.category}
                  </small>

                  <h3>
                    {product.name}
                  </h3>

                  <strong>
                    Rs.{" "}
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </strong>

                </div>


                <div className="product-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      startEdit(product)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

    </main>
  );
}

export default AdminDashboard;
