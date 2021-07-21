import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import DeliveryEntity from "./productEntity";
import { decrypt } from "../../utils/encryptDecrypt";

const DeliveryPage = (props) => {
  const key = window.localStorage.getItem("key");
  const [delivery, setDelivery] = useState([]);

  useEffect(async () => {
    let getAllDeliveries = await axios({
      method: "GET",
      url: "http://localhost:8000/api/deliveries",
    });
    console.log(getAllDeliveries.data);
    setDelivery(getAllDeliveries.data);
  }, []);

  return (
    <Container style={{ paddingTop: "10px" }}>
      <h3> Deliveries </h3>
      {delivery &&
        delivery.map((item) => {
          return (
            <DeliveryEntity
              key={item._id}
              id={item._id}
              name={decrypt(item.orderItemName, key)}
              image={decrypt(item.orderItemImage, key)}
              description={decrypt(item.orderItemDescription, key)}
              delivered={item.delivered}
              onTransit={item.onTransit}
            />
          );
        })}
    </Container>
  );
};

export default DeliveryPage;

