import { Link } from "react-router-dom";

function Home() {
  return (
    <main>

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small">
            WELCOME TO SHOPNEPAL
          </p>

          <h1>
            Everything You Need,
            <br />
            <span>In One Place.</span>
          </h1>

          <p className="hero-description">
            Discover quality products at affordable prices.
            Shop easily from anywhere in Nepal.
          </p>

          <Link to="/products" className="primary-btn">
            Explore Products
          </Link>

        </div>

      </section>

      <section className="features">

        <div className="section-heading">
          <p>WHY SHOP WITH US</p>
          <h2>Shopping Made Simple</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>
              Get your products delivered quickly
              to your doorstep.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Shopping</h3>
            <p>
              Your shopping experience is designed
              with security in mind.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Great Prices</h3>
            <p>
              Find useful products at affordable
              prices.
            </p>
          </div>

        </div>

      </section>

      <section className="home-products">

        <div className="section-heading">
          <p>SHOP NOW</p>
          <h2>Explore Our Products</h2>
        </div>

        <div className="home-product-box">

          <h3>Find something you'll love.</h3>

          <p>
            Browse our growing collection of products.
          </p>

          <Link to="/products" className="primary-btn">
            View Products
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;
