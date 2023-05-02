import SignIn from "./Components/Pages/Sign-In";
import SignUp from "./Components/Pages/Sign-Up";
import Home from "./Components/Pages/Home.js";
import HomeCategory from "./Components/Pages/HomeCategory.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Components/Pages/CartPage.js";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/:category" element={<HomeCategory />} />
        <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/cart" element={<Cart setUser={setUser} user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
