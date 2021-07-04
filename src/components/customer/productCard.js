import React, { useState, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import axios from "axios";
import { encrypt } from "../../utils/encryptDecrypt";

const productCard = ({ title, image, description, price }) => {

  const handleAddToCart = async () => {
    let username = window.localStorage.getItem("username");
    let key = window.localStorage.getItem("key");
    let addToCart = await axios({
      method: "POST",
      url: "http://localhost:8002/api/cart/addToCart",
      data: {
        ItemName: encrypt(title, key),
        ItemPrice: encrypt(String(price), key),
        ItemImage: encrypt(image, key),
        ItemDescription: encrypt(description, key),
        username: username
      }
    })
    if (addToCart) {
      console.log("Successfully added to cart.");
    }
  }

  return (
    <Card>
      <Image size="small" centered src={image} />
      <Card.Content>
        <Card.Header> {title} </Card.Header>
        <Card.Description> {description} </Card.Description>
        <Card.Content>
          <h3>Rs.{price}</h3>
        </Card.Content>
        <Button primary onClick={handleAddToCart}> Add to cart </Button>
      </Card.Content>
    </Card>
  );
};

export default productCard;
