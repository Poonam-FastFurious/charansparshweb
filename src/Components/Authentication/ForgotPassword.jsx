import { useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../Config";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]{2,}@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(Baseurl + "/api/v1/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email.");
      }

      setSuccessMessage(
        "✅ Password reset email sent! Please check your inbox."
      );
      setEmail("");
    } catch (error) {
      console.error("Error sending reset email:", error);
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-gray-100 min-h-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-white hover:text-[#FF9343] border border-transparent hover:border-[#FF9343] transition-colors duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {errorMessage && (
          <p className="text-sm text-red-500 mt-3">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-sm text-green-500 mt-3">{successMessage}</p>
        )}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
