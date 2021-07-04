import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import LoginCustomer from "./components/auth/loginCustomer";
import LoginDelivery from "./components/auth/loginDelivery";
import Homepage from "./components/homepage";
import ProductPage from "./components/customer/productsPage";
import Cart from "./components/customer/cartPage";
import Orders from "./components/customer/ordersPage";

const routes = [
  { path: "/orders", main: () => <Orders /> },
  { path: "/cart", main: () => <Cart /> },
  { path: "/products", main: () => <ProductPage /> },
  { path: "/loginCustomers", main: () => <LoginCustomer /> },
  { path: "/loginDelivery", main: () => <LoginDelivery /> },
  { path: "/", main: () => <Homepage /> },
  { path: "*", main: () => <div> NOT FOUND: 404 </div> },
];

const App = () => {
  return (
    <>
      <Router>
        <Container fluid>
          <Switch>
            {routes.map((route, idx) => (
              <Route key={idx} path={`${route.path}`} children={route.main} />
            ))}
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
