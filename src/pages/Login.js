import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./pages.css";
import { useAuth } from "../api/useAuth";

function Login() {
  const [state, setState] = useState({ email: "", password: "" });
  const {
    // logUserIn,
    registerUser,
    // resextPassword,
    signOut,
    // authChecked,
    // error,
    user,
  } = useAuth();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.email || state.password.length < 6) {
      return;
    }
    registerUser(state.email, state.password);
  };

  if (user.uid) {
    return (
      <div className="App">
        <h2>Welcome to Flash Explore</h2>
        <Button onClick={signOut} variant="contained" color="primary">
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="App">
      <form className="sign_up">
        <TextField
          name="email"
          onChange={handleChange}
          value={state.email}
          type="email"
          label="email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="password"
          type="password"
          onChange={handleChange}
          value={state.password}
          label="password"
          margin="normal"
          variant="outlined"
        />
        <div className="btn_container">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={state.password.length < 6 || !state.email.includes("@")}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
