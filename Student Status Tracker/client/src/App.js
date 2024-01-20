import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Headers from "./Components/Headers/Headers";
import Home from "./Pages/Home/Home";
import Edit from "./Pages/Edit/Edit";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import { Route, Routes } from "react-router-dom"; // this is to perform routing

function App() {
  return (
    <div className="bg">
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/userprofile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
