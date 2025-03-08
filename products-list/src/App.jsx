
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import CompareProducts from "./components/CompareProducts";
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<ProductDetails />} />
          <Route path="compare" element={<CompareProducts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


