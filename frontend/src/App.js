import {Route,Routes,BrowserRouter} from "react-router-dom";
import Register from "./Components/Register";
import RegisterPage from "./Components/RegisterPage";
import "./App.css"
import Signin from "./Components/Signin";
import Dashboard from "./Components/Dashboard";
import DashboardJ from "./Components/DashboardJ";
import Confimation from "./Components/Confirm";

function App() {
  return (
    <div className="container">
        <div className="Header">
            <h2 style={{color: 'rgb(255, 102, 0)'}}>Credo Gym</h2>
            <p className="r_child"><b>Our Time -</b><br/> 12:00 PM to 6:00 PM</p>
        </div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Register/>}></Route>
    <Route path="/RegisterPage" element={<RegisterPage/>}></Route>
    <Route path="/Signin" element={<Signin/>}></Route>
    <Route path="/Dashboard" element={<Dashboard/>}></Route>
    <Route path="/Dashboardj" element={<DashboardJ/>}></Route>
    <Route path="/Confirm" element={<Confimation/>}></Route>
    </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
