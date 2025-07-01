import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function ForgotPassword({ product }) {
  const [mode, setMode] = useState("request"); // or 'verify' / 'new-password'
  const [params] = useSearchParams();
  product = params.get("product") || "accounting";

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* <LeftPromo product={product} /> */}
      <div></div>

      <div className="flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white rounded-xl p-6 shadow">
          <img src="/logo.png" className="mx-auto w-32 mb-4" alt="Munim logo" />
          <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your email to reset your password.
          </p>

          <form>
            <label className="block mb-1 font-medium">Username*</label>
            <input
              type="text"
              placeholder="Enter you email"
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold">
              Send OTP
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              to={`/log-in?product=${product}`}
              className="text-blue-600 text-sm"
            >
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
