import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Grid, Card } from "semantic-ui-react";
import axios from "axios";
import CartEntity from "./cartEntity";
import { encrypt, decrypt } from "../../utils/encryptDecrypt";
import random from "random-coordinates";

const CartPage = (props) => {
  console.log(random());
  const username = window.localStorage.getItem("username");
  const key = window.localStorage.getItem("key");
  const [cartItems, setCardItems] = useState([]);
  const [refresh, toggleRefresh] = useState(false);
  // fetch all cart items
  useEffect(async () => {
    let getAllCartItems = await axios({
      method: "GET",
      url: `http://localhost:8000/api/cart/getCart/${username}`,
    });
    setCardItems(getAllCartItems.data);
  }, [refresh]);

  const buyItem = async (id) => {
    let name, price, description, image;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id == id) {
        name = decrypt(cartItems[i].ItemName, key);
        price = decrypt(cartItems[i].ItemPrice, key);
        description = decrypt(cartItems[i].ItemDescription, key);
        image = decrypt(cartItems[i].ItemImage, key);
        break;
      }
    }
    let [lat, long] = random().split(", ");
    let buyItem = await axios({
      method: "POST",
      url: "http://localhost:8000/api/order/createOrder",
      data: {
        username: username,
        orderItemName: encrypt(name, key),
        orderItemPrice: encrypt(String(price), key),
        orderItemDescription: encrypt(description, key),
        orderItemImage: encrypt(image, key),
        onTransit: false,
        delivered: false,
        lat: lat,
        long: long,
      },
    });
    if (buyItem) {
      console.log("Item added to orders");
      removeItem(id);
      toggleRefresh(!refresh);
    }
  };

  const removeItem = async (id) => {
    let deleteItem = await axios({
      method: "DELETE",
      url: "http://localhost:8000/api/cart/deleteItem",
      data: {
        id: id,
      },
    });
    if (deleteItem) console.log("Delete Item done !");
    toggleRefresh(!refresh);
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <h3>Cart Page</h3>
      <Link to="/products">
        <Button primary> Products </Button>
      </Link>
      {cartItems &&
        cartItems.map((item) => {
          return (
            <CartEntity
              key={item._id}
              id={item._id}
              title={decrypt(item.ItemName, key)}
              price={decrypt(item.ItemPrice, key)}
              description={decrypt(item.ItemDescription, key)}
              image={decrypt(item.ItemImage, key)}
              remove={removeItem}
              buy={buyItem}
            />
          );
        })}
    </Container>
  );
};

export default CartPage;
