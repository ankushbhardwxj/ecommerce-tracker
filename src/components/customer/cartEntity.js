import React, { useEffect, useState } from "react";
import { Button, Card, Image, Grid } from "semantic-ui-react";
import axios from "axios";

const CartEntity = ({ id, title, price, image, remove, buy }) => {
  return (
    <Card>
      <Card.Content>
        <Image src={image} size='mini' verticalAlign='top' />
        <span>
          <p>{title}</p>
          <strong>Rs {price}</strong>
        </span>
      </Card.Content>
      <Button.Group basic size="small">
        <Button onClick={() => remove(id)} icon="remove" content="Remove item" />
        <Button onClick={() => buy(id)} icon="shop" content="Buy now" />
      </Button.Group>
    </Card>
  );
};

export default CartEntity;
