import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartSlice";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const RemoveItems = (item) => {
    dispatch(removeItem(item));
  };
  const handleIncrementQuantity = (item) => {
    dispatch(incrementQuantity(item.id));
  };
  const handleDecrementQuantity = (item) => {
    dispatch(decrementQuantity(item.id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => Math.floor(total + item.price * item.quantity),
    0
  );
  return (
    <div className="parent">
      <div className="cart-details" id="cart-card">
        {cartItems.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          cartItems.map((cartItem) => (
            <Card key={cartItem.id} className="cart-item">
              <div className="d-flex">
                <Card.Img
                  src={cartItem.image}
                  style={{ width: "150px", height: "150px" }}
                />
                <Card.Body>
                  <Card.Title>{cartItem.title}</Card.Title>
                  <Card.Title>{`INR : ${Math.floor(cartItem.price)}`}</Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => RemoveItems(cartItem)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="checkout-card">
        <Card>
          <Card.Body>
            <Card.Title>Your Cart</Card.Title>
            {cartItems.length === 0 ? (
              <p>No items in the cart</p>
            ) : (
              cartItems.map((cartItem) => (
                <Card key={cartItem.id} className="checkout-item">
                  <Card.Body>
                    <Card.Title>{cartItem.title}</Card.Title>
                    <Card.Title>Price: INR {Math.floor(cartItem.price)}</Card.Title>
                    <div className="quantity-control">
                      <Button
                      id="minus"
                        variant="outline-primary"
                        onClick={() => handleDecrementQuantity(cartItem)}
                      >
                        -
                      </Button>
                      
                      <span className="quantity" id="quan">
                        {cartItem.quantity}
                      </span>
                      <Button
                        variant="outline-primary"
                        id="plus"
                        onClick={() => handleIncrementQuantity(cartItem)}
                      >
                        +
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
            {cartItems.length > 0 && (
              <div>
                <hr />
                <h3>Total: INR {totalAmount}</h3>
                <Button variant="primary">Checkout</Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
