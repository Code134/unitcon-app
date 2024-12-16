import React, { useState, useEffect } from "react";

function InchesToCmConverter() {
  const [inches, setInches] = useState(0);
  const [centimeters, setCentimeters] = useState(0);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInches(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({ inches }),
      });

      if (!response.ok) {
        throw new Error("Failed to convert inches to centimeters");
      }

      const data = await response.json();
      setCentimeters(data.centimeters);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Inches to Centimeters Converter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inches">Inches:</label>
        <input
          type="number"
          id="inches"
          value={inches}
          onChange={handleChange}
        />
        <button type="submit">Convert</button>
      </form>
      {centimeters > 0 && (
        <p>
          {" "}
          {inches} inches = {centimeters} centimeters
        </p>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}

export default InchesToCmConverter;
