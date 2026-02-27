"use client";
import Image from "next/image";
import img from "@/app/Assets/Logo.jpeg";
import { Button } from "@/components/ui/button";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setisAuthenticated } from "../Store/Streamlyslice";
import { useEffect, useState } from "react";
export default function Page() {
  const date = new Date("2026-02-28T19:59:19Z");
  const [expiryDate, setExpiryDate] = useState("");
  const formatted = date.toISOString().replace("T", " ").replace("Z", " UTC");
  console.log(formatted);
  const router = useRouter();
  const dispatch = useDispatch();
  const authenticate = async () => {
    const data = await axiosInstance.get("/authentication/guest_session/new");
    console.log(data?.data);
    setExpiryDate(data?.data?.expires_at);

    if (data?.data?.success === true) {
      toast.success("User authentication successful!. Redirectinggg");
      dispatch(setisAuthenticated(true));
      setTimeout(() => {
        // router.push("/");
      }, 2000);
    }
  };

  return (
    <div className="flex items-center gap-8 flex-col justify-center h-screen  w-full">
      <span className="flex items-center gap-4">
        <Image className="w-20 rounded-full" src={img} alt="alt" />
        <h4 className="font-bold">Streamly</h4>
      </span>
      <Button onClick={() => authenticate()} className="h-20 w-64 rounded">
        Authenticated User
      </Button>
    </div>
  );
}
