import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Divider,
  Form,
  Grid,
  Input,
  Icon,
} from "semantic-ui-react";

const Login = () => {
  const [login, toggleLogin] = useState(true);
  const [signIn, toggleSignIn] = useState(false);
  const [fullname, setfullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserInput = (key, value) => {
    if (key == "username") {
      setUsername(value);
    }
    if (key == "password") {
      setPassword(value);
    }
    if (!login && key == "fullName") {
      setfullname(value);
    }
  };

  const handleSubmit = () => {
    // TODO: DO SOME SHIT HERE
    axios({
      method: "POST",
      url: "http://localhost:8080/api/auth/signup",
      data: {
        fullName: fullname,
        username: username,
        password: password,
      },
    })
      .then(() => {
        console.log("POST METHOD DONE !");
        toggleSignIn(!signIn);
        handleUserInput("username", "");
        handleUserInput("password", "");
        handleUserInput("fullName", "");
      })
      .catch((err) => {
        console.log("ERROR !" + err);
      });
  };

  const handleSignIn = () => {
    axios({
      method: "POST",
      url: "http://localhost:8080/api/auth/signin",
      data: {
        username: username,
        password: password,
      },
    })
      .then(() => {
        console.log("POST (Sign in) Done !");
        toggleSignIn(!signIn);
        handleUserInput("username", "");
        handleUserInput("password", "");
        handleUserInput("fullName", "");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const togglePassword = () => {
    const pwdText = document.getElementById("Password");
    if (pwdText.type == "password") pwdText.type = "text";
    else pwdText.type = "password";
  };

  if (signIn) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <Container textAlign="center" style={{ paddingTop: "60px" }}>
      <Card style={styles.container}>
        <Card.Content>
          <Card.Header>
            <h2 style={styles.header}>AMAZON.COM</h2>
          </Card.Header>
          <Divider />
          <Form>
            {!login && (
              <>
                <Form.Field>
                  <input
                    onChange={(e) =>
                      handleUserInput("fullName", e.target.value)
                    }
                    value={fullname}
                    id="FullName"
                    placeholder="Full Name"
                  />
                </Form.Field>
              </>
            )}
            <Form.Field>
              <Input
                size="small"
                onChange={(e) => handleUserInput("username", e.target.value)}
                id="Username"
                value={username}
                placeholder="Username"
              />
            </Form.Field>
            <Form.Field>
              <Input
                size="small"
                value={password}
                icon={
                  <Icon
                    name="eye"
                    link
                    onMouseEnter={togglePassword}
                    onMouseLeave={togglePassword}
                  />
                }
                onChange={(e) => handleUserInput("password", e.target.value)}
                id="Password"
                type="password"
                placeholder="Password"
              />
            </Form.Field>
            {!login ? (
              <Button onClick={handleSubmit} secondary>
                Sign Up
              </Button>
            ) : (
              <Button onClick={handleSignIn} secondary>
                Log In
              </Button>
            )}
          </Form>
        </Card.Content>
        <Divider horizontal>OR</Divider>
        <Card.Content extra>
          {login ? (
            <p style={{ color: "black" }}>
              Don't have an account ?
              <span style={styles.link} onClick={() => toggleLogin(false)}>
                {" Sign up"}
              </span>
            </p>
          ) : (
            <p style={{ color: "black" }}>
              Have an account ?
              <span style={styles.link} onClick={() => toggleLogin(true)}>
                {" Log in"}
              </span>
            </p>
          )}
        </Card.Content>
      </Card>
    </Container>
  );
};

const styles = {
  link: { color: "#1f6f8b", cursor: "pointer" },
  icon: {
    color: "black",
    paddingLeft: "20px",
    cursor: "pointer",
  },
  icons: {
    marginLeft: "30%",
    marginRight: "auto",
  },
  header: {
    fontFamily: "Goldman, cursive",
    color: "#f05459",
    fontSize: "35px",
    paddingBottom: "15px",
    paddingTop: "10px",
    textShadow: "2px 2px black",
  },
  subHeader: {
    color: "#222831",
    fontFamily: "Goldman, cursive",
    fontSize: "20px",
  },
  subAuth: {
    color: "#222831",
    fontFamily: "Goldman, cursive",
    fontSize: "15px",
  },
  container: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    background: "#e8e8e8",
  },
  cardLogin: {
    fontFamily: "Constantine",
    color: "black",
  },
  errorMessage: {
    color: "#c73b32",
  },
};

export default Login;