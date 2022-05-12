import axios from "axios";
import React, { useContext } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { UserContext } from "../../../App";

const BookFrom = ({ serviceInfo, packageInfo }) => {
  const {
    loggedInUser: { name, email },
  } = useContext(UserContext);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const loading = toast.loading("Please wait...!");
console.log(serviceInfo);
    delete serviceInfo?._id;
    delete packageInfo?._id;
    serviceInfo.service = serviceInfo?.title;
    // packageInfo.Packageservice = packageInfo?.Packagetitle ;
    // data.payWith = "Credit Card";
    data.status = "Pending";
// console.log(serviceInfo);
// console.log(serviceInfo);
    const orderDetails = {
      ...data,
      ...serviceInfo,
      ...packageInfo,
      // paymentId: paymentMethod.id,
      orderTime: new Date().toLocaleString(),
    };
// console.log(orderDetails);
    axios
      .post("https://pure-atoll-66880.herokuapp.com/addOrder", orderDetails)
      .then((res) => {
        toast.dismiss(loading);
        if (res.data) {
          return swal(
            "Book successful",
            "Your booking  has been successful.",
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

  return (
    <section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="form-main mt-n4"
          style={{ borderRadius: "15px", maxWidth: "85rem" }}
        >
          <Form.Row>
            <Col md={12} xs={12} className="pr-md-4">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Service Type</Form.Label>
                <Form.Control as="select" {...register("servicetype", { required: true })}>
                  <option>In Geraz</option>
                  <option>On The Way</option>
                </Form.Control>
              </Form.Group>
            </Col>
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
            </Col>
            <Col md={6} xs={12} className="pr-md-4">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={email}
                  {...register("email", { required: true })}
                  placeholder="Email Address"
                />
              </Form.Group>
            </Col>
            <Col md={6} xs={12} className="pr-md-4">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  placeholder="phoneNumber"
                />
              </Form.Group>
            </Col>
            <Col md={6} xs={12} className="pr-md-4">
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  {...register("address", { required: true })}
                  placeholder="Address"
                />
              </Form.Group>
            </Col>
          </Form.Row>
        </div>

        <div className="text-center mt-4">
          <Button
            type="submit"
            className="btn-main"
            style={{ padding: ".68rem 2rem" }}
          >
            Book Now
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default BookFrom;
