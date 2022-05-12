import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { UserContext } from "../../../App";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "1.2rem",
          lineHeight: "2",
          color: "#495057",
          letterSpacing: "0.025em",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );
  return options;
};

const MakePayment = () => {

  // const [services, setServices] = useState([]);
  // const [packages, setPackages] = useState([]);

  const {
    loggedInUser: { name, email },
  } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    if (!stripe || !elements) {
      return;
    }
    const loading = toast.loading("Please wait...!");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      toast.dismiss(loading);
      return swal("Failed!", error.message, "error", { dangerMode: true });
    }

    // delete serviceInfo._id;
    // serviceInfo.service = serviceInfo.title;
    data.payWith = "Credit Card";
    data.status = "Pending";

    const orderDetails = {
      ...data,
      ...serviceInfo,
      paymentId: paymentMethod.id,
      orderTime: new Date().toLocaleString(),
    };

    axios
      .post("https://pure-atoll-66880.herokuapp.com/addPayment", orderDetails)
      .then((res) => {
        toast.dismiss(loading);
        if (res.data) {
          return swal(
            "Payment successful",
            "Your booking and payment has been successful.",
            "success"
          );
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", {
          dangerMode: true,
        });
      })
      .catch((error) => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", {
          dangerMode: true,
        });
      });
  };


// const Book = () => {
  const {
    selectedService: { title, price },
  } = useContext(UserContext);

  const {
    selectedPackage: { Packagetitle, Packageprice },
  } = useContext(UserContext);

  const [show, setShow] = useState(true);

  // const stripePromise = loadStripe('pk_test_51Ie33uCljQ1lWJFNhmzcstvqqVDr07o9lhLNTrHtGtIqZ2XVyaT1PdijIb0nX2Wyj6RNJ56ipbI7AKhGG6DPRYsv003m5nQO7F');
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);

  const option = services.map((service) => ({
    value: service.title,
    label: service.title,
    price: service.price,
  }));

  const packageOptions = packages.map((packages) => ({
    value: packages.Packagetitle,
    label: packages.Packagetitle,
    price: packages.Packageprice,
  }));

  const defaultOption = title
    ? { value: title, label: title, price: price }
    : { value: "select", label: "select", price: "" };

  const packageDefaultOption = Packagetitle
    ? { value: Packagetitle, label: Packagetitle, price: Packageprice }
    :  { value: "select", label: "select", price: "" };

  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const [packageSelectedOption, setPackageSelectedOption] =
    useState(packageDefaultOption);

  const serviceInfo = services.find(
    (service) => service.title === selectedOption.value
  );

  const packageInfo = packages.find(
    (packages) => packages.Packagetitle === packageSelectedOption.value
  );

  useEffect(() => {
    axios
      .get("https://pure-atoll-66880.herokuapp.com/services")
      .then((res) => setServices(res.data))
      .catch((error) => toast.error(error.message));
  }, []);

  useEffect(() => {
    axios
      .get("https://pure-atoll-66880.herokuapp.com/package")
      .then((res) => setPackages(res.data))
      .catch((error) => toast.error(error.message));
  }, []);

  return (
    <section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="form-main"
          style={{ borderRadius: "15px", maxWidth: "85rem" }}
        >
          <Form.Row>
            <Col md={6} xs={12} className="pr-md-4">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Your Name
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={name}
                  {...register("name", { required: true })}
                  placeholder="Your Name"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={email}
                  {...register("email", { required: true })}
                  placeholder="Email Address"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  {...register("phone", { required: true })}
                  placeholder="Phone Number"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Service Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("serviceName", { required: true })}
                  placeholder="Service Name"
                />
              </Form.Group>
              {/* <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Service Type
                </Form.Label> */}
                {/* <Form.Control
                  as="select"
                  {...register("servicetype", { required: true })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </Form.Control> */}
                {/* <label style={{ fontWeight: "bold" }}>Service</label> */}
                {/* <Select
                  onChange={(option) => setSelectedOption(option)}
                  defaultValue={defaultOption}
                  options={option}  
                />
              </Form.Group> */}
            </Col>

            <Col md={6} xs={12} className="pl-md-4">
              <div>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Card Number
                </Form.Label>
                <CardNumberElement className="form-control" options={options} />
              </div>
              <div className="mt-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Expiration Date
                </Form.Label>
                <CardExpiryElement className="form-control" options={options} />
              </div>
              <div className="mt-3">
                <Form.Label style={{ fontWeight: "bold" }}>CVC</Form.Label>
                <CardCvcElement className="form-control" options={options} />
              </div>
            </Col>
          </Form.Row>
        </div>

        <div className="text-center mt-4">
          <Button
            type="submit"
            className="btn-main"
            disabled={!stripe}
            style={{ padding: ".68rem 2rem" }}
          >
            Pay Now
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default MakePayment;
