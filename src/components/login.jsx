import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { Login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Logo, Button, Input } from "./index";

function login() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //(data)  logic explanation
  // managed by react hook form
  //...register(email) pass the user detail in argument (data) in object like (email),(password)
  const login = async (data) => {
    try {
      setError(""); // best practice use in Login page
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Error", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit(login)} className="mt-8">
         <div className='space-y-5'>
          <Input 
          type="email" 
          placeholder="Email" 
          {...register('email' ,{
            required: true,
            validate:{ 
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",}
          })} />

          <Input
            placeholder="Enter your password"
            type="password"
            {...register("password",{
                required: true,
                minLength: 8,
                validate: {
                    matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                }
            })}
          />  
          <Button className="w-full border-red-950" type="submit" >Submit</Button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default login;
