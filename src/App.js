import SignIn from "./Components/Pages/Sign-In";
import SignUp from "./Components/Pages/Sign-Up";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Components/Pages/CartPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
