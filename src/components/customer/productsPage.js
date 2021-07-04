import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Grid, Card } from "semantic-ui-react";
import axios from "axios";
import ProductCard from "./productCard";

const ProductPage = (props) => {
  const [product, setproduct] = useState();
  useEffect(async () => {
    let getProducts = await axios({
      method: "GET",
      url: "https://fakestoreapi.com/products/",
    });
    setproduct(getProducts.data);
  }, []);

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2> Products List </h2>
      <Link to="/cart">
        <Button primary> Go to Cart </Button>
      </Link>
      <Link to="/orders">
        <Button primary> Go to Orders </Button>
      </Link>
      <Grid columns={3} divided style={{ marginTop: "30px" }}>
        <Grid.Row>
          {product &&
            product.map((r, i) => (
              <ProductCard
                key={i}
                image={r.image}
                title={r.title}
                price={r.price}
                description={r.description}
              />
            ))}
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default ProductPage;
