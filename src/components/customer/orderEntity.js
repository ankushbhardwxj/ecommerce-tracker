import React, { useEffect, useState } from "react";
import { Button, Card, Image, Modal, Container } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const OrderDetail = props => {
  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: props.lat, lng: props.long },
      map,
      title: "Marker",
    });
    return marker;
  };

  return (
    <>
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content image scrolling>
        <Image size='medium' src={props.image} />
        <Modal.Description>
          <p>{props.description}</p>
          <br /> <br />
          Delivered : {props.delivered} <br />
          On Transit : {props.onTransit} <br />
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

const OrderEntity = ({ title, price, image, description, delivered, onTransit, lat, long }) => {
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
          />
        </Modal>
      </Card>
    </Container>


  );
};

export default OrderEntity;
