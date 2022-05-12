// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Toast } from "react-bootstrap";
import toast from "react-hot-toast";
import Select from "react-select";
import { UserContext } from "../../../App";
import infoEmojis from "../../../images/info-emoji.svg";
// import PaymentForm from '../Payment/PaymentForm';
import BookFrom from "./BookForm";

const Book = () => {
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

  const options = services.map((service) => ({
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

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      boxShadow: "none",
      border: "2px solid #ced4da",
      "&:hover": { border: "2px solid #fd7e15" },
      height: "calc(2em + 0.75rem + 2px)",
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? "#fd7709"
          : isFocused
          ? "#fd770928"
          : null,
        color: isDisabled
          ? null
          : isSelected
          ? "white"
          : isFocused
          ? "black"
          : "black",
        cursor: isDisabled ? "not-allowed" : "default",
        ":active": {
          ...styles[":active"],
          backgroundColor:
            !isDisabled && (isSelected ? "#fd7709" : "#fd770948"),
        },
      };
    },
  };

  return (
    <>
      <Toast
        className="toast-right"
        onClose={() => setShow(false)}
        show={show}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <img src={infoEmojis} className="rounded mr-2" alt="Info" />
          <strong className="mr-auto">Important Info</strong>
        </Toast.Header>
        <Toast.Body className="text-center">
          Use this Card Number to test the payment
          <br />
          <b>4242 4242 4242 4242</b>
        </Toast.Body>
      </Toast>

      <section>
        <Container
          className="p-5 mx-auto mt-5 bg-white"
          style={{ borderRadius: "15px" }}
        >
          <div className="px-4">
            <Row>
            <Col md={6} xs={12} className="pr-md-4">
                <label style={{ fontWeight: "bold" }}>Service</label>
                <Select
                  onChange={(option) => setSelectedOption(option)}
                  defaultValue={defaultOption}
                  options={options}
                  styles={colourStyles}
                />
              </Col>

              <Col md={6} xs={12} className="form-main pl-md-2 pr-md-4 pl-sm-3 pr-sm-3 mb-2">
                <label style={{ fontWeight: "bold" }}>Price</label>
                <div
                  className="form-control w-100"
                  style={{ lineHeight: "2", fontWeight: "500" }}
                >
                  ${selectedOption.price}
                </div>
              </Col>

              <Col md={6} xs={12} className="pr-md-4">
                <label style={{ fontWeight: "bold" }}>Packages</label>
                <Select
                  onChange={(option) => setPackageSelectedOption(option)}
                  defaultValue={packageDefaultOption}
                  options={packageOptions}
                  styles={colourStyles}
                />
              </Col>
              {/* <Col md={6} xs={12} className="pr-md-3 form-main"> */}
              <Col md={6} xs={12} className="form-main pl-md-2 pr-md-4 pl-sm-3 pr-sm-3">
                <label style={{ fontWeight: "bold" }}>Price</label>
                <div
                  className="form-control w-100"
                  style={{ lineHeight: "2", fontWeight: "500" }}
                >
                  ${packageSelectedOption.price}
                </div>
              </Col>
            </Row>

            <div className="mt-5">
              {/* <Elements stripe={stripePromise}> */}
              {/* <PaymentForm serviceInfo={serviceInfo} /> */}
              <BookFrom serviceInfo={serviceInfo} packageInfo={packageInfo} />
              {/* </Elements> */}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Book;
