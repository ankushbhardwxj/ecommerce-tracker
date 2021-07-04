import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Grid, Card } from "semantic-ui-react";
import axios from "axios";
import { encrypt } from "./utils/encryptDecrypt";

const Homepage = () => {
  const [product, setproduct] = useState();
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products/",
    })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setproduct(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <h1 style={{ fontFamily: "Staatliches", fontSize: "150px" }}>
        {" "}
        BESTBUY.COM{" "}
      </h1>
      <Link to="/login">
        <Button primary>Login</Button>
      </Link>
      <Grid columns={3} divided>
        <Grid.Row>
          {product &&
            product.map((r, i) => (
              <Card
                key={i}
                image={r.image}
                header={r.title}
                meta={r.price}
                description={r.description}
              />
            ))}
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Homepage;
