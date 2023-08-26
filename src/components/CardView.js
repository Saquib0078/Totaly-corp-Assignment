import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import './CardView.css'
const CardView = () => {
  const [product, setProduct] = useState([]);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all"); 

  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
    gap: "20px",
    padding: "20px",
  };

  const handleAddToCart = (item) => {
    const newItem = { ...item, inCart: true, quantity: 1 };
    dispatch(addItem(newItem));
  };
  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProduct(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "rating":
      return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
    case "rating-desc":
      return [...products].sort((a, b) => a.rating.rate - b.rating.rate);
      default:
        return products;
    }
  };

  const filterProductsByCategory = (products) => {
    if (selectedCategory === "all") {
      return products;
    } else {
      return products.filter((item) => item.category === selectedCategory);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = filterProductsByCategory(product);
  const sortedAndFilteredProducts = sortProducts(filteredProducts);

  const cardImgStyle = {
    height: "10rem",
    display: "block",
    margin: "0 auto",
  };

  return (
    <div className="product-container">
      <div  id="sidebar">
        <h3>Sort By:</h3>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price">Price low-high</option>
          <option value="price-desc">Price high-low</option>
          <option value="rating">Rating high-low</option>
          <option value="rating-desc">Rating low-high</option>
        </select>

        <h3>Filter By Category:</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="men's clothing">men's clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>

      <div className="product-list" style={gridContainer}>
        {sortedAndFilteredProducts.map((item) => (
          <Card style={{ width: "auto" }} key={item.id}>
            <Card.Img variant="top" src={item.image} style={cardImgStyle} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Title>{`Rating: ${item.rating.rate}`}</Card.Title>
              <Card.Title>{`Category: ${item.category}`}</Card.Title>

              <Card.Title>{` ${Math.floor(item.price)} RS`}</Card.Title>
            </Card.Body>
            <Card.Footer>
              {cartItems.some((cartItem) => cartItem.id === item.id) ? (
                <Button variant="danger" onClick={() => navigate("/cart")}>
                  Go to Cart
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </Button>
              )}
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardView;
