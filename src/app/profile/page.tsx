"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = React.useState({
    id: "",
    userName: "",
    email: "",
  });

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get("/api/profile");
        setUserData({
          id: res.data.data._id,
          userName: res.data.data.userName,
          email: res.data.data.email,
        });
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("Logout Successful!");
      router.push("/login");
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
            Profile
          </h2>
          <ul className="w-84 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              Username: {userData.userName === "" ? "" : userData.userName}
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              Email: {userData.email === "" ? "" : userData.email}
            </li>
          </ul>
          <div className="flex flex-col mt-5 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleLogout}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
