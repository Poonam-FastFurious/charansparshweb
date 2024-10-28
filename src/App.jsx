import "./App.css";
import "../src/assets/assets/css/vendor/gicons.css";
import "../src/assets/assets/css/plugins/animate.css";
import "../src/assets/assets/css/plugins/swiper-bundle.min.css";
import "../src/assets/assets/css/plugins/owl.carousel.min.css";
import "../src/assets/assets/css/plugins/owl.theme.default.min.css";
import "../src/assets/assets/css/plugins/slick.min.css";
import "../src/assets/assets/css/plugins/nouislider.css";
import "../src/assets/assets/css/style.css";
import "../src/assets/assets/css/responsive.css";
import Login from "./Components/Authentication/Login";
import SignUp from "./Components/Authentication/SignUp";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Components/Pages/Cart";
import Wishlist from "./Components/Pages/Wishlist";
import Templelist from "./Components/Temple/Templelist";
import Templedetails from "./Components/Temple/Templedetails";
import ProductDetails from "./Components/Product/ProductDetails";
import Contactus from "./Components/Contactus/Contactus";
import Aboutus from "./Components/AboutUs/Aboutus";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import Profile from "./Components/Pages/Profile";
import NewCheckOut from "./Components/Pages/NewCheckOut";
import UserDashboard from "./Components/Pages/UserDashboard";
import UserBillinginfo from "./Components/Pages/UserBillinginfo";
import UserChangePassword from "./Components/Pages/UserChangePassword";
import Orderlist from "./Components/Pages/Orderlist";
import Navbar from "./Components/Home/Navbar";
import Shoppage from "./Components/Productlist/Shoppage";
import Stateproduct from "./Components/Pages/StateviseProduct/Stateproduct";
import Detailsproduct from "./Components/Pages/StateviseProduct/Detailsproduct";
import CategorywiseProduct from "./Components/Productlist/CategorywiseProduct";
import Privacy from "./Components/Pages/Settings/Privacy";
import ReturnPolicy from "./Components/Pages/Settings/ReturnPolicy";
import TermsCondition from "./Components/Pages/Settings/TermsCondition";
import Header2 from "./Components/Home/Testing/Header2";
import RouteProtected from "./Components/ProtectedRoutes/RouteProtected";
import SerchPage from "./Components/Pages/SearchPages/SerchPage";
import OrderDetails from "./Components/Pages/OrderDetails";
import Suport from "./Components/Suport/Suport";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Header2 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<ProtectedRoute element={<Login />} redirectTo="/" />}
          />
          <Route
            path="/SignUp"
            element={<ProtectedRoute element={<SignUp />} redirectTo="/" />}
          />
          <Route path="/CheckOut" element={<NewCheckOut />} />
          <Route
            path="/Cart"
            element={<RouteProtected element={<Cart />} redirectTo="/login" />}
          />
          <Route
            path="/profile"
            element={
              <RouteProtected element={<Profile />} redirectTo="/login" />
            }
          />
          <Route
            path="/Dashboard"
            element={
              <RouteProtected element={<UserDashboard />} redirectTo="/login" />
            }
          />
          <Route
            path="/Address"
            element={
              <RouteProtected
                element={<UserBillinginfo />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/Change-Password"
            element={
              <RouteProtected
                element={<UserChangePassword />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/Order-History"
            element={
              <RouteProtected element={<Orderlist />} redirectTo="/login" />
            }
          />
          <Route
            path="/wishlist"
            element={
              <RouteProtected element={<Wishlist />} redirectTo="/login" />
            }
          />
          <Route
            path="/product/:categoryName/:subcategory"
            element={<Shoppage />}
          />
          <Route
            path="/product/:categoryName"
            element={<CategorywiseProduct />}
          />
          <Route path="/StateProduct/:statename" element={<Stateproduct />} />
          <Route path="/Productdetails/:id" element={<ProductDetails />} />
          <Route path="/temple" element={<Templelist />} />
          <Route path="/Support" element={<Suport />} />
          <Route path="/OrderDetails/:id" element={<OrderDetails />} />
          <Route path="/templedetails" element={<Templedetails />} />
          <Route path="/ContactUs" element={<Contactus />} />
          <Route path="/AboutUs" element={<Aboutus />} />
          <Route path="/StateProduct" element={<Detailsproduct />} />
          <Route path="/products" element={<SerchPage />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/ReturnPolicy" element={<ReturnPolicy />} />
          <Route path="/TermsCondition" element={<TermsCondition />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
