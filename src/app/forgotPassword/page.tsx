"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const router = useRouter();
  const [userData, setUserData] = React.useState({
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const checkButtonDisabled = () => {
    return buttonDisabled;
  };

  React.useEffect(() => {
    if (userData.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userData]);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/forgotPassword", userData);
      console.log("Password reset request raised successfully");
      toast.success("Password reset request raised successfully");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <section className="h-screen bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Forgot password?
          </h2>
          <div className="mb-5">
            <label
              htmlFor="email-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter your registered email id to send a link for resetting the
              password
            </label>
            <input
              type="text"
              id="email-input"
              value={userData.email}
              placeholder="Enter your email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mt-5 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleForgotPassword}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset Password
            </button>

            <div className="text-sm flex items-center justify-center">
              <Link
                href="/login"
                className="font-medium font-light text-gray-500 dark:text-gray-400"
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
