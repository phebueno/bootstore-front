import SignIn from "./Components/Pages/Sign-In";
import SignUp from "./Components/Pages/Sign-Up";
import Home from "./Components/Pages/Home.js";
import HomeCategory from "./Components/Pages/HomeCategory.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/home/:category" element={<HomeCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
