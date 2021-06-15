import React, { useState, useEffect } from "react";
import {
  Accordion,
  Container,
  Card,
  Icon,
  Header,
  Grid,
} from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { schema } from "./utils/schema";

const UserProfilePage = (props) => {
  const [orders, setOrders] = useState([]);
  const [route, toggleRoute] = useState(false);
  useEffect(() => {
    // get all orders of an user
    let [userdata] = schema.users;
    console.log(userdata.myOrders);
    setOrders(userdata.myOrders);
  }, []);

  const handleClick = (e) => {
    toggleRoute(!route);
  };

  return (
    <Container textAlign="center" style={{ paddingTop: "60px" }}>
      <Header as="h3"> User Profile Information & Orders </Header>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Card
              image="https://avatars.githubusercontent.com/u/40923324?v=4"
              header="Ankush Bhardwaj"
              meta="Customer"
              description="Bangalore, Karnataka"
              extra={
                <a>
                  <Icon name="user" /> 5 orders till now{" "}
                </a>
              }
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h5"> Orders </Header>
            <Card.Group>
              {orders.map((r) => (
                <>
                  <Card>
                    <Card.Content>
                      <h4> Item: {r.orderName} </h4>
                      <h5> OrderId: {r.orderId} </h5>
                      <p> Rs. {r.orderAmount} </p>
                    </Card.Content>
                    <Accordion>
                      <Accordion.Title onClick={handleClick}>
                        <Icon name="dropdown" />
                        Order Details
                      </Accordion.Title>
                      <Accordion.Content active={route}>
                        SOME SHIT & A MAP
                      </Accordion.Content>
                    </Accordion>
                  </Card>
                </>
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default UserProfilePage;
