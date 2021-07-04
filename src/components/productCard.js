import React, { useState, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";

const productCard = ({ title, image, description, price }) => {
  return (
    <Card>
      <Image size="small" centered src={image} />
      <Card.Content>
        <Card.Header> {title} </Card.Header>
        <Card.Description> {description} </Card.Description>
        <Card.Content>
          <h3>Rs.{price}</h3>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default productCard;
