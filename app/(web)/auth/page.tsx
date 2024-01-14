"use client";

// import React from "react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";

import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Auth = () => {
  // Initial form data for the authentication form
  const defaultFormData = {
    email: "",
    password: "",
    name: "",
  };
  const [formData, setFormData] = useState(defaultFormData);

  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none";

  // Handle changes in input to constantly keep rendering or validating user input data
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [router, session]);

  const loginHandler = async () => {
    try {
      await signIn();
      router.push("/");
      // push the user to the home page
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Hadnle submit of authentication form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await signUp(formData);
      if (user) {
        toast.success("Success. Please sign in");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setFormData(defaultFormData);
    }
  };

  // Create a login or signup form
  // Provide options for logging in using Github or Google
  // Or provide login option using email and password
  return (
    <section className="container mx-auto">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Create an account
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              className="mr-3 text-4xl cursor-pointer text-black dark:text-white"
              onClick={loginHandler}
            />{" "}
            |
            <FcGoogle
              className="ml-3 text-4xl cursor-pointer"
              onClick={loginHandler}
            />
          </span>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email@company.com"
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            minLength={6}
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            required
            className={inputStyles}
            value={formData.name}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>
        </form>
        <button className="text-blue-700 underline" onClick={loginHandler}>
          Login
        </button>
      </div>
    </section>
  );
};

export default Auth;
