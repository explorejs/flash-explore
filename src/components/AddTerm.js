import React, { useState } from "react";
import { useFlash } from "../hooks/useFlash";

const AddTerm = () => {
  const { addTopic } = useFlash();
  const [state, setState] = useState({ topic: "" });
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addTopic(state.topic);
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "100px" }}
    >
      <label>
        New Topic
        <input
          placeholder="css method"
          onChange={handleChange}
          name="topic"
          value={state.topic}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddTerm;
