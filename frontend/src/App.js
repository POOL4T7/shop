import Hearder from "./components/Hearder";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <Router>
      <Hearder />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" exact component={ProductScreen} />
          <Route path="/cart/:id?"  component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
