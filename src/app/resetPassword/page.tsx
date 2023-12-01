"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleResetPassword = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log("reset password request started");
      const response = await axios.post("/api/resetPassword", {
        token,
        password: userPassword,
      });
      router.push("/login");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  const checkButtonDisabled = () => {
    return userPassword.length === 0;
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Reset your password
        </h1>
        <form className="space-y-4 md:space-y-6">
          <div className="mb-5">
            <label
              htmlFor="password-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password-input"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* <div className="mb-5">
            <label
              htmlFor="cnf-password-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cnf-password-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div> */}

          <button
            type="submit"
            onClick={handleResetPassword}
            disabled={checkButtonDisabled()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
