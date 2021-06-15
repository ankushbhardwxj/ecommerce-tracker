import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import Login from "./login";
import Homepage from "./homepage";
import UserProfilePage from "./userProfilePage";
import Order from "./orderPage";

const routes = [
  { path: "/login", main: () => <Login /> },
  { path: "/profile", main: () => <UserProfilePage /> },
  { path: "/order", main: () => <Order /> },
  { path: "/", main: () => <Homepage /> },
  { path: "*", main: () => <div> 404 </div> },
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
