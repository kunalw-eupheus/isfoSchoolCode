import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import TopNav from "./component/TopNav";
import NewSchool from "./pages/NewSchool";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllSchool from "./pages/AllSchool";

function App() {
  const isAdmin = useSelector((state: any) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="nav" element={<TopNav />} />
        <Route path="new" element={<NewSchool />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user/create-school"
          element={isAdmin ? <NewSchool /> : <Login />}
        />
        <Route
          path="/user/all-school"
          element={isAdmin ? <AllSchool /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
