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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <button
        onClick={handleLogout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <hr />
      <p className="m-5 text-4xl">
        User details
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          {userData.userName === "" ? "" : userData.userName}
        </span>
      </p>
      <p className="m-5 text-4xl">
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          {userData.email === "" ? "" : userData.email}
        </span>
      </p>
    </div>
  );
}
