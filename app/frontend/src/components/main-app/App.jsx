import Quote from "../quote/Quote";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ComponentAccordian from "../component-accordian/ComponentAccordian.jsx";
import AppNavbar from "../navbar/AppNavbar.jsx";
import AddBookReview from "../add-book-review/AddBookReview.jsx";
import BookList from "../book-list/BookList.jsx";
import Login from "../login/Login.jsx";
import CollapsibleForm from "../collapsible-form/CollapsibleForm.jsx";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <AppNavbar />
      <div id="content" className="ui container">
        <Routes>
          <Route path="/" element={<Quote />} />
          <Route path="/accordian" element={<ComponentAccordian />} />
          <Route path="/add-book-review" element={<AddBookReview />} />
          <Route path="/book-list" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collapsible-form" element={<CollapsibleForm />} />
        </Routes>
      </div>
    </div>
  );
}
