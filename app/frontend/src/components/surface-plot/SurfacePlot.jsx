import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import Figure from "react-bootstrap/Figure";

const SurfacePlot = () => {
  const [plot, setPlot] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/surface-plot");
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
      <Plot data={plot.data} layout={plot.layout} />
      <Figure.Caption>
        Visualize the decision plane of your model whenever you have more than one variable in your input data. Here, we
        will use sklearn.svm.SVR, which is a Support Vector Machine (SVM) model specifically designed for regression.
        The 3D surface plot is representing a model to categorise iris plants based on sepal_width, sepal_length and
        petal_width.
      </Figure.Caption>
    </Figure>
  );
};

export default SurfacePlot;
