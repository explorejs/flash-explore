import React, { useState } from "react";
import "./App.css";
import { useAuth } from "./api/useAuth";

function App() {
  const [state, setState] = useState({ email: "", password: "" });
  const {
    // logUserIn,
    registerUser,
    // resextPassword,
    // signOut,
    // authChecked,
    // error,
    // user,
  } = useAuth();

  const handleChange = (e) => {
    // fira;
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.email || state.password.length < 6) {
      return;
    }
    registerUser(state.email, state.password);
  };

  return (
    <div className="App">
      <input name="email" onChange={handleChange} value={state.email} />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        value={state.password}
      />
      <button onClick={handleSubmit}> Register</button>
    </div>
  );
}

export default App;
