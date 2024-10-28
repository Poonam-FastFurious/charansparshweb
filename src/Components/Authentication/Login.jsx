import { useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../Config";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]{2,}@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email format
    if (!validateEmail(formData.email)) {
      setLoading(false);
      setErrorMessage(
        "Invalid email format. Please enter a valid email address."
      );
      return;
    }

    try {
      const response = await fetch(Baseurl + "/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store user data in localStorage and cookies
      localStorage.setItem("userid", data.data.user._id);
      localStorage.setItem("user", JSON.stringify(data.data.user.fullName));
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      // Store tokens in cookies using js-cookie library
      document.cookie = `accessToken=${data.data.accessToken}; path=/; `;
      document.cookie = `refreshToken=${data.data.refreshToken}; path=/; `;

      console.log("Login success:", data); // Handle success response here
      setSuccessMessage("Login successful!");
      setErrorMessage(""); 
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Login error:", error); // Handle error here
      setErrorMessage("Login error, credential not match");
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  py-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between mb-6">
          <button className="text-lg font-semibold ">Sign In</button>
          <button className="text-lg font-semibold ">
            <Link to="/SignUp">Sign Up</Link>
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon className="w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div className="mt-2 text-right">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold hidden"
            >
              Forget Password
            </a>
          </div>
        </div>
        <button
          className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-white  hover:text-[#FF9343]    border-[1px] hover:border-[#FF9343] transition-colors duration-300"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "SIGN IN "}
        </button>
        {errorMessage && (
          <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-sm text-green-500 mt-2">{successMessage}</p>
        )}
        <div className="flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4  transition-colors duration-300">
            <ChromeIcon className="w-5 h-5 mr-2" />
            Google  Login  
          </div>
          <div className="flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4  transition-colors duration-300">
            <AppleIcon className="w-5 h-5 mr-2" />
            Apple  Login  
          </div>
        </div>
      </div>
    </div>
  );
}

function AppleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
