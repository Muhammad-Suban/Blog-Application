import React from "react";
import  {Logout as authLog}  from "../../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/authService";

function logoutBtn() {
  const dispatch = useDispatch();
  
  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispatch(authLog());
        alert("logout Successfully");
      })
      .catch(() => {
        alert("logout unsuccessfull");
      });
  };

  return (
    <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}> Logout </button>
  )
}

export default logoutBtn;
