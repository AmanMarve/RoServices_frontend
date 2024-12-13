import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import BookApp from "./Screens/BookApp";
import Shop from "./Screens/Shop";
import Checkout from "./Screens/Checkout";
import Navbar from "./components/Navbar";
import Cart from "./Screens/Cart";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <BrowserRouter>
        <a
          href="https://wa.me/9049384729"
          target="_blank"
          class="fixed bottom-4 right-4 rounded-full  hover:bg-green-600 transition-all duration-300 z-50"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            class="w-14"
          />
        </a>


        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/bookApp" element={<BookApp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
