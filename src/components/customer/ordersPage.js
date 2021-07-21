import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Grid, Card } from "semantic-ui-react";
import axios from "axios";
import OrderEntity from "./orderEntity";
import { decrypt } from "../../utils/encryptDecrypt";
import GoogleMapReact from "google-map-react";

const OrderPage = (props) => {
  const username = window.localStorage.getItem("username");
  const key = window.localStorage.getItem("key");
  const [orderItems, setOrderItems] = useState();
  // fetch all cart items
  useEffect(async () => {
    let getOrders = await axios({
      method: "GET",
      url: `http://localhost:8000/api/order/getOrder/${username}`,
    });
    if (getOrders) {
      console.log(getOrders.data);
      setOrderItems(getOrders.data);
    }
  }, []);

  return (
    <Container style={{ marginTop: "10px" }}>
      <h3>Orders Page</h3>
      <Link to="/products">
        <Button primary> Products </Button>
      </Link>
      {orderItems &&
        orderItems.map((item, idx) => {
          return (
            <OrderEntity
              key={idx}
              title={decrypt(item.orderItemName, key)}
              price={decrypt(item.orderItemPrice, key)}
              description={decrypt(item.orderItemDescription, key)}
              image={decrypt(item.orderItemImage, key)}
              delivered={item.delivered}
              onTransit={item.onTransit}
              lat={item.coordinates[item.coordinates.length - 1].lat}
              long={item.coordinates[item.coordinates.length - 1].long}
              coords={item.coordinates}
            />
          );
        })}
    </Container>
  );
};

export default OrderPage;
