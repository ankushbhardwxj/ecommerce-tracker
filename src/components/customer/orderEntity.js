import React, { useEffect, useState } from "react";
import { Button, Card, Image, Modal, Container, Accordion } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import axios from 'axios';

const OrderDetail = props => {
  const [addresses, setAddresses] = useState([]);

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: props.lat, lng: props.long },
      map,
      title: "Marker",
    });
    return marker;
  };

  const reverseLocation = async item => {
    let { lat, long, date } = item;
    let accesskey = "9e2a1b435ac7441749af061792885132";
    let reverseAddr = await axios({
      method: "GET",
      url: `http://api.positionstack.com/v1/reverse?access_key=${accesskey}&query=${lat},${long}&limit=1`
    });
    let address = reverseAddr.data.data[0].label;
    return `${address}, ${new Date(date).toLocaleDateString()}, ${new Date(date).toLocaleTimeString()}`;
  }

  useEffect(async () => {
    props.coords.map(async (item) => {
      let address = await reverseLocation(item);
      setAddresses([...addresses, address]);
    });
  }, []);

  return (
    <>
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content image scrolling>
        <Image size='medium' src={props.image} />
        <Modal.Description>
          <p>{props.description}</p>
          <strong>{"Status: "}</strong>
          {props.delivered ? "Delivered" : null} <br />
          {props.onTransit && !props.delivered ? "On Transit" : null} <br />
          <ul>
            {addresses.map(item => <li> {item} </li>)}
          </ul>
          <h3> Track Realtime Location </h3>
          <GoogleMapReact
            defaultCenter={{ lat: props.lat, lng: props.long }}
            defaultZoom={5}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            bootstrapURLKeys={{
              key: "AIzaSyAmnmCrfuqiwiV1qxUJ1AgKa5vkOPSeBtQ",
            }}
          ></GoogleMapReact>
        </Modal.Description>
      </Modal.Content>
    </>
  )
}

const OrderEntity = ({ title, price, image, description, delivered, onTransit, lat, long, coords }) => {
  const [open, setOpen] = useState(false);
  return (
    <Container style={{ marginTop: "15px" }}>
      <Card>
        <Image src={image} size="mini" />
        <Card.Content>
          {title}
          <br />
          <strong>Rs {price}</strong>
        </Card.Content>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button basic size="small" icon="dropdown" content="Show more details" />}
        >
          <OrderDetail
            title={title}
            price={price}
            image={image}
            description={description}
            onTransit={onTransit}
            delivered={delivered}
            lat={lat}
            long={long}
            coords={coords}
          />
        </Modal>
      </Card>
    </Container>


  );
};

export default OrderEntity;
