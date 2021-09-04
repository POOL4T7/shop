import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import FormContainer from "../components/FormConatiner";
import { Button, Form } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { payOrderByStripe } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ORDER_PAY_BY_STRIPE_RESET } from "../constrants/orderConstrants";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeScreen = () => {
  const [disabled, setDisabled] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { order } = useSelector((state) => state.orderDetails);
  const orderPayByStripe = useSelector((state) => state.orderPayByStripe);
  const {
    loading: paymentLoading,
    success: paymentSuccess,
    error: paymentError,
  } = orderPayByStripe;
  const { totalPrice } = order;
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentSuccess) {
      dispatch({ type: ORDER_PAY_BY_STRIPE_RESET });
      window.location.href = `/order/${order._id}`;
    }
  }, [dispatch, order._id, paymentSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/orders/stripe/process`,
      {
        amount: totalPrice * 100,
      },
      config
    );
    console.log(data);
    const client_secret = data.client_secret;
    if (!stripe || !elements) {
      return;
    }

    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: userInfo.name,
          email: userInfo.email,
        },
      },
    });
    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        orderId: order._id,
        paymentId: paymentIntent.id,
        status: paymentIntent.status,
      };
      await dispatch(payOrderByStripe(paymentInfo));
    } else {
      alert("some error occured while processing please try after some time");
    }
    setDisabled(false);
  };

  return (
    <>
      {paymentError && <Message variant="danger">{paymentError}</Message>}
      {paymentLoading && <Loader />}
      <FormContainer>
        <h1>Payment</h1>
        <CheckoutSteps step1 step2 step3 />
        <Form>
          <Form.Group>
            <Form.Label>card Number</Form.Label>
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Expiry</Form.Label>
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
          </Form.Group>
          <Form.Group>
            <Form.Label>CVC</Form.Label>
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={disabled}
            onClick={submitHandler}
          >
            Pay
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default StripeScreen;
