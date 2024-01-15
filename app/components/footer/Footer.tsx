// import React from "react";

import Link from "next/link";

import {
  BsFillSendFill,
  BsTelephoneOutbound,
  BsFillHouseDoorFill,
} from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";

// Footer for every page
const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="container mx-auto px-4">
        <Link href="/" className="font-black text-tertiary-dark">
          Harmony Initiatives
        </Link>
        <h4 className="font-semibold text-[40px] py-6">Contact</h4>
        <div className="flex flex-wrap gap-16 items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center py-4">
              <BsFillHouseDoorFill />
              <div className="flex flex-col">
                <p className="ml-2">Amanora Park Town</p>
                <p className="ml-2">Hadapdar</p>
                <p className="ml-2">Pune(MH), India</p>
              </div>
            </div>
            <div className="flex items-center pb-4">
              <BsFillSendFill />
              <p className="ml-2">@HarmonyInitiatives</p>
            </div>
            <div className="flex items-center">
              <BsTelephoneOutbound />
              <p className="ml-2">+91-9110091875</p>
            </div>
            <div className="flex items-center pt-4">
              <BiMessageDetail />
              <p className="ml-2">@HarmonyInitiatives</p>
            </div>
          </div>
          <div className="flex-1 md:text-right">
            <p className="pb-4">Our Story</p>
            <p className="pb-4">Get In Touch</p>
            <p className="pb-4">Our Privacy Commitment</p>
            <p className="pb-4">Terms of Service</p>
            <p>Customer Assistance</p>
          </div>
          <div className="flex-1 md:text-right">
            <p className="pb-4">What we Guarantee?</p>
            <p className="pb-4">Upcoming Programs</p>
            <p className="pb-4">Blogs</p>
            <p className="pb-4">Join Us</p>
            <p>Events</p>
          </div>
        </div>
      </div>
      <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0" />
    </footer>
  );
};

export default Footer;
