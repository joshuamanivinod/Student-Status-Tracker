import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Tables from "../../Components/Tables/Tables";
import Spiner from "../../Components/Spiner/Spiner";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { deletefunc, exportToCsvFunc, usergetfunc } from "../../Services/Apis";
import { toast } from "react-toastify";
import {
  addData,
  dltdata,
  updateData,
} from "../../Components/context/ContextProvider";

const Home = () => {
  const navigate = useNavigate();
  const adduser = () => {
    navigate("/register");
  };

  const [showSpin, setShowSpin] = useState(true);
  const [userdata, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setgender] = useState("All");
  const [status, setstatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { userAdd, setUserAdd } = useContext(addData);
  const { update, setUpdate } = useContext(updateData);
  const { deletedata, setdeletedata } = useContext(dltdata);

  // get user
  const userGet = async () => {
    const response = await usergetfunc(search, gender, status, sort,page);

    if (response.status === 200) {
      setUserData(response.data.usersData);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error from user data");
    }
  };

  // delete user
  const deleteUser = async (id) => {
    const response = await deletefunc(id);
    if (response.status === 200) {
      userGet();
      setdeletedata(response.data);
    } else {
      toast.error("error");
    }
  };

  // export user
  const exportuser = async () => {
    const response = await exportToCsvFunc();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("error");
    }
  };

  // pagination
  // funnction for prev and next
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 600);
  }, [search, gender, status, sort,page]);

  return (
    <>
      {userAdd ? (
        <Alert variant="success" onClose={() => setUserAdd("")} dismissible>
          {userAdd.fname.toUpperCase()} Successfully Added!
        </Alert>
      ) : (
        ""
      )}
      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} Successfully Updated!
        </Alert>
      ) : (
        ""
      )}
      {deletedata ? (
        <Alert variant="danger" onClose={() => setdeletedata("")} dismissible>
          {deletedata.fname.toUpperCase()} Successfully Deleted!
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between ">
            <div className="search col-lg-4 ">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  className="search_btn text-white "
                >
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}>
                <i class="fa-solid fa-plus"></i>&nbsp; Add User
              </Button>
            </div>
          </div>
          {/* export,status,gender */}
          <div className="filter_div mt-5 d-flex justify-content-between flex-flex-wrap ">
            <div className="export_csv">
              <Button className="export_btn" onClick={exportuser}>
              <i class="fa-solid fa-download"></i>&nbsp;Download
              </Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter by Gender</h3>
                <div className="gender d-flex justify-content-between ">
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setgender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setgender(e.target.value)}
                  />
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setgender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* sort by value */}
            <div className="filter_new_old">
              <h3>Sort by Time</h3>
              <Dropdown className="text-center ">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  {/* <i class="fa-solid fa-sort"></i> */}
                  <i class="fa-solid fa-angles-down"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter by Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap ">
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setstatus(e.target.value)}
                    defaultChecked
                  />
                  &nbsp;
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setstatus(e.target.value)}
                  />
                  &nbsp;
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setstatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSpin ? (
          <Spiner />
        ) : (
          // props
          <Tables
            userdata={userdata}
            deleteUser={deleteUser}
            userGet={userGet}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default Home;
