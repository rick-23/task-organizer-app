"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

export default function VerifyEmail() {
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <section className="h-screen bg-white dark:bg-gray-900">
      <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Verify Email
        </h2>

        {verified && (
          <div>
            <p className="mb-4 font-medium">Email Verified</p>
            <Link
              className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
              href="/login"
            >
              Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Error
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}
