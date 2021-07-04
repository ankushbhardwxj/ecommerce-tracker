import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Card,
  Grid,
  Image,
  Accordion,
  Icon,
} from "semantic-ui-react";
import { schema } from "./utils/schema";
import GoogleMapReact from "google-map-react";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

const OrderPage = (props) => {
  const [order, setOrderDetails] = useState();
  const [active, setActive] = useState(false);

  useEffect(() => {
    let [myOrders] = schema.users;
    setOrderDetails(myOrders.myOrders[0]);
    console.log(order);
  }, []);

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: 26.1219, lng: 91.9493 },
      map,
      title: "Marker",
    });
    return marker;
  };

  if (order)
    return (
      <Container textAlign="center" style={{ paddingTop: "60px" }}>
        <Header as="h3"> Order details </Header>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Image src={order.image} />
            </Grid.Column>
            <Grid.Column>
              <Header as="h2">{order.orderName}</Header>
              <p> Order ID: {order.orderId} </p>
              <Header as="h4">Rs.{order.orderAmount} </Header>
              <p>
                Expected delivery date:<b> 20 June 2021</b>
              </p>
              <Accordion>
                <Accordion.Title onClick={() => setActive(!active)}>
                  {active && (
                    <span>
                      <Header as="h3">
                        <Icon name="arrow circle down" />
                        Delivery status: In Transit{" "}
                      </Header>
                    </span>
                  )}
                  {!active && (
                    <span>
                      <Header as="h3">
                        <Icon name="arrow circle right" />
                        Delivery status: In Transit{" "}
                      </Header>
                    </span>
                  )}
                </Accordion.Title>
                <Accordion.Content active={active}>
                  <Card.Group style={{ marginLeft: "100px" }}>
                    {order.status.map((r, idx) => (
                      <Card key={idx}>
                        <Card.Content>
                          <p>
                            Reached {r.deliveryPointName} on {r.time}
                          </p>
                          <p>Contact: {r.phoneNumber}</p>
                        </Card.Content>
                      </Card>
                    ))}
                  </Card.Group>
                </Accordion.Content>
              </Accordion>
              <Header as="h3"> Track Realtime Location </Header>
              <GoogleMapReact
                defaultCenter={{ lat: 26.1219, lng: 91.9493 }}
                defaultZoom={5}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                bootstrapURLKeys={{
                  key: "AIzaSyAmnmCrfuqiwiV1qxUJ1AgKa5vkOPSeBtQ",
                }}
              ></GoogleMapReact>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  else return <div> Loading order </div>;
};

export default OrderPage;
