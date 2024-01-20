import React, { useEffect, useState } from "react";
import "./profile.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Spiner from "../../Components/Spiner/Spiner";
import { useParams } from "react-router-dom";
import { singleUsergetfunc } from "../../Services/Apis";
import { BASE_URL } from "../../Services/helper";
import moment from "moment";

const Profile = () => {
  const [showSpin, setShowSpin] = useState(true);
  const [userprofile, setUserProfile] = useState({});
  const { id } = useParams();
  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    if (response.status === 200) {
      setUserProfile(response.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 600);
  }, [id]);
  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="card-profile shadow-lg col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center ">
                    <img
                      src={`${BASE_URL}/uploads/${userprofile.profile}`}
                      alt=""
                    />
                  </div>
                </div>
              </Row>
              <div className="text-center ">
                <h3>{userprofile.fname + " " + userprofile.lname}</h3>
              </div>
              <div className="card-wrapper">
                <div className="">
                  <h4>
                    <i class="fa-solid fa-envelope email"></i>&nbsp;
                    {/* &nbsp; can also be used for space */}
                    <span>{userprofile.email}</span>
                  </h4>
                  <h4>
                    <i class="fa-solid fa-mobile-screen"></i>&nbsp;
                    <span>{userprofile.mobile}</span>
                  </h4>
                  <h4>
                  <i class="fa-solid fa-user"></i>&nbsp;
                    {/* &nbsp; can also be used for space */}
                    <span>{userprofile.gender}</span>
                  </h4>
                  <h4>
                    <i class="fa-solid fa-location-dot"></i>&nbsp;
                    <span>{userprofile.location}</span>
                  </h4>
                  <h4>
                    <i class="fa-solid fa-shield-halved"></i>&nbsp;
                    <span>{userprofile.status}</span>
                  </h4>
                  <h4>
                    <i class="fa-solid fa-calendar-days"></i>&nbsp; Date
                    Created:&nbsp;
                    <span>
                      {moment(userprofile.dateCreated).format("DD-MM-YYYY")}
                    </span>
                  </h4>
                  <h4>
                    <i class="fa-regular fa-pen-to-square"></i>&nbsp; Date
                    Updated:&nbsp;
                    <span>
                      {moment(userprofile.dateUpdated).format("DD-MM-YYYY")}
                    </span>
                  </h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
