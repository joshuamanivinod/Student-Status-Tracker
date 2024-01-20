import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./edit.css";
import Spiner from "../../Components/Spiner/Spiner";
import { editfunc, singleUsergetfunc } from "../../Services/Apis";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Services/helper";
import { updateData } from "../../Components/context/ContextProvider";

const Edit = () => {
  const [showSpin, setShowSpin] = useState(true);

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("Active");
  const [imgdata, setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { update, setUpdate } = useContext(updateData);

  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  // set input value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  // set profile
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  // edit
  const { id } = useParams();
  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    // console.log(response );
    if (response.status === 200) {
      setInputData(response.data);
      setStatus(response.data.status);
      setImgdata(response.data.profile);
    } else {
      console.log("error");
    }
  };

  // submit user data
  const submitUserData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = inputdata;
    if (fname === "") {
      toast.error("First name is required!!");
    } else if (lname === "") {
      toast.error("Last name is required!");
    } else if (email === "") {
      toast.error("Email is required!");
    } else if (!email.includes("@")) {
      toast.error("Enter valid email!");
    } else if (mobile === "") {
      toast.error("Mobile number is required!");
    } else if (mobile.length > 10) {
      toast.error("Enter valid mobile number!");
    } else if (gender === "") {
      toast.error("Gender is required!");
    } else if (status === "") {
      toast.error("Status is required!");
    } else if (location === "") {
      toast.error("Location is required!");
    } else {
      // toast.success("Registration Successful!");
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image || imgdata); //image-new img , imgdata-old img
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await editfunc(id, data, config);
      if (response.status === 200) {
        setUpdate(response.data);
        navigate("/");
      } else {
        toast.error("Error!");
      }
    }
  };

  useEffect(() => {
    userProfileGet();
  }, [id]);

  useEffect(() => {
    if (image) {
      setImgdata("");
      setPreview(URL.createObjectURL(image));
    }

    setTimeout(() => {
      setShowSpin(false);
    }, 600);
  }, [image]);

  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Update Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center ">
              <img
                src={image ? preview : `${BASE_URL}/uploads/${imgdata}`}
                alt="img"
              />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6 "
                  controlId="formBasicEmail"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="First name"
                    onChange={setInputValue}
                    value={inputdata.fname}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Last name"
                    onChange={setInputValue}
                    value={inputdata.lname}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={setInputValue}
                    value={inputdata.email}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={setInputValue}
                    value={inputdata.mobile}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select you gender</Form.Label>
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    checked={inputdata.gender === "Male" ? true : false}
                    onChange={setInputValue}
                  />
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    checked={inputdata.gender === "Female" ? true : false}
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select you Status</Form.Label>
                  <Select
                    options={options}
                    onChange={setStatusValue}
                    defaultValue={status}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6 "
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    placeholder="Select Your Profile"
                    onChange={setProfile}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6 "
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Enter Your Location"
                    onChange={setInputValue}
                    value={inputdata.location}
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit" onClick={submitUserData}>
                Submit
              </Button>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Edit;
