import Accordion from "react-bootstrap/Accordion";
import PolynomialPlot from "../polynomial-plot/PolynomialPlot.jsx";
import RegressionPlot from "../regression-plot/RegressionPlot.jsx";
import SurfacePlot from "../surface-plot/SurfacePlot.jsx";
import Counter from "../counter/Counter.jsx";
import BookList from "../book-list/BookList.jsx";
import CapitaliseForm from "../capitalise-form/CapitaliseForm.jsx";

function ComponentAccordian() {
  return (
    <div className="accordion-container">
      <Accordion defaultActiveKey="-1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Polynomial plot</Accordion.Header>
          <Accordion.Body>
            <PolynomialPlot />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Regression plot</Accordion.Header>
          <Accordion.Body>
            <RegressionPlot />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>3D surface plot</Accordion.Header>
          <Accordion.Body>
            <SurfacePlot />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Counter component</Accordion.Header>
          <Accordion.Body>
            <Counter />
            <Counter />
            <Counter />
            <Counter />
            <Counter />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Book ratings with API pagination</Accordion.Header>
          <Accordion.Body>
            <BookList />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Form</Accordion.Header>
          <Accordion.Body>
            <CapitaliseForm />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ComponentAccordian;
