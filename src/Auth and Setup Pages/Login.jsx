import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import logowithbg from "../assets/logowithbg.png"

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("accounting");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [params] = useSearchParams();
  const product = params.get("product") || "accounting";

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Navigate based on selected tab
      if (tab === "accounting") {
        navigate("/company/create");
      } else if (tab === "gst") {
        navigate("/subscription");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center p-8 bg-[#f1f7fe]">
        <div className="text-center max-w-md w-full">
          {tab === "accounting" ? (
            <>
              <div className="mb-6">
                <p className="text-orange-500 font-bold text-2xl">
                  500+{" "}
                  <span className="text-black text-sm font-normal">
                    Star reviews
                  </span>
                </p>
              </div>
              <div className="mb-6">
                <p className="text-blue-600 font-bold text-2xl">
                  25K+{" "}
                  <span className="text-black text-sm font-normal">
                    Customers On-boarded
                  </span>
                </p>
              </div>
              <div className="mt-12 bg-white p-6 rounded-xl shadow-md text-left">
                <h2 className="text-xl font-semibold mb-2">
                  With Webseeder Accounting
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Half-price on every plan, just smarter bookkeeping.
                </p>
                <div className="bg-yellow-400 p-4 rounded-lg text-center font-bold text-lg text-black">
                  Simplify Your Accounting
                  <br />
                  <span className="text-2xl mt-2 block">ENJOY 50% OFF</span>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Get full access to invoicing, GST compliance, bank
                  reconciliation & more.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center bg-yellow-400 p-3 rounded-md">
                <h2 className="text-xl font-semibold">With Webseeder GST</h2>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Get Special Discount For CA
                </button>
              </div>
              <div className="mt-8 bg-white p-6 rounded-xl shadow-md text-left">
                {/* Placeholder for GST graphic */}
                <div className="mb-4 h-32 bg-blue-100 flex items-center justify-center rounded">
                  <span className="text-blue-600 font-bold">
                    [GST Banner Image]
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Simplify Your Webseeder GST
                </h3>
                <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-semibold">
                  Enjoy 20% OFF
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Get full access to GST filing, compliance help & reports.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center p-8">
        <div className="bg-white rounded-3xl p-6 border-blue-300 shadow-md shadow-blue-300 w-full max-w-md">
          <div>
            <div className="text-center mb-6">
              <img
                src={logowithbg}
                alt="Webseeder Logo"
                className="mx-auto w-22 h-10 mb-4"
              />
              <h1 className="text-2xl font-bold">
                {tab === "accounting"
                  ? "Welcome to Accounting & Billing"
                  : "Welcome to Webseeder GST"}
              </h1>
              <p className="text-sm text-gray-500">
                {tab === "accounting"
                  ? "All in one solution for Accounting & Billing"
                  : "All in one solution for GST return filing."}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-4">
              <div className="flex flex-col sm:flex-row border border-blue-500 rounded-full overflow-hidden">
                {/* Accounting & Billing */}
                <button
                  onClick={() => setTab("accounting")}
                  className={`
                    w-full sm:w-auto
                    text-sm px-4 py-2
                    ${
                      tab === "accounting"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600"
                    }
                    focus:outline-none
                  `}
                >
                  Accounting & Billing
                </button>

                {/* GST Return Filing */}
                <button
                  onClick={() => setTab("gst")}
                  className={`
                    w-full sm:w-auto
                    text-sm px-4 py-2
                    ${
                      tab === "gst"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600"
                    }
                    focus:outline-none
                  `}
                >
                  GST Return Filing
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="block mb-1 font-medium">
                Username<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 mb-1 outline-none`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mb-3">{errors.email}</p>
              )}

              <label htmlFor="password" className="block mb-1 font-medium">
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative mb-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 outline-none pr-10`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mb-3">{errors.password}</p>
              )}

              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2" />
                  Trust this device for 30 days
                </label>
                <Link
                  to={`/forgot-password?product=${product}`}
                  className="text-blue-600 text-sm"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mb-4"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
