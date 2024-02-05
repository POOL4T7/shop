// import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import axios from "axios";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import Hearder from "./components/Hearder";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import NotFound from "./components/NotFound";
// import StripeScreen from "./screens/StripeScreen";

function App() {
  // const [stripeApiKey, setStripeApiKey] = useState("");
  // useEffect(() => {
  //   async function getStripeApiKey() {
  //     const { data } = await axios.get("/api/config/stripe");
  //     setStripeApiKey(data);
  //   }
  //   getStripeApiKey();
  // }, []);
  return (
    <Router>
      <Hearder />
      <Container className="py-3">
        <Switch>
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />
          <Route path="/shipping" exact component={ShippingScreen} />
          <Route path="/payment" exact component={PaymentScreen} />
          {/* {stripeApiKey && (
            <Route path="/order/:id/stripe/payment" exact>
              <Elements stripe={loadStripe(stripeApiKey)}>
                <StripeScreen />
              </Elements>
            </Route>
          )} */}
          <Route path="/placeorder" exact component={PlaceOrderScreen} />
          <Route path="/order/:id" exact component={OrderScreen} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/product/:id" exact component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" exact component={UserListScreen} />
          <Route path="/admin/user/:id/edit" exact component={UserEditScreen} />
          <Route
            path="/admin/productlist"
            exact
            component={ProductListScreen}
          />
          <Route
            path="/admin/productlist/:page"
            exact
            component={ProductListScreen}
          />
          <Route
            path="/admin/product/:id/edit"
            exact
            component={ProductEditScreen}
          />
          <Route path="/admin/orderlist" exact component={OrderListScreen} />
          <Route path="/search/:keyword" exact component={HomeScreen} />
          <Route path="/page/:page" exact component={HomeScreen} />
          <Route
            path="/search/:keyword/page/:page"
            exact
            component={HomeScreen}
          />
          <Route path="/" exact component={HomeScreen} />
          <Route path="/*" exact component={NotFound} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
