import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Grid, Card } from "semantic-ui-react";
import axios from "axios";
import ProductCard from "./productCard";

const Homepage = (props) => {
  const [product, setproduct] = useState();
  useEffect(async () => {
    let getProducts = await axios({
      method: "GET",
      url: "https://fakestoreapi.com/products/",
    });
    setproduct(getProducts.data);
  }, []);

  return (
    <Container>
      <h1 style={{ fontFamily: "Staatliches", fontSize: "150px" }}>
        BESTBUY.COM
      </h1>
      <p>
        Welcome to BestBuy ! This is the only ecommerce website which keeps your
        activity secure from advertizers and preserves your privacy.
        <br />
        Best buy hides your shopping activity and data, which prevents violation
        of privacy during any database hack or stealing of information by big
        companies to target their ads towards customers of Bestbuy.
        <br />
        <br />
        Best Buy has the best in class package tracking system which gives you
        realtime information of your packages.
      </p>
      <Link to="/loginCustomers">
        <Button primary>Login</Button>
      </Link>
      <Link to="/loginDelivery">
        <Button primary> Login (delivery providers) </Button>
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

export default Homepage;
