import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import Figure from "react-bootstrap/Figure";

const PolynomialPlot = () => {
  const [plot, setPlot] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/polynomial_plot");
        const parsedData = JSON.parse(res.data); // Parse the JSON string into an object
        setPlot(parsedData); // Update the state with the parsed data
        console.log("Plot data has been set:", parsedData);
      } catch (err) {
        console.log("Error in fetching plotly_chart:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <Figure>
      <Figure.Caption>Nulla vitae elit libero, a pharetra augue mollis interdum.</Figure.Caption>
      <Plot data={plot.data} layout={plot.layout} />
    </Figure>
  );
};

export default PolynomialPlot;
