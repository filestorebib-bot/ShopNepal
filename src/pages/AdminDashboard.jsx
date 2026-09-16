import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Check existing admin login and load products
  useEffect(() => {
    const loggedIn = localStorage.getItem("shopnepal_admin");

    if (loggedIn !== "true") {
      navigate("/admin");
      return;
    }

    loadProducts();
  }, [navigate]);

  // Load products from Supabase
  const loadProducts = async () => {
    setLoading(true);
    setFormError("");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading products:", error);
      setFormError("Unable to load products from the database.");
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add product to Supabase
  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.price ||
      !form.category.trim() ||
      !form.image.trim()
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
    setSaving(true);

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: form.name.trim(),
          price: Number(form.price),
          category: form.category.trim(),
          image: form.image.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding product:", error);
      setFormError(
        "Could not add product. Please check your database settings."
      );
      setSaving(false);
      return;
    }

    setProducts((currentProducts) => [
      data,
      ...currentProducts,
    ]);

    clearForm();
    setSaving(false);
  };

  // Delete product from Supabase
  const deleteProduct = async (id) => {
    let confirmed = true;

    try {
      confirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
    } catch {
      confirmed = true;
    }

    if (!confirmed) return;

    setFormError("");

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      setFormError("Could not delete the product.");
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );
  };

  // Start editing a product
  const startEdit = (product) => {
    setEditingId(product.id);
    setFormError("");

    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Update product in Supabase
  const updateProduct = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.price ||
      !form.category.trim() ||
      !form.image.trim()
    ) {
      setFormError("Please fill all fields.");
      return;
    }

    setFormError("");
    setSaving(true);

    const { data, error } = await supabase
      .from("products")
      .update({
        name: form.name.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        image: form.image.trim(),
      })
      .eq("id", editingId)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      setFormError("Could not update the product.");
      setSaving(false);
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === editingId ? data : product
      )
    );

    clearForm();
    setSaving(false);
  };

  // Clear form
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

  // Logout
  const logout = () => {
    localStorage.removeItem("shopnepal_admin");
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
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={clearForm}
                  disabled={saving}
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

          {loading ? (
            <div className="empty-products">
              <h2>Loading products...</h2>
              <p>
                Please wait while we load your inventory.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-products">
              <h2>No products yet</h2>
              <p>
                Add your first product using the form above.
              </p>
            </div>
          ) : (
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
          )}

        </section>

      </div>

    </main>
  );
}

export default AdminDashboard;
