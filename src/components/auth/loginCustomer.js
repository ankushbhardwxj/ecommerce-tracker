import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Divider,
  Form,
  Input,
  Icon,
} from "semantic-ui-react";

const LoginCustomer = () => {
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

  const handleSubmit = async () => {
    // TODO: DO SOME SHIT HERE
    let signupRes = await axios({
      method: "POST",
      url: "http://localhost:8000/api/auth/signup",
      data: {
        fullName: fullname,
        username: username,
        password: password,
        type: "Customer",
      },
    });
    if (signupRes) {
      console.log("POST METHOD DONE !");
      toggleSignIn(!signIn);
      addSaltToLocalStorage(password);
      handleUserInput("username", "");
      handleUserInput("password", "");
      handleUserInput("fullName", "");
    }
  };

  const handleSignIn = async () => {
    let signinRes = await axios({
      method: "POST",
      url: "http://localhost:8000/api/auth/signin",
      data: {
        username: username,
        password: password,
      },
    });
    if (signinRes) {
      console.log("POST (Sign in) Done !");
      toggleSignIn(!signIn);
      addSaltToLocalStorage(password);
      handleUserInput("username", "");
      handleUserInput("password", "");
      handleUserInput("fullName", "");
    }
  };

  const addSaltToLocalStorage = (password) => {
    let pwdLength = password.length;
    let reqdLength = 32 - pwdLength;
    let salt = "";
    for (let i = 1; i <= reqdLength; i++) {
      let chr = String.fromCharCode(97 + i);
      salt += chr;
    }
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("key", `${password}${salt}`);
  };

  const togglePassword = () => {
    const pwdText = document.getElementById("Password");
    if (pwdText.type == "password") pwdText.type = "text";
    else pwdText.type = "password";
  };

  if (signIn) {
    return <Redirect to={"/products"} />;
  }

  return (
    <Container textAlign="center" style={{ paddingTop: "60px" }}>
      <Card style={styles.container}>
        <Card.Content>
          <Card.Header>
            <h2 style={styles.header}>BestBuy</h2>
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
    fontFamily: "Staatliches",
    color: "black",
    fontSize: "45px",
    paddingBottom: "15px",
    paddingTop: "10px",
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

export default LoginCustomer;
