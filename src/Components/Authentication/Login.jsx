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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("userid", data.data.user._id);
      localStorage.setItem("user", JSON.stringify(data.data.user.fullName));
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      document.cookie = `accessToken=${data.data.accessToken}; path=/; `;
      document.cookie = `refreshToken=${data.data.refreshToken}; path=/; `;

      console.log("Login success:", data);
      setSuccessMessage("Login successful!");
      setErrorMessage("");
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login error, credential not match");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 bg-gray-100 min-h-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button className="text-lg font-semibold">Sign In</button>
          <Link to="/SignUp" className="text-lg font-semibold">
            Sign Up
          </Link>
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
              id="password"
              name="password"
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
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-white hover:text-[#FF9343] border-[1px] hover:border-[#FF9343] transition-colors duration-300"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "SIGN IN"}
        </button>

        {errorMessage && (
          <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-sm text-green-500 mt-2">{successMessage}</p>
        )}
      </div>
    </div>
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
