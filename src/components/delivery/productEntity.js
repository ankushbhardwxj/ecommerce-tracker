import React, { useState } from "react";
import { Card, Button, Image } from "semantic-ui-react";
import axios from "axios";

const DeliveryEntity = props => {
  const [delivered, toggleDelivered] = useState(props.delivered);
  const [inTransit, toggleTransit] = useState(props.onTransit);
  console.log(props);

  const handleDelivered = async () => {
    await axios({
      method: "PUT",
      url: "http://localhost:8003/api/deliveries/item/updateItemDelivered",
      data: {
        id: props.id,
        delivered: !delivered
      }
    })
    toggleDelivered(!delivered)
  }
  const handleTransit = async () => {
    await axios({
      method: "PUT",
      url: "http://localhost:8003/api/deliveries/item/updateTransit",
      data: {
        id: props.id,
        onTransit: !inTransit
      }
    })
    toggleTransit(!inTransit)
  }

  const handleLocation = async () => {
    // get location using Geolocation API
    const success = async pos => {
      console.log(pos.coords);
      let latitude = pos.coords.latitude;
      let longitude = pos.coords.longitude;
      // update location of order
      await axios({
        method: "PUT",
        url: "http://localhost:8003/api/deliveries/item/updateCoordinates",
        data: {
          id: props.id,
          lat: latitude,
          long: longitude
        }
      })
    }
    const error = err => console.log(err);
    navigator.geolocation.getCurrentPosition(success, error);
  }

  return (
    <Card style={{ width: "500px" }}>
      <Card.Content style={{ width: "500px" }}>
        <Image src={props.image} size="mini" floated="left" />
        <Card.Header>{props.name}</Card.Header>
        <Card.Description>
          {props.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group>
          {delivered ?
            <Button primary onClick={handleDelivered} content="Delivered" /> :
            <Button onClick={handleDelivered} content="Not Delivered" />}
          {inTransit ? <Button primary onClick={handleTransit} content="In Transit" /> :
            <Button onClick={handleTransit} content="In warehouse" />}
          <Button onClick={handleLocation} content="Update Location" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default DeliveryEntity;